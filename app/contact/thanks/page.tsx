import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-400">
          Contact Form
        </p>

        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Message sent
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6">
              <p className="text-lg font-semibold text-slate-100">
                Thank you for your message.
              </p>

              <p className="mt-3 leading-7 text-slate-400">
                Your inquiry has been submitted successfully.
                I will review your message and get back to you as soon as possible.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800/60 p-4 text-sm text-slate-400">
              A copy of your message has been saved securely.
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-8 block w-full rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Back to contact form
          </Link>
        </div>
      </div>
    </main>
  );
}