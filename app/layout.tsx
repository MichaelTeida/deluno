import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deluno | Twoja przestrzeń do pracy",
  description: "Organizuj projekty, notatki i zadania w jednym miejscu. Nowoczesna platforma SaaS z unikalnym designem Liquid Glass.",
  keywords: ["notatki", "projekty", "zarządzanie zadaniami", "SaaS", "produktywność", "Deluno"],
  authors: [{ name: "Deluno Team" }],
  openGraph: {
    title: "Deluno | Twoja przestrzeń do pracy",
    description: "Nowoczesna platforma do organizacji pracy.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
