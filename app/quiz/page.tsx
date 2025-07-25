"use client";

import { useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { setQuizzes } from '@/app/redux/quizSlice';
import { setLoading } from '@/app/redux/uiSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

export default function QuizSelectionPage() {
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzes);
  const { isLoading } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quizzes');
      const data = await response.json();
      dispatch(setQuizzes(data));
      setTimeout(() => dispatch(setLoading(false)), 1800);
    };

    fetchQuizzes();
  }, [dispatch]);
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-yellow-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-yellow-300 opacity-10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pilih <span className="text-yellow-500">Quiz</span> Favoritmu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tantang dirimu dengan berbagai quiz menarik. Pilih salah satu dan mulai bermain!
          </p>
        </div>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <LoadingSpinner message="Memuat daftar quiz..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="h-2 bg-yellow-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-200">
                  {quiz.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6">
                  {quiz.description}
                </p>
                
                <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                  <span>Dibuat: {formatDate(quiz.created_at)}</span>
                </div>
                
                <Link 
                  href={`/quiz/${quiz.id}`}
                  className="block w-full bg-white hover:bg-yellow-500 text-yellow-500 hover:text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 border border-yellow-500 group-hover:border-yellow-500"
                >
                  Kerjakan Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
        

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
