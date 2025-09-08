import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { TryOnResult } from './components/TryOnResult';
import { Loader } from './components/Loader';
import { generateTryOnImage } from './services/geminiService';
import { ClothingType, OutfitItem } from './types';
import { SwapIcon } from './components/icons/SwapIcon';
import Footer from './components/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 font-sans text-primary relative overflow-hidden">
  {/* Enhanced background texture with increased opacity */}
  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 via-transparent to-lime-100/50 z-0"></div>
  
  {/* Background design shapes */}
  <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
  <div className="absolute top-1/3 right-10 w-72 h-72 bg-green-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
  <div className="absolute bottom-1/4 left-20 w-72 h-72 bg-lime-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
  <div className="absolute bottom-1/3 right-20 w-72 h-72 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
  
  {/* <Header /> */}
  <main className="container mx-auto p-4 md:p-8 relative z-10">
    <div className="text-center mb-12">
    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
  <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
    Look Lab AI
  </span>
  <span> ✨</span>
</h2>

      <p className="mt-4 text-base text-emerald-700/80 max-w-2xl mx-auto">
      Add your photo and mix & match outfits to discover your fresh look instantly.
      </p>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-emerald-100 relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        
        <h3 className="text-xl font-medium mb-6 text-center text-emerald-800">
          Create Your Look 😉
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Your Photo"
            description="Upload a clear, full-body photo."
            onImageUpload={(base64) => handleImageUpload('user', base64)}
            className="border-emerald-200 hover:border-emerald-500 transition-all duration-300"
          />
          <ImageUploader
            label="Top"
            description="e.g., shirt, t-shirt, jacket"
            onImageUpload={(base64) => handleImageUpload(ClothingType.TOP, base64)}
            className="border-emerald-200 hover:border-emerald-500 transition-all duration-300"
          />
          <ImageUploader
            label="Bottom"
            description="e.g., pants, skirt, jeans"
            onImageUpload={(base64) => handleImageUpload(ClothingType.BOTTOM, base64)}
            className="border-emerald-200 hover:border-emerald-500 transition-all duration-300"
          />
          <ImageUploader
            label="Shoes / Accessory"
            description="e.g., sneakers, hat, bag"
            onImageUpload={(base64) => handleImageUpload(ClothingType.ACCESSORY, base64)}
            className="border-emerald-200 hover:border-emerald-500 transition-all duration-300"
          />
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full md:w-auto inline-flex items-center justify-center px-10 py-3.5 text-base font-medium text-white rounded-xl transition-all duration-300 ${
              canGenerate
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <SwapIcon className="w-5 h-5 mr-2" />
            Generate Look
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-emerald-100 min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        
        <h3 className="text-xl font-medium mb-6 text-center text-emerald-800">
          The Result 🔥
        </h3>
        {isLoading && (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <DotLottieReact
      src="https://lottie.host/e63a9d0e-f8ce-40c4-83a6-749d2405cd5f/VRMk9xnzIe.lottie"
      background="transparent"
      speed={1}
      style={{ width: '300px', height: '300px' }}
      loop
      autoplay
    />
   <p className="text-base font-medium text-emerald-700">Crafting your new look..✨</p>
   <p className="text-sm text-emerald-500">Please wait a moment.</p>
  </div>
)}
{error && (
  <p className="text-red-600 bg-red-50/80 p-4 rounded-md backdrop-blur-sm">
    {error}
  </p>
)}
        {!isLoading && !error && generatedImage && userImage && (
          <TryOnResult 
            originalImage={userImage} 
            generatedImage={generatedImage} 
          />
        )}
        {!isLoading && !error && !generatedImage && (
          <div className="text-center text-emerald-700/70">
            <p className="text-base">
            Your AI-generated look will show up here 👕
            </p>
          </div>
        )}
      </div>
    </div>
  </main>
  <Footer/>
</div>

  );
};

export default App;