import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circuit',
  description: 'A Decentralized governing solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black-100 font-poppins">{children}</body>
    </html>
  );
}
