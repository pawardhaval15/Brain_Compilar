// components/Navbar.jsx
"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-[#0e0e0e] text-[#00ffb3] shadow border-b border-[#00ffb3]/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src="/AI.webp" alt="Logo" width={40} height={40} className="rounded-full" />
          <span className="text-lg font-bold">BrainCompiler AI</span>
        </div>

        <nav className="space-x-6 text-sm">
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Docs
          </a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Deploy
          </a>
        </nav>
      </div>
    </header>
  );
}
