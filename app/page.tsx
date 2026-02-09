import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto glass px-6 py-4 flex items-center justify-between" data-variant="panel">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              DO
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900">Deluno</span>
          </Link>
          <Link
            href="/sign-in"
            className="glass h-10 px-6 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center rounded-full transition-colors"
            data-variant="interactive"
            data-no-shine="true"
          >
            Rozpocznij
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
            Your workspace
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-xl mx-auto">
            Organizuj projekty, notatki i zadania w jednym miejscu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-in"
              className="glass h-12 px-8 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center rounded-full transition-colors"
              data-variant="interactive"
              data-no-shine="true"
            >
              Try for free
            </Link>
            <Link
              href="#features"
              className="glass h-12 px-8 text-base font-medium text-zinc-700 flex items-center justify-center rounded-full transition-colors"
              data-variant="interactive"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-12">
            Wszystko czego potrzebujesz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Notes", desc: "Create and organize notes with rich formatting.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
              { title: "Projects", desc: "Manage projects and collaborate with your team.", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
              { title: "Integrations", desc: "Connect with tools you already use.", icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" }
            ].map((f, i) => (
              <div key={i} className="glass p-6 text-center" data-variant="panel">
                <div className="w-12 h-12 mx-auto mb-4 glass flex items-center justify-center text-indigo-600" data-variant="interactive">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto glass p-8 md:p-12 text-center" data-variant="panel">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-zinc-600 mb-8">
            Join the alpha test and try Deluno for free.
          </p>
          <Link
            href="/panel"
            className="glass h-12 px-8 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none inline-flex items-center justify-center rounded-full transition-colors"
            data-variant="interactive"
            data-no-shine="true"
          >
            Rozpocznij teraz
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4">
        <div className="max-w-6xl mx-auto glass px-6 py-6 text-center" data-variant="panel">
          <p className="text-sm text-zinc-500">&copy; 2026 Deluno. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
