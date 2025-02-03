import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Aditya's Portfolio | Graphic Designer",
  description: "Welcome to Aditya's portfolio, showcasing minimalist, impactful, and meaningful graphic designs.",
  keywords: [
    "graphic designer",
    "minimalist design",
    "Aditya portfolio",
    "visual design",
    "creative portfolio",
  ],
  authors: [
    { name: "Aditya", url: "https://adityaportfolio.com" },
  ],
  creator: "Aditya",
  openGraph: {
    title: "Aditya's Portfolio | Graphic Designer",
    description:
      "Explore Aditya's design journey with a focus on crafting minimalist, impactful, and meaningful visuals.",
    url: "https://adityaportfolio.com",
    siteName: "Aditya's Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800",
        width: 800,
        height: 600,
        alt: "Aditya's Portfolio Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya's Portfolio | Graphic Designer",
    description:
      "Welcome to Aditya's portfolio, showcasing minimalist and impactful graphic designs.",
    images: [
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#020817] text-white min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
