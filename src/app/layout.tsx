import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Jarvis | AI-Powered Job Application Assistant",
  description: "Set the role, Jarvis applies for you. The AI agent that automatically applies to jobs on your behalf, 24/7. Focus on interviews, not applications.",
  keywords: ["job application", "AI", "automation", "job search", "career", "auto-apply"],
  authors: [{ name: "Job Jarvis" }],
  openGraph: {
    title: "Job Jarvis | AI-Powered Job Application Assistant",
    description: "Set the role, Jarvis applies for you. The AI agent that automatically applies to jobs on your behalf, 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#050510] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
