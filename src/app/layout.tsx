import './globals.css'; // Pastikan Tailwind di-import di sini atau buat file globals.css kosong jika belum ada
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ClipMaster AI - Viral Video Clipper',
  description: 'AI-Powered TikTok & YouTube Video Clipper and Trending Radar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#0b0f19] text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
