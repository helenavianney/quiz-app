import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";

const manrope = Manrope({
  subsets: ['latin'],
}
)

export const metadata: Metadata = {
  title: "Quiz Master | Tantang Pengetahuanmu",
  description: "Aplikasi quiz interaktif dengan berbagai kategori pengetahuan, papan peringkat, dan mode tantangan waktu. Uji dan tingkatkan pengetahuanmu sekarang!",
  keywords: "quiz online, kuis pengetahuan, game edukasi, tantangan quiz, quiz interaktif, papan peringkat, quiz kategori, belajar sambil bermain",
  authors: [{ name: "Quiz Master" }],
  openGraph: {
    title: "Quiz Master | Platform Quiz Interaktif",
    description: "Tantang dirimu dengan berbagai pertanyaan menarik dari beragam kategori. Raih skor tertinggi dan bandingkan dengan pemain lain!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
