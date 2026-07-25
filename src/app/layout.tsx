import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { LoadingProvider } from "@/components/loading/LoadingProvider";
import { CursorProvider } from "@/components/cursor/CursorContext";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mantu Yadav — Python & Backend Developer",
    template: "%s | Mantu Yadav",
  },
  description:
    "Portfolio of Mantu Yadav — Python Developer, Backend Engineer, and FastAPI specialist building scalable systems and clean interfaces.",
  keywords: [
    "Mantu Yadav",
    "Python Developer",
    "Backend Engineer",
    "FastAPI",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Mantu Yadav" }],
  creator: "Mantu Yadav",
  metadataBase: new URL("https://mantuyadav.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mantuyadav.dev",
    siteName: "Mantu Yadav Portfolio",
    title: "Mantu Yadav — Python & Backend Developer",
    description:
      "Portfolio of Mantu Yadav — Python Developer, Backend Engineer, and FastAPI specialist building scalable systems and clean interfaces.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mantu Yadav — Python & Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantu Yadav — Python & Backend Developer",
    description:
      "Portfolio of Mantu Yadav — Python Developer, Backend Engineer, and FastAPI specialist.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <JsonLd />
        <TooltipProvider delay={300}>
          <CursorProvider>
            <CustomCursor />
            <LoadingProvider>
              <SmoothScroll>
                <Navbar />
                {children}
                <MusicPlayer />
              </SmoothScroll>
            </LoadingProvider>
          </CursorProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
