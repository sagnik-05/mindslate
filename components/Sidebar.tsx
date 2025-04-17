'use client';

import { ClipboardCheck, LayoutDashboard, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname(); // Get the current route

  return (
    <aside className="w-64 bg-[#161616] p-6 border-r border-[#2a2a2a] shadow-md">
      <h2 className="text-2xl font-semibold mb-10 text-[#3ECF8E]">MindSlate</h2>
      <nav className="space-y-4">

        <a
          href="/dashboard"
          className={`block transition  ${
            pathname === '/dashboard' ? 'text-[#3ECF8E] font-bold' : 'text-gray-400 hover:text-[#3ECF8E]'
          }`}
        >
          
          <span><LayoutDashboard className='inline mr-2'/> Dashboard</span>
        </a>
        <a
          href="/tasks"
          className={`block transition ${
            pathname === '/tasks' ? 'text-[#3ECF8E] font-bold' : 'text-gray-400 hover:text-[#3ECF8E]'
          }`}
        >
          <span><ClipboardCheck className='inline mr-2' /> Tasks</span>
        </a>
        <a
          href="/settings"
          className={`block transition ${
            pathname === '/settings' ? 'text-[#3ECF8E] font-bold' : 'text-gray-400 hover:text-[#3ECF8E]'
          }`}
        >
          <span><Settings className='inline mr-2' /> Settings</span> 
        </a>
      </nav>
    </aside>
  );
}