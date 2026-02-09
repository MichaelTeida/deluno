import Link from "next/link";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-4">
                <div className="max-w-6xl mx-auto glass px-6 py-4 flex items-center justify-between" data-variant="panel">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                            DO
                        </div>
                        <span className="font-bold text-lg tracking-tight text-zinc-900">Deluno</span>
                    </Link>

                    {/* CTA */}
                    <Link
                        href="/dashboard"
                        className="glass h-10 px-6 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center rounded-full transition-colors"
                        data-variant="interactive"
                        data-no-shine="true"
                    >
                        Rozpocznij
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pt-24">
                {children}
            </main>

            {/* Footer */}
            <footer className="p-4">
                <div className="max-w-6xl mx-auto glass px-6 py-6 text-center" data-variant="panel">
                    <p className="text-sm text-zinc-500">
                        © 2026 Deluno. Wszystkie prawa zastrzeżone.
                    </p>
                </div>
            </footer>
        </div>
    );
}
