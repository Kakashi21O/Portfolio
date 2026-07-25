import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { LoadingProvider } from "@/components/loading/LoadingProvider";
import { CursorProvider } from "@/components/cursor/CursorContext";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mantu Yadav — Python & Backend Developer",
  description: "Portfolio of Mantu Yadav — Python Developer, Backend Engineer, FastAPI Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <CursorProvider>
          <CustomCursor />
          <LoadingProvider>
            <Navbar />
            {children}
          </LoadingProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
