
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { JsonEditor } from './components/JsonEditor';
import { LoadingScreen } from './components/LoadingScreen';
import { VideoPlayer } from './components/VideoPlayer';
import { Footer } from './components/Footer';
import { generateVideoFromScript } from './services/geminiService';
import type { VideoScript } from './types';
import { DEFAULT_SCRIPT } from './constants';

const App: React.FC = () => {
  const [scriptJson, setScriptJson] = useState<string>(DEFAULT_SCRIPT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateVideo = useCallback(async () => {
    setError(null);
    setVideoUrl(null);

    let parsedScript: VideoScript;
    try {
      parsedScript = JSON.parse(scriptJson);
    } catch (e) {
      setError("Invalid JSON format. Please check your script.");
      return;
    }

    setIsLoading(true);
    try {
      const url = await generateVideoFromScript(parsedScript);
      setVideoUrl(url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during video generation.");
    } finally {
      setIsLoading(false);
    }
  }, [scriptJson]);

  useEffect(() => {
    // Cleanup object URL to prevent memory leaks
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(121, 69, 236, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(43, 89, 234, 0.15), transparent 40%)' }}></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
          {isLoading ? (
            <LoadingScreen />
          ) : videoUrl ? (
            <VideoPlayer videoUrl={videoUrl} onGenerateNew={() => setVideoUrl(null)} />
          ) : (
            <>
              <p className="text-center text-lg md:text-xl text-gray-400 mb-8 max-w-3xl">
                Paste your JSON video script below to bring your cinematic vision to life. Modify the example or create your own storyboard.
              </p>
              <JsonEditor
                scriptJson={scriptJson}
                setScriptJson={setScriptJson}
                onGenerate={handleGenerateVideo}
                disabled={isLoading}
              />
              {error && <div className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg w-full max-w-4xl text-center">{error}</div>}
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
