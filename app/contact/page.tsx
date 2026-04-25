'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleConfirm = async () => {
    setErrors({ name: '', email: '' });

    const res = await fetch('/api/contact/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({
        name: data.errors?.name || '',
        email: data.errors?.email || '',
      });
      return;
    }

    sessionStorage.setItem('contactForm', JSON.stringify(form));
    router.push('/contact/confirm');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-0 py-8 text-slate-100 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-2xl px-6 sm:px-0">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-400">
          Contact Form
        </p>

        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Get in touch
        </h1>

        <div className="bg-transparent p-0 shadow-none sm:rounded-3xl sm:border sm:border-slate-800 sm:bg-slate-900/80 sm:p-8 sm:shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-400">
                Name <span className="text-red-300">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-400"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-400">
                Email <span className="text-red-300">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-400"
                placeholder="example@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-400">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="h-40 w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-400"
                placeholder="Write your message here..."
              />
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-8 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Continue to confirmation
          </button>
        </div>
      </div>
    </main>
  );
}