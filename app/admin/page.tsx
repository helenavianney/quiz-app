"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalUsers: 0,
    totalResults: 0
  });

  useEffect(() => {
    // Fetch basic stats
    const fetchStats = async () => {
      try {
        const [quizzesRes, resultsRes] = await Promise.all([
          fetch('/api/quizzes'),
          fetch('/api/results')
        ]);
        
        if (!quizzesRes.ok || !resultsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const [quizzesData, resultsData] = await Promise.all([
          quizzesRes.json(),
          resultsRes.json()
        ]);
        
        setStats({
          totalQuizzes: quizzesData.length || 0,
          totalUsers: new Set(resultsData.map((r: unknown) => (r as { user_id: string }).user_id)).size || 0,
          totalResults: resultsData.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat datang, {session?.user?.name}! 👋
            </h2>
            <p className="text-gray-600">
              Kelola quiz dan pantau aktivitas pengguna dari dashboard ini.
            </p>
          </div>
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Quiz</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalQuizzes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-xl">👥</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Pengguna</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Hasil</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalResults}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Quiz Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200 hover:shadow-lg transition-shadow duration-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Buat Quiz Baru</h3>
            <p className="text-gray-600 mb-6">
              Tambahkan quiz baru dengan pertanyaan dan jawaban
            </p>
            <Link
              href="/admin/create"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
            >
              Buat Quiz
            </Link>
          </div>
        </div>

        {/* Manage Quiz Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200 hover:shadow-lg transition-shadow duration-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Kelola Quiz</h3>
            <p className="text-gray-600 mb-6">
              Edit atau hapus quiz yang sudah dibuat
            </p>
            <Link
              href="/admin/manage"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
            >
              Kelola Quiz
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}