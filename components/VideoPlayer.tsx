
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onGenerateNew: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onGenerateNew }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
        Your Video is Ready!
      </h2>
      <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl shadow-purple-900/40 border-2 border-purple-800/50 mb-6">
        <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain bg-black" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={videoUrl}
          download="generated-video.mp4"
          className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out text-center"
        >
          Download Video
        </a>
        <button
          onClick={onGenerateNew}
          className="px-8 py-3 font-semibold text-white bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Generate Another
        </button>
      </div>
    </div>
  );
};
