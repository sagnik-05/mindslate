'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        router.push('/auth/login')
      } else {
        setUser({ email: data.user.email || '' })
        localStorage.setItem('username', data.user.email || '')
      }
    }

    getUser()
  }, [router])
  // if (!user) return <div className="text-center mt-20 text-white">Loading...</div>

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome 👋</h1>
          <p className="mb-6 text-gray-400">This is your productivity dashboard.</p>
        </main>
      </div>
    </div>
  )
}
