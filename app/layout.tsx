import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlassFilter";
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
  title: "Deluno | Your workspace for productivity",
  description: "Organize projects, notes, and tasks in one place. A modern SaaS platform with unique Liquid Glass design.",
  keywords: ["notes", "projects", "task management", "SaaS", "productivity", "Deluno"],
  authors: [{ name: "Deluno Team" }],
  openGraph: {
    title: "Deluno | Your workspace for productivity",
    description: "A modern platform for organizing your work.",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LiquidGlassFilter />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
