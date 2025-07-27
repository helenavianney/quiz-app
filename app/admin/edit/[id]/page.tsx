"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    is_correct: boolean;
  }[];
}

export default function EditQuiz({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [quizData, setQuizData] = useState({
    title: "",
    description: ""
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    const [quizRes, questionsRes, answersRes] = await Promise.all([
      fetch(`/api/quizzes`),
      fetch('/api/questions'),
      fetch('/api/answers')
    ]);
    
    const [quizzes, allQuestions, allAnswers] = await Promise.all([
      quizRes.json(),
      questionsRes.json(),
      answersRes.json()
    ]);

    const quiz = quizzes.find((q: any) => q.id === id);
    if (quiz) {
      setQuizData({ title: quiz.title, description: quiz.description });
    }

    const quizQuestions = allQuestions.filter((q: any) => q.quiz_id === id);
    const questionsWithAnswers = quizQuestions.map((q: any) => ({
      ...q,
      answers: allAnswers.filter((a: any) => a.question_id === q.id)
    }));
    
    setQuestions(questionsWithAnswers);
  };

  const updateQuestion = (questionIndex: number, text: string) => {
    const updated = [...questions];
    updated[questionIndex].text = text;
    setQuestions(updated);
  };

  const updateAnswer = (questionIndex: number, answerIndex: number, text: string) => {
    const updated = [...questions];
    updated[questionIndex].answers[answerIndex].text = text;
    setQuestions(updated);
  };

  const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].answers.forEach((answer, i) => {
      answer.is_correct = i === answerIndex;
    });
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Update quiz
    await fetch('/api/quizzes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        ...quizData
      })
    });

    // Update questions and answers
    for (const question of questions) {
      await fetch('/api/questions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: question.id,
          text: question.text
        })
      });

      for (const answer of question.answers) {
        await fetch('/api/answers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: answer.id,
            text: answer.text,
            is_correct: answer.is_correct
          })
        });
      }
    }

    router.push('/admin/manage?message=Quiz berhasil diupdate!');
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Quiz</h1>
          <p className="text-gray-600 mt-2">Ubah informasi quiz dan pertanyaan</p>
        </div>
        <Link
          href="/admin/manage"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ← Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Quiz Info */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informasi Quiz</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Quiz
              </label>
              <input
                type="text"
                required
                value={quizData.title}
                onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                required
                value={quizData.description}
                onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Pertanyaan {questionIndex + 1}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teks Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  value={question.text}
                  onChange={(e) => updateQuestion(questionIndex, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan Jawaban
                </label>
                <div className="space-y-2">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answer.id} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`correct-${questionIndex}`}
                        checked={answer.is_correct}
                        onChange={() => setCorrectAnswer(questionIndex, answerIndex)}
                        className="text-yellow-500 focus:ring-yellow-500"
                      />
                      <input
                        type="text"
                        required
                        value={answer.text}
                        onChange={(e) => updateAnswer(questionIndex, answerIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500">
                        {answer.is_correct ? '✓ Benar' : 'Salah'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}