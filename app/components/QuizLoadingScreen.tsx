import React from 'react';

export default function QuizLoadingScreen() {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg">
      <div className="relative w-full max-w-md">
        {/* Quiz loading animation */}
        <div className="flex flex-col items-center">
          {/* Brain icon with pulse effect */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-yellow-200 opacity-50 animate-pulse"></div>
            <div className="relative z-10 text-6xl">🧠</div>
          </div>
          
          {/* Loading text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Menyiapkan Quiz
          </h2>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-loading-progress"></div>
          </div>
          
          {/* Loading facts */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 max-w-md">
            <p className="text-gray-700 text-center italic">
              &quot;Tahukah kamu? Mengerjakan quiz secara rutin dapat meningkatkan daya ingat dan kemampuan berpikir kritis.&quot;
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-0 w-12 h-12 rounded-full bg-yellow-200 opacity-70 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full bg-yellow-300 opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-6 h-6 rounded-full bg-yellow-400 opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Question mark decorations */}
        <div className="absolute top-20 right-10 text-2xl text-yellow-400 opacity-70 animate-bounce" style={{ animationDelay: '0.5s' }}>?</div>
        <div className="absolute bottom-20 left-10 text-3xl text-yellow-300 opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}>?</div>
      </div>
    </div>
  );
}