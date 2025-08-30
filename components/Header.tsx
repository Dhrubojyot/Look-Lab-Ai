import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-border-color">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          VibeFit AI
        </h1>
        <a 
         href="https://aistudio.google.com/getting-started" 
         target="_blank" 
         rel="noopener noreferrer"
         className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          Powered by Gemini
        </a>
      </div>
    </header>
  );
};