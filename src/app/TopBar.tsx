"use client";
import React from "react";

const GITHUB_REPO_URL = "https://github.com/cxxc7/keyshark"; // TODO: Replace with your repo

export default function TopBar() {
  // Features for the marquee
  const features = [
    "Minimalist UK-themed typing test UI",
    "Real-time WPM, CPM, and accuracy stats",
    "Accessible and responsive design",
    "Achievements and badges for progress",
    "Customisable accent colours",
    "Profile and settings management",
    "Practice streaks and personal bests",
    "Open source on GitHub!",
  ];
  return (
    <header className="w-full h-12 sm:h-14 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm fixed top-0 left-0 z-30 backdrop-blur">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-lg tracking-tight text-blue-700 dark:text-blue-300 select-none">KeyShark</span>
        <span className="ml-2 text-xs text-zinc-400 font-mono hidden sm:inline">UK Typing Test</span>
      </div>
      <div className="flex-1 flex items-center min-w-0 mx-4">
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block min-w-full text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium opacity-80">
            {features.map((f, i) => (
              <span key={i} className="mx-6">
                {f}
                <span aria-hidden="true"> • </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on GitHub"
        className="hover:scale-110 transition-transform"
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
      <style jsx>{`
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
