'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return setError(error.message)
    router.push('/auth/login') // or redirect to dashboard
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleRegister} className="bg-black text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </div>
  )
}
