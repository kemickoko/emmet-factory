import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmmetFactory",
  description: "Minimalist & Powerful Web Experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // <html> と <body> の間、および閉じタグの間の改行コード・インデントを完全に無くしています
  return (
    <html lang="ja" className="dark"><body className="bg-zinc-950 text-zinc-50 antialiased font-sans">{children}</body></html>
  );
}