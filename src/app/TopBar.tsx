"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function TopBar() {
  const [showPalette, setShowPalette] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const features = [
    "Minimalist typing test UI",
    "Real-time WPM, CPM, and accuracy stats",
    "Accessible and responsive design",
    "Achievements and badges for progress",
    "Customisable accent colours",
    "Profile and settings management",
    "Practice streaks and personal bests",
    "Open source on GitHub",
  ];
  const GITHUB_REPO_URL = "https://github.com/cxxc7/keyshark";
  const COLORS = [
    { name: " Blue", bg: "bg-blue-500", value: "blue", hex: "#3b82f6" },
    { name: " Green", bg: "bg-green-500", value: "green", hex: "#22c55e" },
    { name: " Red", bg: "bg-red-500", value: "red", hex: "#ef4444" },
    { name: " Purple", bg: "bg-purple-500", value: "purple", hex: "#a21caf" },
    { name: " Orange", bg: "bg-orange-500", value: "orange", hex: "#f97316" },
    { name: " Pink", bg: "bg-pink-500", value: "pink", hex: "#ec4899" },
    { name: " Teal", bg: "bg-teal-500", value: "teal", hex: "#14b8a6" },
    { name: " Yellow", bg: "bg-yellow-400", value: "yellow", hex: "#facc15" },
    { name: " Cyan", bg: "bg-cyan-400", value: "cyan", hex: "#22d3ee" },
  ];
  function setAccentColor(color: string) {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-accent", color);
      localStorage.setItem("accent", color);
      const colorObj = COLORS.find(c => c.value === color);
      document.documentElement.style.setProperty('--accent-color', colorObj?.hex || '#3b82f6');
    }
    setShowPalette(false);
  }
  useEffect(() => {
    setHydrated(true);
    if (typeof window !== "undefined") {
      const accent = localStorage.getItem("accent") || "blue";
      document.documentElement.setAttribute("data-accent", accent);
      const colorObj = COLORS.find(c => c.value === accent);
      document.documentElement.style.setProperty('--accent-color', colorObj?.hex || '#3b82f6');
    }
  }, []);
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("user"));
      setProfilePic(localStorage.getItem("profilePic"));
    }
  }, [hydrated]);
  function handleAccountClick() {
    if (user) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }
  return (
    <header className="w-full h-12 sm:h-14 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm fixed top-0 left-0 z-30 backdrop-blur">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          className="flex items-center gap-2 font-bold text-lg tracking-tight select-none cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          style={{ color: 'var(--accent-color, #2563eb)' }}
          onClick={() => router.push("/")}
          aria-label="Go to home page"
          type="button"
        >
          <span className="flex items-center justify-center mr-1">
            <svg className="w-6 h-6 xs:w-7 xs:h-7 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M2 12l10-7 10 7-10 7-10-7z"></path>
                <path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"></path>
            </svg>
          </span>
          <span className="ml-1">KeyShark</span>
        </button>
        <span className="ml-3 text-xs text-zinc-400 font-mono hidden sm:inline">Typing Test</span>
        <div className="flex-1 flex items-center min-w-0 mx-4 overflow-hidden">
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block min-w-full text-xs sm:text-sm font-medium opacity-80" style={{ animation: 'marquee 30s linear infinite', color: 'var(--accent-color, #2563eb)' }}>
              <span style={{ display: 'inline-block', minWidth: '100%' }}>
                {features.map((f, i) => (
                  <span key={f} className="mx-6">
                    <span aria-hidden="true">• </span>{f}
                  </span>
                ))}
                {/* Repeat for seamless loop */}
                {features.map((f, i) => (
                  <span key={f + '-repeat'} className="mx-6">
                    </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <button
            className="p-2 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 transition"
            aria-label="Choose accent color"
            onClick={() => setShowPalette((v) => !v)}
            title="Choose accent color"
            style={{ minWidth: 0 }}
          >
            <span className="inline-block w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700" style={{ backgroundColor: `var(--accent-color, #2563eb)` }} />
            <span className="text-xs text-zinc-500 dark:text-zinc-300 ml-1 hidden xs:inline">Theme</span>
            <svg className="w-3 h-3 ml-1 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4"/></svg>
          </button>
          {showPalette && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-4 flex flex-col gap-2 z-50 w-full min-w-[320px] max-w-[420px]">
              <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 text-center">Choose Accent Color</div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    className="flex flex-col items-center gap-1 py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    onClick={() => setAccentColor(c.value)}
                    aria-label={c.name}
                    title={c.name}
                  >
                    <span className={`inline-block w-7 h-7 rounded-full border-2 border-zinc-300 dark:border-zinc-700 ${c.bg}`} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="hover:scale-110 transition-transform ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-zinc-700 dark:text-zinc-200"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
          </svg>
        </a>
        <button className="p-2 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition ml-2" aria-label="Account" onClick={handleAccountClick}>
          {hydrated && profilePic ? (
            <img
              src={profilePic}
              alt="Profile pic"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-300 dark:border-zinc-700 shadow"
            />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
          )}
          <span className="hidden sm:inline">{hydrated && user ? user.split("@")[0] : "Login"}</span>
        </button>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default TopBar;
