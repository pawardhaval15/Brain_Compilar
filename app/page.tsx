"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setShowButton(true);
    }, 10000); // Show button after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => router.push("/dashboard");

  if (showAnimation) {
    return (
      <div className="w-full h-screen overflow-hidden bg-black">
        <iframe
          src="/examples/animejs-v4-logo-animation/index.html"
          className="w-full h-full border-none"
          title="Intro Animation"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black transition-all duration-1000">
      {showButton && (
        <button
          onClick={handleNavigate}
          className="px-8 py-4 text-lg font-bold text-black bg-[#00ffb3] hover:bg-[#00e6a6] rounded-xl transition-all shadow-lg"
        >
          Go to Dashboard →
        </button>
      )}
    </div>
  );
}
