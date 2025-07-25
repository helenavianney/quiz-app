import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar - Quiz Master | Bergabung Sekarang",
  description: "Daftar akun Quiz Master gratis dan mulai tantangan quiz interaktif. Bergabung dengan ribuan pengguna lain dan uji pengetahuanmu!",
  keywords: "daftar quiz master, registrasi quiz online, buat akun quiz, bergabung quiz master, signup quiz app",
  authors: [{ name: "Quiz Master" }],
  openGraph: {
    title: "Daftar - Quiz Master | Bergabung Sekarang",
    description: "Daftar akun Quiz Master gratis dan mulai tantangan quiz interaktif. Bergabung dengan ribuan pengguna lain dan uji pengetahuanmu!",
    type: "website",
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
