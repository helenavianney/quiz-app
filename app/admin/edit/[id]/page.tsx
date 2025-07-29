"use client";

import { useState, useEffect, use, useCallback } from "react";
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

  const fetchQuizData = useCallback(async () => {
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

    const quiz = quizzes.find((q: unknown) => (q as { id: string }).id === id);
    if (quiz) {
      setQuizData({ title: quiz.title, description: quiz.description });
    }

    const quizQuestions = allQuestions.filter((q: unknown) => (q as { quiz_id: string }).quiz_id === id);
    const questionsWithAnswers = quizQuestions.map((q: unknown) => ({
      ...(q as Question),
      answers: allAnswers.filter((a: unknown) => (a as { question_id: string }).question_id === (q as { id: string }).id)
    }));
    
    setQuestions(questionsWithAnswers);
  }, [id]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

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

  const addQuestion = async () => {
    // Create new question in database
    const questionResponse = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: '',
        quiz_id: id
      })
    });
    
    const newQuestion = await questionResponse.json();
    
    // Create 4 default answers for the new question
    const answerPromises = [
      { text: '', is_correct: true },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
      { text: '', is_correct: false }
    ].map(answer => 
      fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: answer.text,
          is_correct: answer.is_correct,
          question_id: newQuestion.id
        })
      })
    );
    
    const answerResponses = await Promise.all(answerPromises);
    const newAnswers = await Promise.all(answerResponses.map(res => res.json()));
    
    // Add to local state
    setQuestions([...questions, {
      id: newQuestion.id,
      text: '',
      answers: newAnswers
    }]);
  };

  const removeQuestion = async (questionIndex: number) => {
    if (questions.length <= 1) return;
    
    const questionToDelete = questions[questionIndex];
    
    // Delete from database if question has ID (existing question)
    if (questionToDelete.id) {
      await fetch(`/api/questions?id=${questionToDelete.id}`, {
        method: 'DELETE'
      });
    }
    
    // Remove from local state
    setQuestions(questions.filter((_, i) => i !== questionIndex));
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Pertanyaan {questionIndex + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                >
                  Hapus
                </button>
              )}
            </div>
            
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

        {/* Add Question Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            + Tambah Pertanyaan
          </button>
        </div>

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