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
  title: "Deluno — One workspace. Every idea.",
  description: "Notes, projects, and tasks behind one beautiful glass interface. Free alpha access — no credit card, no catch.",
  keywords: ["notes", "projects", "task management", "SaaS", "productivity", "Deluno", "workspace", "glass UI"],
  authors: [{ name: "Deluno" }],
  openGraph: {
    title: "Deluno — One workspace. Every idea.",
    description: "Notes, projects, and tasks behind one beautiful glass interface. Free alpha access.",
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
