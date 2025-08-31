
import { GoogleGenAI } from "@google/genai";
import type { VideoScript, SequenceItem } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function formatPrompt(script: VideoScript): string {
  const sequenceDescription = script.sequence.map((item: SequenceItem, index: number) => 
    `Scene ${index + 1}: A ${item.shot} shot of ${item.subject}. Action: ${item.action}. The camera uses a ${item.camera}. Additional details: ${item.details}.`
  ).join(' ');

  return `
    Create a video titled "${script.title}".
    The overall visual style must be: ${script.style}.
    
    The video follows this sequence of events: ${sequenceDescription}
    
    Emphasize these keywords: ${script.keywords.join(', ')}.
    Strictly avoid the following: ${script.negative_prompt}.
  `.trim().replace(/\s+/g, ' ');
}

export const generateVideoFromScript = async (script: VideoScript): Promise<string> => {
  const prompt = formatPrompt(script);

  console.log("Generating video with prompt:", prompt);

  let operation = await ai.models.generateVideos({
    model: 'veo-2.0-generate-001',
    prompt: prompt,
    config: {
      numberOfVideos: 1
    }
  });

  console.log("Video generation started. Operation:", operation);

  // Poll for the result
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds between checks
    console.log("Polling for video status...");
    operation = await ai.operations.getVideosOperation({ operation: operation });
    console.log("Current operation status:", operation.done);
  }

  if (!operation.response?.generatedVideos?.[0]?.video?.uri) {
    console.error("Video generation finished, but no video URI was found in the response.", operation);
    throw new Error("Video generation failed. No video URI was returned.");
  }
  
  const downloadLink = operation.response.generatedVideos[0].video.uri;
  console.log("Video generated successfully. Download link:", downloadLink);
  
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    throw new Error(`Failed to fetch video data. Status: ${videoResponse.statusText}`);
  }

  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};
