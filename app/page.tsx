// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-500">MindSlate</h1>
        <nav className="space-x-4">
          <Link href="/auth/login" className="text-white hover:text-green-400">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Hero Section */}
      <section className="flex flex-col items-center text-center mt-32">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Build your ideas <br /> Organize your mind
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-8">
          MindSlate is your open-source productivity dashboard. Track tasks, write notes,
          and stay focused — powered by Supabase and Next.js.
        </p>
        <Link
          href="/auth/register"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
