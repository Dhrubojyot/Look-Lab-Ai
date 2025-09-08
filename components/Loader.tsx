import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Fashion-inspired loading animation */}
      <div className="relative w-20 h-20">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 border-2 border-dashed rounded-full border-emerald-200 animate-spin-slow"></div>
        
        {/* Inner rotating circle */}
        <div className="absolute inset-3 border-2 border-dashed rounded-full border-green-300 animate-spin-medium reverse-spin"></div>
        
        {/* Central icon */}
        <div className="absolute inset-6 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Rotating floating dots */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit-slow">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 animate-orbit-medium">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 animate-orbit-fast">
          <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 animate-orbit-slow reverse-orbit">
          <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-emerald-700 mb-1">Crafting your new look...</p>
        <p className="text-sm text-emerald-500">AI is working its magic</p>
      </div>
      
      {/* Progress indicator dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};