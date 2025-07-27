"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  text: string;
  answers: {
    text: string;
    is_correct: boolean;
  }[];
}

export default function CreateQuiz() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [quizData, setQuizData] = useState({
    title: "",
    description: ""
  });
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: "",
      answers: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false }
      ]
    }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, {
      text: "",
      answers: [
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false }
      ]
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
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

    try {
      // Create quiz first
      const quizResponse = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...quizData,
          user_id: session?.user?.id
        })
      });

      if (!quizResponse.ok) throw new Error('Failed to create quiz');
      
      const quiz = await quizResponse.json();
      
      // Create questions and answers
      for (const question of questions) {
        const questionResponse = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: question.text,
            quiz_id: quiz.id
          })
        });

        if (!questionResponse.ok) throw new Error('Failed to create question');
        
        const createdQuestion = await questionResponse.json();
        
        // Create answers
        for (const answer of question.answers) {
          await fetch('/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: answer.text,
              is_correct: answer.is_correct,
              question_id: createdQuestion.id
            })
          });
        }
      }

      router.push('/admin?message=Quiz berhasil dibuat!');
    } catch (err) {
      setError('Gagal membuat quiz. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Buat Quiz Baru</h1>
          <p className="text-gray-600 mt-2">Tambahkan pertanyaan dan jawaban untuk quiz Anda</p>
        </div>
        <Link
          href="/admin"
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
                placeholder="Masukkan judul quiz"
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
                placeholder="Masukkan deskripsi quiz"
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
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
                  placeholder="Masukkan pertanyaan"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan Jawaban
                </label>
                <div className="space-y-2">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center space-x-3">
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
                        placeholder={`Pilihan ${answerIndex + 1}`}
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Membuat Quiz...' : 'Buat Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}