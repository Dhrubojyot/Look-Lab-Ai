import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-2 rounded-full animate-spin border-gray-200 border-t-primary"></div>
      <p className="text-base font-medium text-primary">Crafting your new look...</p>
      <p className="text-sm text-gray-500">Please wait a moment.</p>
    </div>
  );
};