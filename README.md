# 🎯 QuizMaster - Interactive Quiz Application

QuizMaster adalah aplikasi quiz interaktif yang dibangun dengan Next.js 15, TypeScript, dan PostgreSQL. Aplikasi ini memungkinkan admin untuk membuat quiz dan user untuk mengerjakan quiz dengan sistem scoring real-time.

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi
- **Login/Register** dengan email & password
- **Google OAuth** integration
- **Role-based access** (Admin & User)
- **Session management** dengan NextAuth.js
- **Password visibility toggle**

### 👨‍💼 Admin Dashboard
- **Dashboard overview** dengan statistik
- **Quiz management** (Create, Read, Update, Delete)
- **Question management** dengan multiple choice answers
- **Real-time quiz editing** dengan database sync
- **Bulk operations** untuk mengelola quiz

### 🎮 User Experience
- **Interactive quiz interface** dengan progress bar
- **Shuffled answer options** untuk setiap quiz session
- **Real-time scoring** dan feedback
- **Quiz history** dan hasil tersimpan
- **Responsive design** untuk semua device

### 🛠️ Technical Features
- **4 Complete CRUD Systems**: Quiz, Questions, Answers, Results
- **PostgreSQL database** dengan Neon cloud
- **Prisma ORM** untuk database operations
- **Redux Toolkit** untuk state management
- **TypeScript** untuk type safety
- **Tailwind CSS** untuk styling

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📋 Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

- Node.js 18+ 
- npm atau yarn
- PostgreSQL database (Neon account)
- Google OAuth credentials (opsional)

## ⚙️ Environment Variables

Buat file `.env` di root project dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🛠️ Installation & Setup

1. **Clone repository**
```bash
git clone <repository-url>
cd quiz-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup database**
```bash
npx prisma generate
npx prisma migrate dev
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

## 📱 User Guide

### 🔑 Demo Accounts

**Admin Account:**
- Email: `user@email.com`
- Password: `123456`
- Access: Full admin dashboard dengan CRUD operations

**User Account:**
- Daftar akun baru atau gunakan Google OAuth
- Access: Quiz interface dan hasil

### Untuk User Biasa:
1. **Register/Login** di halaman `/register` atau `/login`
2. **Pilih Quiz** dari daftar yang tersedia
3. **Kerjakan Quiz** dengan memilih jawaban
4. **Lihat Hasil** dan skor akhir
5. **Coba Lagi** atau pilih quiz lain

### Untuk Admin:
1. **Login** dengan akun admin (`user@email.com` / `123456`)
2. **Akses Dashboard** di `/admin`
3. **Buat Quiz Baru** dengan pertanyaan dan jawaban
4. **Kelola Quiz** existing (edit/delete)
5. **Monitor Statistik** pengguna dan hasil

## 🗂️ Database Schema

```sql
-- Users table
User {
  id: String (Primary Key)
  name: String
  email: String (Unique)
  password: String
  is_admin: Boolean
  created_at: DateTime
}

-- Quiz table
Quiz {
  id: String (Primary Key)
  title: String
  description: String
  user_id: String (Foreign Key)
  created_at: DateTime
}

-- Questions table
Question {
  id: String (Primary Key)
  quiz_id: String (Foreign Key)
  text: String
}

-- Answers table
Answer {
  id: String (Primary Key)
  question_id: String (Foreign Key)
  text: String
  is_correct: Boolean
}

-- Results table
Result {
  id: String (Primary Key)
  user_id: String (Foreign Key)
  quiz_id: String (Foreign Key)
  score: Integer
  created_at: DateTime
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/signout` - User logout

### Quiz Management
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create new quiz
- `PATCH /api/quizzes` - Update quiz
- `DELETE /api/quizzes?id=` - Delete quiz

### Question Management
- `GET /api/questions` - Get all questions
- `POST /api/questions` - Create new question
- `PATCH /api/questions` - Update question
- `DELETE /api/questions?id=` - Delete question

### Answer Management
- `GET /api/answers` - Get all answers
- `POST /api/answers` - Create new answer
- `PATCH /api/answers` - Update answer

### Results
- `GET /api/results` - Get quiz results
- `POST /api/results` - Save quiz result

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Loading States** - Smooth transitions dan feedback
- **Error Handling** - User-friendly error messages
- **Progress Indicators** - Visual progress dalam quiz
- **Hover Effects** - Interactive elements
- **Color Scheme** - Consistent yellow/gold theme

## 🔒 Security Features

- **Password Hashing** dengan bcryptjs
- **JWT Tokens** untuk session management
- **Input Validation** dengan Zod
- **SQL Injection Protection** dengan Prisma
- **CSRF Protection** built-in NextAuth
- **Environment Variables** untuk sensitive data

## 📊 State Management

**Redux Slices:**
- `quizSlice` - Quiz data dan status
- `questionSlice` - Current question dan navigation
- `answerSlice` - Answer selection
- `scoreSlice` - Score tracking
- `uiSlice` - Loading states

## 🚀 Deployment

**Vercel Deployment:**
1. Connect repository ke Vercel
2. Set environment variables
3. Deploy otomatis dari main branch

**Build Commands:**
```bash
npm run build
npm start
```

## 🧪 Testing

**Quick Test dengan Demo Account:**
1. Login sebagai admin: `user@email.com` / `123456`
2. Buat quiz baru di `/admin/create`
3. Kelola quiz di `/admin/manage`
4. Logout dan test sebagai user biasa
5. Kerjakan quiz yang sudah dibuat

**Manual Testing Checklist:**
- [ ] User registration/login
- [ ] Google OAuth flow
- [ ] Quiz creation (Admin)
- [ ] Quiz editing/deletion (Admin)
- [ ] Quiz taking (User)
- [ ] Score calculation
- [ ] Responsive design
- [ ] Database operations

## 📄 License

MIT License - feel free to use for educational purposes.

---

**Developed with Helena Vianney using Next.js 15 & TypeScript**
