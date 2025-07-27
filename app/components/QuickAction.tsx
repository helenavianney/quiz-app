import Link from 'next/link'

export default function QuickAction() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/create"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            ➕ Buat Quiz
          </Link>
          <Link
            href="/admin/manage"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            ⚙️ Kelola Quiz
          </Link>
          <Link
            href="/quiz"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            🎯 Lihat Quiz
          </Link>
          <Link
            href="/admin"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
            📊 Laporan
          </Link>
        </div>
    </div>
  )
}
