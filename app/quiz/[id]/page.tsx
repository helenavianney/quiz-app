"use client";

import { useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import QuestionCard from "@/app/components/QuestionCard";
import QuizLoadingScreen from "@/app/components/QuizLoadingScreen";
import { setQuestions, nextQuestion, resetQuestionIndex } from "@/app/redux/questionSlice";
import { setQuizzes, setQuizCompleted } from "@/app/redux/quizSlice";
import { setAnswers, setSelectedAnswerId } from "@/app/redux/answerSlice";
import { setLoading } from "@/app/redux/uiSlice";
import { incrementScore, resetScore, setShowResult, setQuizId, setUserId } from "@/app/redux/scoreSlice";
import { RootState } from "@/app/lib/store";
import { saveQuizResult } from "@/app/utils/saveQuizResult";
import { useSession } from "next-auth/react";

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions.questions);
  const currentQuestionIndex = useSelector((state: RootState) => state.questions.currentQuestionIndex);
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const quizCompleted = useSelector((state: RootState) => state.quizzes.quizCompleted);
  const answers = useSelector((state: RootState) => state.answers.answers);
  const selectedAnswerId = useSelector((state: RootState) => state.answers.selectedAnswerId);
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const score = useSelector((state: RootState) => state.score.score);
  const showResult = useSelector((state: RootState) => state.score.showResult);
  
  useEffect(() => {
    const fetchData = async () => {
      const [quizzesRes, questionsRes, answersRes] = await Promise.all([
        fetch('/api/quizzes'),
        fetch('/api/questions'),
        fetch('/api/answers')
      ]);
      
      const [quizzesData, questionsData, answersData] = await Promise.all([
        quizzesRes.json(),
        questionsRes.json(),
        answersRes.json()
      ]);
      
      dispatch(setQuizzes(quizzesData));
      dispatch(setQuestions(questionsData));
      dispatch(setAnswers(answersData));
      dispatch(setQuizId(id));
      
      if (session?.user?.id) {
        dispatch(setUserId(session.user.id));
      }
      
      setTimeout(() => dispatch(setLoading(false)), 2500);
    };
    
    fetchData();
  }, [dispatch, id, session?.user?.id]);
  
  const quizQuestions = questions.filter(q => q.quiz_id === id);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswers = currentQuestion 
    ? answers.filter(a => a.question_id === currentQuestion.id)
    : [];

  const handleAnswerSelect = (answerId: string) => {
    dispatch(setSelectedAnswerId(answerId));
    dispatch(setShowResult(true));
    
    const selectedAnswer = answers.find(a => a.id === answerId);
    console.log('Selected answer:', selectedAnswer);
    if (selectedAnswer?.is_correct) {
      dispatch(incrementScore());
    }
    
    setTimeout(async () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        dispatch(nextQuestion());
        dispatch(setSelectedAnswerId(null));
        dispatch(setShowResult(false));
      } else {
        // Save quiz result when completed
        if (session?.user?.id) {
          try {
            await saveQuizResult(session.user.id, id, score + (selectedAnswer?.is_correct ? 1 : 0));
            console.log('Quiz result saved successfully');
          } catch (error) {
            console.error('Failed to save quiz result:', error);
          }
        }
        dispatch(setQuizCompleted(true));
      }
    }, 1500);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <QuizLoadingScreen />
        ) : !quizCompleted ? (
          <>

            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {quizzes.find(quiz => quiz.id === id)?.title}
              </h1>
              <p className="text-gray-600">
                Pertanyaan {currentQuestionIndex + 1} dari {quizQuestions.length}
              </p>
            </div>
            

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            

            {currentQuestion && (
              <div className="mb-8 transform transition-all duration-500 ease-out">
                <QuestionCard
                  question={currentQuestion}
                  answers={currentAnswers}
                  onAnswerSelect={handleAnswerSelect}
                  showResult={showResult}
                  selectedAnswerId={selectedAnswerId}
                />
              </div>
            )}
          </>
        ) : (

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Quiz Selesai!
            </h2>
            
            <p className="text-xl text-gray-700 mb-2">
              Skor Anda: <span className="font-bold text-yellow-500">{score}</span> dari {quizQuestions.length}
            </p>
            
            <p className="text-gray-600 mb-8">
              Persentase: <span className="font-medium">{Math.round((score / quizQuestions.length) * 100)}%</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/quiz/${id}`} 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                onClick={() => {
                  dispatch(resetQuestionIndex());
                  dispatch(setSelectedAnswerId(null));
                  dispatch(setShowResult(false));
                  dispatch(resetScore());
                  dispatch(setQuizCompleted(false));
                }}
              >
                Coba Lagi
              </Link>
              
              <Link 
                href="/quiz" 
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Kembali ke Daftar Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
