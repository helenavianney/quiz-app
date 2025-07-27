"use client";

import { useSession, signOut } from "next-auth/react";
import QuickAction from "@/app/components/QuickAction"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600 font-bold">⚡</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Admin <span className="text-yellow-500">Dashboard</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-yellow-600 font-semibold text-sm">
                    {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {session?.user?.name}
                </span>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors duration-200"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Quick Actions */}
      <QuickAction />
    </div>
  );
}