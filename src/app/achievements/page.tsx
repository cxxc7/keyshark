"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Helper to get from localStorage or fallback
function getLocal(key: string, fallback: any) {
  if (typeof window !== "undefined") {
    const val = localStorage.getItem(key);
    if (val !== null && val !== undefined) return JSON.parse(val);
  }
  return fallback;
}


export default function AchievementsPage() {
  // Hydration fix: only render after client loads
  const [hydrated, setHydrated] = useState(false);
  // ...existing state...
  const [bestWpm, setBestWpm] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [goalWpm, setGoalWpm] = useState(80);
  const [goalPractice, setGoalPractice] = useState(5);
  const [practiceCount, setPracticeCount] = useState(0);
  const [goalMsg, setGoalMsg] = useState("");
  const [goalHistory, setGoalHistory] = useState<{ wpm: number; practice: number; date: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
    setBestWpm(getLocal("bestWpm", 0));
    setBestAccuracy(getLocal("bestAccuracy", 0));
    setLongestSession(getLocal("longestSession", 0));
    setBadges(getLocal("badges", []));
    setGoalWpm(getLocal("goalWpm", 80));
    setGoalPractice(getLocal("goalPractice", 5));
    setPracticeCount(getLocal("practiceCount", 0));
    setGoalHistory(getLocal("goalHistory", []));
  }, []);

  if (!hydrated) return null;

  function handleGoalSave() {
    localStorage.setItem("goalWpm", JSON.stringify(goalWpm));
    localStorage.setItem("goalPractice", JSON.stringify(goalPractice));
    // Save unique goal to history
    const newGoal = { wpm: goalWpm, practice: goalPractice, date: new Date().toISOString() };
    let history = getLocal("goalHistory", []);
    // Only add if not already present
    if (!history.some((g: any) => g.wpm === newGoal.wpm && g.practice === newGoal.practice)) {
      history = [newGoal, ...history];
      localStorage.setItem("goalHistory", JSON.stringify(history));
      setGoalHistory(history);
    }
    setGoalMsg("Goals saved!");
    setTimeout(() => setGoalMsg(""), 1500);
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar />
      <header className="fixed top-0 left-0 w-full z-30 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm md:ml-44 sm:ml-56">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">
            <svg className="w-6 h-6 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12l10-7 10 7-10 7-10-7z"/><path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"/></svg>
            KeyShark
          </Link>
          <span className="hidden xs:inline text-xs text-zinc-500 ml-2">Achievements</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 flex-nowrap w-full sm:w-auto justify-end">
          <button
            className="p-2 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition"
            aria-label="Back to Typing Test"
            onClick={() => router.push("/")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header>
      <main className="md:ml-44 sm:ml-56 pt-16 sm:pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] w-full">
        <section className="w-full max-w-2xl mt-4 sm:mt-8 p-0 sm:p-0 bg-transparent flex flex-col gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 mt-4 sm:mt-8">Achievements & Goals</h1>
          {/* Personal Bests */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2">Personal Bests</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center"><span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bestWpm}</span><span className="text-xs text-zinc-500">Highest WPM</span></div>
              <div className="flex flex-col items-center"><span className="text-2xl font-bold text-green-600 dark:text-green-400">{bestAccuracy}%</span><span className="text-xs text-zinc-500">Best Accuracy</span></div>
              <div className="flex flex-col items-center"><span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{longestSession}</span><span className="text-xs text-zinc-500">Longest Session (min)</span></div>
            </div>
          </div>
          {/* Achievements / Badges */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2">Badges & Achievements</h2>
            <div className="flex flex-wrap gap-3">
              {/* All possible badges */}
              {(() => {
                const ALL_BADGES = [
                  "First 50 WPM",
                  "80+ WPM!",
                  "No Mistakes",
                  "10+ Min Session",
                  "7 Days Streak"
                ];
                if (badges.length === 0) {
                  return <span className="text-xs text-zinc-400">No badges yet. Start typing to earn achievements!</span>;
                }
                return ALL_BADGES.map((badge, i) => {
                  const earned = badges.includes(badge);
                  return (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                        earned
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 border-zinc-300 dark:border-zinc-700 opacity-60"
                      }`}
                      title={earned ? "Badge earned" : "Badge not yet earned"}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                      {badge}
                      {!earned && <span className="ml-1">(Locked)</span>}
                    </span>
                  );
                });
              })()}
            </div>
          </div>
          {/* Typing Goals */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2">Typing Goals</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-6">
              <label className="flex flex-col text-sm font-medium">
                WPM Goal
                <input
                  type="number"
                  min={10}
                  max={200}
                  className="mt-1 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-32"
                  value={goalWpm}
                  onChange={e => setGoalWpm(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-medium">
                Practice Sessions/Week
                <input
                  type="number"
                  min={1}
                  max={14}
                  className="mt-1 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-32"
                  value={goalPractice}
                  onChange={e => setGoalPractice(Number(e.target.value))}
                />
              </label>
              <button
                className="mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                onClick={handleGoalSave}
              >
                Save Goals
              </button>
            </div>
            {goalMsg && <span className="text-green-600 text-xs mt-1">{goalMsg}</span>}
            <div className="mt-2 text-xs text-zinc-500">This week: <b>{practiceCount}</b> sessions</div>
            <div className="mt-2 text-xs text-zinc-700 dark:text-zinc-300">
              <b>Current Saved Goals:</b><br />
              WPM Goal: <span className="font-semibold">{goalWpm}</span><br />
              Practice Sessions/Week: <span className="font-semibold">{goalPractice}</span>
            </div>
            {goalHistory.length > 0 && (
              <div className="mt-4">
                <b className="text-xs">Goal History:</b>
                <ul className="mt-1 space-y-1">
                  {goalHistory.map((g, idx) => (
                    <li key={g.wpm + '-' + g.practice + '-' + g.date} className="text-xs text-zinc-600 dark:text-zinc-300">
                      <span className="font-semibold">WPM:</span> {g.wpm}, <span className="font-semibold">Sessions/Week:</span> {g.practice} <span className="text-zinc-400">({new Date(g.date).toLocaleDateString()})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
