"use client";
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Marhaba</h1>
        <p className="text-xl mb-8">Furniture & Packers and Movers</p>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full mb-2">
          <div 
            className="h-full bg-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Percentage */}
        <p className="text-lg">{progress}%</p>
      </div>
    </div>
  );
}