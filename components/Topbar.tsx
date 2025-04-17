'use client'
import { useEffect, useState } from 'react'

export default function Topbar() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('username')
    if (storedUser) setUsername(storedUser)
  }, [])

  return (
    <header className="flex justify-end items-center h-16 px-6 bg-[#161616] shadow-md border-b border-[#2a2a2a]">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">{username}</span>
        <img
          src="https://avatar.iran.liara.run/public"
          alt="User"
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      </div>
    </header>
  )
}
