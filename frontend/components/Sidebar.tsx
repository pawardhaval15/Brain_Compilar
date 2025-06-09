"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Code, Terminal, BookOpen, X } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar on route change or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMobileSidebar(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setOpenMobileSidebar(!openMobileSidebar);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-[#00ffb3] hover:text-white md:hidden"
      >
        <Menu size={28} />
      </button>

      {/* Backdrop for Mobile */}
      {isMobile && openMobileSidebar && (
        <div
          onClick={() => setOpenMobileSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 bg-[#1a1a1a] text-white shadow-lg transition-all duration-300
          ${isMobile
            ? openMobileSidebar
              ? "w-64"
              : "w-0 overflow-hidden"
            : collapsed
              ? "w-16"
              : "w-64"
          }
        `}
      >
        {/* Close button on mobile */}
        {isMobile && openMobileSidebar && (
          <button
            onClick={() => setOpenMobileSidebar(false)}
            className="absolute top-4 right-4 text-[#00ffb3] hover:text-white"
          >
            <X size={24} />
          </button>
        )}

        {/* Navigation */}
        <div className="p-4 pt-16 md:pt-4 space-y-4">
          <button
            onClick={toggleSidebar}
            className="hidden md:block mb-6 text-[#00ffb3] hover:text-white"
          >
            <Menu size={24} />
          </button>

          <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-3 hover:text-[#00ffb3]">
              <Code size={20} />
              {!collapsed && !isMobile && <span>Compiler</span>}
              {isMobile && <span>Compiler</span>}
            </Link>

            <Link href="/examples" className="flex items-center gap-3 hover:text-[#00ffb3]">
              <BookOpen size={20} />
              {!collapsed && !isMobile && <span>Examples</span>}
              {isMobile && <span>Examples</span>}
            </Link>

            <Link href="/terminal" className="flex items-center gap-3 hover:text-[#00ffb3]">
              <Terminal size={20} />
              {!collapsed && !isMobile && <span>Terminal</span>}
              {isMobile && <span>Terminal</span>}
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
