
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Video Storyboard Generator
        </h1>
        <p className="mt-2 text-md md:text-lg text-gray-400">Powered by Gemini VEO</p>
      </div>
    </header>
  );
};
