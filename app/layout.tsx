'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'; 
import { Providers } from './providers';
import { ActiveProfileProvider } from '@/contexts/ActiveProfileContext';
import { Toaster } from "@/components/ui/toast"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-zinc-900`}>
          <ActiveProfileProvider>
            <Providers> 
              {children}
            </Providers>
        </ActiveProfileProvider>
        <Toaster />
      </body>
    </html>
  );
}
