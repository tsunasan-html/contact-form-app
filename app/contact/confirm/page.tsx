'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ConfirmPage() {
  const router = useRouter();
  const [form, setForm] = useState<ContactForm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('contactForm');

    if (!saved) {
      router.push('/contact');
      return;
    }

    setForm(JSON.parse(saved));
  }, [router]);

  const handleSubmit = async () => {
    if (!form || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Something went wrong.');
        return;
      }

      sessionStorage.removeItem('contactForm');
      router.push('/contact/thanks');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
    
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-slate-200">
              Loading...
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Preparing your confirmation page
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-400">
          Contact Form
        </p>

        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Confirm your message
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <div className="divide-y divide-slate-800">
            <div className="grid gap-2 py-5 sm:grid-cols-3">
              <p className="text-sm font-semibold text-slate-400">Name</p>
              <p className="text-base text-slate-100 sm:col-span-2">
                {form.name}
              </p>
            </div>

            <div className="grid gap-2 py-5 sm:grid-cols-3">
              <p className="text-sm font-semibold text-slate-400">Email</p>
              <p className="text-base text-slate-100 sm:col-span-2">
                {form.email}
              </p>
            </div>

            <div className="grid gap-2 py-5 sm:grid-cols-3">
              <p className="text-sm font-semibold text-slate-400">Message</p>
              <p className="whitespace-pre-wrap text-base leading-7 text-slate-100 sm:col-span-2">
                {form.message || 'No message'}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-800/60 p-4 text-sm text-slate-400">
            Please review your information before sending.
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/contact')}
              className="w-1/2 rounded-2xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-1/2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}