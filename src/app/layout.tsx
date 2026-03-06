import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasanna G | AI Engineer & Full Stack Developer",
  description: "Building intelligent AI systems and modern web experiences. AI Engineer and Full Stack Developer specializing in React, Next.js, TensorFlow, and PyTorch.",
  keywords: ["Prasanna G", "AI Engineer", "Full Stack Developer", "React", "Next.js", "TensorFlow", "Portfolio"],
  authors: [{ name: "Prasanna G" }],
  openGraph: {
    title: "Prasanna G | AI Engineer & Full Stack Developer",
    description: "Building intelligent AI systems and modern web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
