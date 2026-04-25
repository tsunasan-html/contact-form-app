import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-400">
          Portfolio
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Contact Form Demo
        </h1>

        <p className="mb-10 text-lg text-slate-400">
          A simple contact form built with Next.js, API Routes, and Supabase.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Go to Contact
          </Link>
        </div>
      </div>
    </main>
  );
}