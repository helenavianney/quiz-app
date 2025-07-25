import React, { useState } from 'react';

type Answer = {
  id: string;
  question_id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  quiz_id: string;
  text: string;
};

type QuestionCardProps = {
  question: Question;
  answers: Answer[];
  onAnswerSelect: (answerId: string) => void;
  showResult?: boolean;
  selectedAnswerId?: string | null;
};

export default function QuestionCard({ 
  question, 
  answers, 
  onAnswerSelect, 
  showResult = false,
  selectedAnswerId = null 
}: QuestionCardProps) {
  const [hoveredAnswerId, setHoveredAnswerId] = useState<string | null>(null);

  // Helper function to determine button styles based on state
  const getButtonStyles = (answer: Answer) => {
    const isSelected = selectedAnswerId === answer.id;
    const isHovered = hoveredAnswerId === answer.id;
    
    const baseClasses = "relative w-full text-left p-4 rounded-xl transition-all duration-300 border-2 flex items-center";
    
    // Not showing results yet - just selection and hover states
    if (!showResult) {
      if (isSelected) {
        return `${baseClasses} border-yellow-500 bg-yellow-50 shadow-md`;
      }
      return `${baseClasses} border-gray-200 ${isHovered ? 'bg-yellow-50 border-yellow-200' : 'bg-white hover:bg-gray-50'}`;
    }
    
    // Showing results - highlight correct and incorrect answers
    if (answer.isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50`;
    }
    if (isSelected && !answer.isCorrect) {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
    return `${baseClasses} border-gray-200 bg-white opacity-70`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Question header with decorative element */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-5 px-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">{question.text}</h2>
      </div>
      
      {/* Answers section */}
      <div className="p-6">
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <button
              key={answer.id}
              onClick={() => !showResult && onAnswerSelect(answer.id)}
              onMouseEnter={() => setHoveredAnswerId(answer.id)}
              onMouseLeave={() => setHoveredAnswerId(null)}
              disabled={showResult}
              className={getButtonStyles(answer)}
            >
              {/* Answer letter indicator */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-medium flex items-center justify-center mr-3">
                {String.fromCharCode(65 + index)}
              </div>
              
              {/* Answer text */}
              <span className="flex-grow">{answer.text}</span>
              
              {/* Result indicators */}
              {showResult && (
                <div className="ml-2 flex-shrink-0">
                  {answer.isCorrect ? (
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : selectedAnswerId === answer.id && !answer.isCorrect ? (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
