'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        router.push('/auth/login') // redirect if not logged in
      } else {
        setUser({ email: data.user.email || '' })
      }
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (!user) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email} 👋</h1>
      <p className="mb-6 text-gray-600">This is your productivity dashboard.</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )
}
