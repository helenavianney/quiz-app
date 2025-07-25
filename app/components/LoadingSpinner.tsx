import React from 'react';

type LoadingSpinnerProps = {
  message?: string;
};

export default function LoadingSpinner({ message = "Memuat..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-20 h-20 rounded-full border-4 border-yellow-200"></div>
        
        {/* Spinning gradient arc */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-400 animate-spin"></div>
        </div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text with animated dots */}
      <div className="mt-6 text-center">
        <p className="text-gray-700 font-medium text-lg">{message}</p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}