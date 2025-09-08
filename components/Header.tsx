import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative px-4 pt-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-green-500/30 rounded-2xl backdrop-blur-sm shadow-2xl shadow-green-500/10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight text-green-400 drop-shadow-lg">
              LookLab AI
            </h1>
            <a 
             href="https://aistudio.google.com/getting-started" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-sm text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full border border-transparent hover:border-green-500/20 hover:bg-green-500/5"
            >
              Powered by Gemini
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};