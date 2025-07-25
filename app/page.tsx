import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-200 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-yellow-300 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-yellow-400 opacity-10 blur-2xl"></div>
      </div>
      
      {/* Quiz icons floating in background */}
      <div className="absolute inset-0 z-0">
        {["?", "!", "✓", "✗", "?"].map((icon, index) => (
          <div 
            key={index}
            className="absolute text-yellow-500 opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              fontSize: `${Math.random() * 2 + 2}rem`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          <span className="text-yellow-500">Quiz</span>Master
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Tantang pengetahuanmu dan raih skor tertinggi dalam berbagai kategori menarik!
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <div className="bg-yellow-50 p-4 rounded-lg text-center w-full md:w-1/3">
            <div className="text-yellow-500 text-3xl mb-2">🏆</div>
            <h3 className="font-semibold text-gray-800">Papan Peringkat</h3>
            <p className="text-sm text-gray-600">Bandingkan skormu dengan pemain lain</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg text-center w-full md:w-1/3">
            <div className="text-yellow-500 text-3xl mb-2">🧠</div>
            <h3 className="font-semibold text-gray-800">Beragam Kategori</h3>
            <p className="text-sm text-gray-600">Dari sains hingga pop culture</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg text-center w-full md:w-1/3">
            <div className="text-yellow-500 text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-gray-800">Mode Tantangan</h3>
            <p className="text-sm text-gray-600">Jawab secepat mungkin untuk bonus poin</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200 group-hover:duration-200"></div>
          <Link 
            href="/quiz" 
            className="relative flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-200 ease-in-out transform hover:scale-105 w-full"
          >
            Mulai Quiz Sekarang
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          Sudah punya akun? <Link href="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">Masuk di sini</Link>
        </p>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm z-10">
        © 2025 QuizMaster. Dibuat dengan ❤️ untuk para pencinta pengetahuan.
      </div>
    </div>
  );
}