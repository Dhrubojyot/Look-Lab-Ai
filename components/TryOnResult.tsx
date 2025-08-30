import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface TryOnResultProps {
  originalImage: string;
  generatedImage: string;
}

export const TryOnResult: React.FC<TryOnResultProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="w-full animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="text-center font-medium mb-2 text-gray-600 text-sm">Before</h4>
                <img src={originalImage} alt="Original" className="w-full rounded-md border border-border-color" />
            </div>
            <div>
                <h4 className="text-center font-medium mb-2 text-gray-600 text-sm">After</h4>
                <img src={generatedImage} alt="Generated Try-On" className="w-full rounded-md border border-border-color" />
            </div>
        </div>
        <div className="mt-6 text-center">
            <a
            href={generatedImage}
            download="vibefit-ai-try-on.png"
            className="inline-flex items-center font-medium text-primary hover:underline"
            >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download Image
            </a>
        </div>
    </div>
  );
};