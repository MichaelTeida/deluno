import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
    title: {
        default: "Deluno | Your workspace for every idea",
        template: "%s | Deluno",
    },
    description: "Notes, tasks, and projects in one beautiful workspace. Powered by Liquid Glass UI, real time sync, and keyboard-first design. Free alpha access available now.",
    keywords: [
        "notes app", "project management", "task manager", "SaaS", "productivity",
        "Deluno", "workspace", "glass UI", "team collaboration", "liquid glass",
        "real time sync", "Convex", "Next.js", "dark mode", "keyboard shortcuts",
    ],
    openGraph: {
        title: "Deluno | Your workspace for every idea",
        description: "Notes, tasks, and projects in one beautiful workspace. Free alpha access available now.",
        type: "website",
        siteName: "Deluno",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Deluno | Your workspace for every idea",
        description: "Notes, tasks, and projects in one beautiful workspace. Free alpha access available now.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {},
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
