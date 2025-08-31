
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

export const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % LOADING_MESSAGES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 w-full">
      <div className="w-20 h-20 border-4 border-t-purple-500 border-r-purple-500 border-b-blue-500 border-l-blue-500 rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">Generating Your Vision...</h2>
      <p className="text-lg md:text-xl text-gray-400 transition-opacity duration-500 ease-in-out">
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <p className="mt-8 text-sm text-gray-500">This may take a few minutes. Please don't close this window.</p>
    </div>
  );
};
