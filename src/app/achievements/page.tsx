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
  const [bestWpm, setBestWpm] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [goalWpm, setGoalWpm] = useState(80);
  const [goalPractice, setGoalPractice] = useState(5);
  const [practiceCount, setPracticeCount] = useState(0);
  const [goalMsg, setGoalMsg] = useState("");
  const [goalHistory, setGoalHistory] = useState<{ wpm: number; practice: number; date: string }[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'wpm' | 'practice'>('date');
  const [sortAsc, setSortAsc] = useState(false); // false = desc by default
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

  function handleDeleteGoal(idx: number) {
    let history = getLocal("goalHistory", []);
    history.splice(idx, 1);
    localStorage.setItem("goalHistory", JSON.stringify(history));
    setGoalHistory([...history]);
  }

  // --- Sorting logic ---
  function handleSortButton(by: 'date' | 'wpm' | 'practice') {
    if (sortBy === by) {
      setSortAsc(!sortAsc); // toggle direction
    } else {
      setSortBy(by);
      setSortAsc(false); // default to desc
    }
  }

  // Sort goalHistory for display
  const sortedGoalHistory = [...goalHistory].sort((a, b) => {
    if (sortBy === 'date') {
      return sortAsc ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'wpm') {
      return sortAsc ? a.wpm - b.wpm : b.wpm - a.wpm;
    } else {
      return sortAsc ? a.practice - b.practice : b.practice - a.practice;
    }
  });
  // --- END Sorting logic ---

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar />
      {/* Removed custom top bar, only global top bar will show */}
      <main className="md:ml-44 sm:ml-56 pt-16 sm:pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] w-full">
        <section className="w-full max-w-2xl mt-4 sm:mt-8 p-0 sm:p-0 bg-transparent flex flex-col gap-4 sm:gap-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center mb-2 mt-4 sm:mt-8">Achievements & Goals</h1>
          {/* Personal Bests */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 xs:p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-base xs:text-lg font-semibold mb-2">Personal Bests</h2>
            <div className="flex flex-wrap gap-2 xs:gap-4 justify-center">
              <div className="flex flex-col items-center min-w-[80px]"><span className="text-xl xs:text-2xl font-bold text-blue-600 dark:text-blue-400">{bestWpm}</span><span className="text-xs text-zinc-500">Highest WPM</span></div>
              <div className="flex flex-col items-center min-w-[80px]"><span className="text-xl xs:text-2xl font-bold text-green-600 dark:text-green-400">{bestAccuracy}%</span><span className="text-xs text-zinc-500">Best Accuracy</span></div>
              <div className="flex flex-col items-center min-w-[80px]"><span className="text-xl xs:text-2xl font-bold text-purple-600 dark:text-purple-400">{longestSession}</span><span className="text-xs text-zinc-500">Longest Session (min)</span></div>
            </div>
          </div>
          {/* Achievements / Badges */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 xs:p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-base xs:text-lg font-semibold mb-2">Badges & Achievements</h2>
            <div className="flex flex-wrap gap-2 xs:gap-3 justify-center">
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
                      className={`inline-flex items-center gap-1 px-2 xs:px-3 py-1 rounded-full text-xs font-semibold border transition ${
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
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 xs:p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <h2 className="text-base xs:text-lg font-semibold mb-2">Typing Goals</h2>
            <div className="flex flex-col gap-2 xs:flex-row xs:items-end xs:gap-6">
              <label className="flex flex-col text-sm font-medium w-full xs:w-auto">
                WPM Goal
                <input
                  type="number"
                  min={10}
                  max={200}
                  className="mt-1 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full xs:w-32"
                  value={goalWpm}
                  onChange={e => setGoalWpm(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-medium w-full xs:w-auto">
                Practice Sessions/Week
                <input
                  type="number"
                  min={1}
                  max={14}
                  className="mt-1 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full xs:w-32"
                  value={goalPractice}
                  onChange={e => setGoalPractice(Number(e.target.value))}
                />
              </label>
              <button
                className="mt-2 xs:mt-0 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition w-full xs:w-auto"
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
                <div className="mt-2 grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3">
                  {goalHistory.map((g, idx) => (
                    <div key={g.wpm + '-' + g.practice + '-' + g.date} className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 flex flex-col gap-1 text-xs text-zinc-700 dark:text-zinc-200 shadow-sm relative">
                      <div><span className="font-semibold">WPM:</span> {g.wpm}</div>
                      <div><span className="font-semibold">Sessions/Week:</span> {g.practice}</div>
                      <div className="text-zinc-400">{new Date(g.date).toLocaleDateString()}</div>
                      <button
                        className="absolute top-2 right-2 px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800 transition text-xs flex items-center"
                        onClick={() => handleDeleteGoal(idx)}
                        aria-label="Delete goal"
                        type="button"
                        title="Delete goal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
