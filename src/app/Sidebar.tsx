"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  function handleNav(path: string) {
    router.push(path);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <aside className="hidden md:flex flex-col w-44 sm:w-56 h-full bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border-r border-zinc-200 dark:border-zinc-800 py-4 sm:py-6 px-2 sm:px-4 gap-4 sm:gap-6 fixed top-0 left-0 z-20 pt-14 sm:pt-16 shadow-lg">
      <nav className="flex flex-col gap-2 sm:gap-4 mt-6 sm:mt-8">
        <button onClick={() => handleNav("/")} className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-zinc-800 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6v12"/></svg>
          <span>Typing Test</span>
        </button>
        <button onClick={() => handleNav("/achievements")} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition hover:bg-blue-50 dark:hover:bg-zinc-800 ${typeof window !== 'undefined' && window.location.pathname === '/achievements' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-zinc-800' : 'text-zinc-700 dark:text-zinc-300'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
          <span>Achievements</span>
        </button>
        <button onClick={() => handleNav("/profile")} className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-zinc-800 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
          <span>Profile</span>
        </button>
        <button onClick={() => handleNav("/settings")} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition hover:bg-blue-50 dark:hover:bg-zinc-800 ${typeof window !== 'undefined' && window.location.pathname === '/settings' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-zinc-800' : 'text-zinc-700 dark:text-zinc-300'}`}> 
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1V13a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"/></svg>
          <span>Settings</span>
        </button>
        {user && (
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><rect x="3" y="4" width="8" height="16" rx="2"/></svg>
            <span>Logout</span>
          </button>
        )}
      </nav>
      <div className="mt-auto text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-2 justify-center pb-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 12a9 9 0 1 1 18 0"/></svg>
        <span>&copy; 2025 KeyShark</span>
      </div>
    </aside>
  );
}
