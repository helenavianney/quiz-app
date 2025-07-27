"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function ManageQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await fetch('/api/quizzes');
    const data = await response.json();
    setQuizzes(data);
    setIsLoading(false);
  };

  const deleteQuiz = async (id: string) => {
    if (!confirm('Yakin ingin menghapus quiz ini?')) return;
    
    await fetch(`/api/quizzes?id=${id}`, { method: 'DELETE' });
    fetchQuizzes();
  };

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Quiz</h1>
          <p className="text-gray-600 mt-2">Edit atau hapus quiz yang sudah dibuat</p>
        </div>
        <Link
          href="/admin"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ← Kembali
        </Link>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p>Memuat quiz...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md border border-yellow-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Quiz</h2>
            {quizzes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Belum ada quiz yang dibuat</p>
            ) : (
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{quiz.description}</p>
                        <p className="text-gray-400 text-xs mt-2">Dibuat: {formatDate(quiz.created_at)}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/admin/edit/${quiz.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => deleteQuiz(quiz.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}