// components/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Code, Terminal, BookOpen } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={`bg-[#1a1a1a] text-white h-screen p-4 transition-all duration-300 shadow-lg ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="mb-6 text-[#00ffb3] hover:text-white"
      >
        <Menu size={24} />
      </button>

      <nav className="space-y-4">
        <Link href="/" className="flex items-center gap-3 hover:text-[#00ffb3]">
          <Code size={20} />
          {!collapsed && <span>Compiler</span>}
        </Link>

        <Link href="/examples" className="flex items-center gap-3 hover:text-[#00ffb3]">
          <BookOpen size={20} />
          {!collapsed && <span>Examples</span>}
        </Link>

        <Link href="/terminal" className="flex items-center gap-3 hover:text-[#00ffb3]">
          <Terminal size={20} />
          {!collapsed && <span>Terminal</span>}
        </Link>
      </nav>
    </aside>
  );
}
