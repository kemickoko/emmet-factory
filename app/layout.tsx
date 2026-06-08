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
  return (
    <html lang="ja" className="dark"> {/* 最初からダークモード（黒背景）を標準にします */}
      <body className="bg-zinc-950 text-zinc-50 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}