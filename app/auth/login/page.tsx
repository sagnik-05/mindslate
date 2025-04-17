'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push('/dashboard');
  };

  const handleForgotPassword = async () => {
    setError('');
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return setError(error.message);
    setMessage('Password reset email sent. Please check your inbox.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-[#3ECF8E]">Log In</h2>

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
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#3ECF8E] hover:bg-green-500 transition text-white py-3 rounded-lg font-semibold mb-4"
        >
          Log In
        </button>

        <button
          onClick={handleForgotPassword}
          className="w-full bg-transparent border border-[#3ECF8E] hover:bg-[#3ECF8E] transition text-white py-3 rounded-lg font-semibold"
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
}