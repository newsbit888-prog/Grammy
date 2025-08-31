
import React from 'react';

interface JsonEditorProps {
  scriptJson: string;
  setScriptJson: (value: string) => void;
  onGenerate: () => void;
  disabled: boolean;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ scriptJson, setScriptJson, onGenerate, disabled }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <textarea
        className="w-full h-96 p-4 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 font-mono text-sm shadow-inner focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ease-in-out"
        value={scriptJson}
        onChange={(e) => setScriptJson(e.target.value)}
        placeholder="Enter your video script in JSON format here..."
        disabled={disabled}
      />
      <button
        onClick={onGenerate}
        disabled={disabled}
        className="mt-6 px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        Generate Video
      </button>
    </div>
  );
};
