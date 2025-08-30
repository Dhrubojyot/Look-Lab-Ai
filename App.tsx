import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { TryOnResult } from './components/TryOnResult';
import { Loader } from './components/Loader';
import { generateTryOnImage } from './services/geminiService';
import { ClothingType, OutfitItem } from './types';
import { SwapIcon } from './components/icons/SwapIcon';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (type: ClothingType | 'user', base64: string) => {
    if (type === 'user') {
      setUserImage(base64);
    } else {
      setOutfitItems(prev => {
        const existingItemIndex = prev.findIndex(item => item.type === type);
        if (existingItemIndex > -1) {
          const newItems = [...prev];
          newItems[existingItemIndex] = { type, data: base64 };
          return newItems;
        }
        return [...prev, { type, data: base64 }];
      });
    }
  };
  
  const handleGenerate = useCallback(async () => {
    if (!userImage || outfitItems.length === 0) {
      setError('Please upload your image and at least one clothing item.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateTryOnImage(userImage, outfitItems);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError('The AI could not generate an image. Please try a different set of images.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userImage, outfitItems]);

  const canGenerate = userImage && outfitItems.length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-ui-bg font-sans text-primary">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">VibeFit AI</h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">Upload your photo and mix & match outfits to see your new look instantly.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-6 text-center text-primary">1. Create Your Look</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUploader
                label="Your Photo"
                description="Upload a clear, full-body photo."
                onImageUpload={(base64) => handleImageUpload('user', base64)}
              />
              <ImageUploader
                label="Top"
                description="e.g., shirt, t-shirt, jacket"
                onImageUpload={(base64) => handleImageUpload(ClothingType.TOP, base64)}
              />
               <ImageUploader
                label="Bottom"
                description="e.g., pants, skirt, jeans"
                onImageUpload={(base64) => handleImageUpload(ClothingType.BOTTOM, base64)}
              />
                <ImageUploader
                label="Shoes / Accessory"
                description="e.g., sneakers, hat, bag"
                onImageUpload={(base64) => handleImageUpload(ClothingType.ACCESSORY, base64)}
              />
            </div>
             <div className="mt-8 text-center">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`w-full md:w-auto inline-flex items-center justify-center px-10 py-3 text-base font-medium text-white rounded-md transition-colors ${
                  canGenerate
                    ? 'bg-primary hover:bg-opacity-90'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <SwapIcon className="w-5 h-5 mr-2" />
                Generate Look
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg min-h-[400px] flex flex-col justify-center items-center">
             <h3 className="text-xl font-medium mb-6 text-center text-primary">2. The Result</h3>
            {isLoading && <Loader />}
            {error && <p className="text-red-600 bg-red-50 p-4 rounded-md">{error}</p>}
            {!isLoading && !error && generatedImage && userImage && (
              <TryOnResult originalImage={userImage} generatedImage={generatedImage} />
            )}
            {!isLoading && !error && !generatedImage && (
                 <div className="text-center text-gray-500">
                    <p className="text-base">Your generated try-on will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;