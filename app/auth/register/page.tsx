'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4"
    style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-[#3ECF8E]">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full bg-[#3ECF8E] hover:bg-green-500 transition text-white py-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>
        <p className="text-gray-400 mt-4 text-sm">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-[#3ECF8E] hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
