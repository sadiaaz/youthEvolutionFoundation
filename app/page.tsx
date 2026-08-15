import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 text-gray-800">
      <main className="flex max-w-3xl flex-col items-center text-center">
        {/* Foundation Badge */}
        <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-900">
          Official Web Platform
        </span>

        {/* Main Title */}
        <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl md:text-6xl">
          Welcome to <br />
          <span className="text-teal-600">Youth Evolution Foundation</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mt-6 text-lg text-gray-600 sm:text-xl">
          Empowering youth through education, mentorship, and community leadership.
        </p>

        {/* CTA Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/studio"
            className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
          >
            Access CMS Studio
          </Link>
          <a
            href="https://github.com/sadiaaz/youthEvolutionFoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-100 active:scale-95"
          >
            GitHub Repository
          </a>
        </div>

        {/* Status Footer */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-sm text-gray-500">
          🚀 <span className="font-medium text-gray-700">Week 1 Sprint Active:</span> Frontend Layout & Sanity CMS setup in progress.
        </div>
      </main>
    </div>
  );
}