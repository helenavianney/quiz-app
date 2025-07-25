import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk - Quiz Master | Login ke Akun Anda",
  description: "Masuk ke akun Quiz Master Anda dan lanjutkan petualangan quiz interaktif. Akses ribuan pertanyaan menarik dari berbagai kategori.",
  keywords: "login quiz master, masuk quiz online, signin quiz app, akses akun quiz",
  authors: [{ name: "Quiz Master" }],
  openGraph: {
    title: "Masuk - Quiz Master | Login ke Akun Anda",
    description: "Masuk ke akun Quiz Master Anda dan lanjutkan petualangan quiz interaktif. Akses ribuan pertanyaan menarik dari berbagai kategori.",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}