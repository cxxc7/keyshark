"use client";
import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";

export default function SettingsPage() {
  const [timerDuration, setTimerDuration] = useState(60);
  const [showLiveStats, setShowLiveStats] = useState(true);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [sound, setSound] = useState(true); // Added sound state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDuration = Number(localStorage.getItem("timerDuration"));
      const validDurations = [15, 30, 60, 120];
      setTimerDuration(validDurations.includes(storedDuration) ? storedDuration : 60);
      setShowLiveStats(localStorage.getItem("showLiveStats") !== "off");
      setShowAccuracy(localStorage.getItem("showAccuracy") !== "off");
      setShowProgressBar(localStorage.getItem("showProgressBar") !== "off");
      setSound(localStorage.getItem("sound") !== "off"); // Initialize sound
    }
  }, []);

  function handleTimerChange(val: number) {
    const validDurations = [15, 30, 60, 120];
    if (validDurations.includes(val)) {
      setTimerDuration(val);
      localStorage.setItem("timerDuration", String(val));
    }
  }
  function handleLiveStatsChange(val: boolean) {
    setShowLiveStats(val);
    localStorage.setItem("showLiveStats", val ? "on" : "off");
  }
  function handleAccuracyChange(val: boolean) {
    setShowAccuracy(val);
    localStorage.setItem("showAccuracy", val ? "on" : "off");
  }
  function handleProgressBarChange(val: boolean) {
    setShowProgressBar(val);
    localStorage.setItem("showProgressBar", val ? "on" : "off");
  }
  function handleSoundChange(val: boolean) { // Added sound handler
    setSound(val);
    localStorage.setItem("sound", val ? "on" : "off");
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar />
      <main className="md:ml-44 sm:ml-56 pt-16 sm:pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] w-full">
        <section className="w-full max-w-2xl mt-4 sm:mt-8 p-2 xs:p-4 sm:p-0 bg-transparent flex flex-col gap-4 sm:gap-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center mb-2 mt-4 sm:mt-8">Settings <span className="text-xs xs:text-sm sm:text-base font-normal">— Typing Test Preferences</span></h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6 w-full overflow-x-visible">
            {/* Show Accuracy Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800 min-w-0 w-full">
              <span className="text-lg font-semibold flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4-4"/></svg>
                Show Accuracy
              </span>
              <button
                className={`relative w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none`}
                style={{ backgroundColor: showAccuracy ? 'var(--accent-color, #2563eb)' : '' }}
                onClick={() => handleAccuracyChange(!showAccuracy)}
                aria-pressed={showAccuracy}
                aria-label="Toggle accuracy"
              >
                <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${showAccuracy ? 'translate-x-6' : ''}`}></span>
              </button>
            </div>
            {/* Show Progress Bar Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800 min-w-0 w-full">
              <span className="text-lg font-semibold flex items-center gap-3">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="3"/><rect x="6" y="14" width="6" height="2" rx="1"/></svg>
                Show Progress Bar
              </span>
              <button
                className={`relative w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none`}
                style={{ backgroundColor: showProgressBar ? 'var(--accent-color, #2563eb)' : '' }}
                onClick={() => handleProgressBarChange(!showProgressBar)}
                aria-pressed={showProgressBar}
                aria-label="Toggle progress bar"
              >
                <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${showProgressBar ? 'translate-x-6' : ''}`}></span>
              </button>
            </div>
            {/* Timer Duration Select */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800 min-w-0 w-full">
              <span className="text-lg font-semibold flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Timer Duration
              </span>
              <select
                className="ml-2 p-1 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs"
                value={timerDuration}
                onChange={e => handleTimerChange(Number(e.target.value))}
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={120}>120 seconds</option>
              </select>
            </div>
            {/* Show Live WPM/CPM Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800 min-w-0 w-full">
              <span className="text-lg font-semibold flex items-center gap-3">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
                Show Live WPM/CPM
              </span>
              <button
                className={`relative w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none`}
                style={{ backgroundColor: showLiveStats ? 'var(--accent-color, #2563eb)' : '' }}
                onClick={() => handleLiveStatsChange(!showLiveStats)}
                aria-pressed={showLiveStats}
                aria-label="Toggle live stats"
              >
                <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${showLiveStats ? 'translate-x-6' : ''}`}></span>
              </button>
            </div>
            {/* Sound Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800 min-w-0 w-full">
              <span className="text-lg font-semibold flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Key Sound
              </span>
              <button
                className={`relative w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none`}
                style={{ backgroundColor: sound ? 'var(--accent-color, #2563eb)' : '' }}
                onClick={() => handleSoundChange(!sound)}
                aria-pressed={sound}
                aria126-label="Toggle key sound"
              >
                <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${sound ? 'translate-x-6' : ''}`}></span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <span className="text-xs text-zinc-500">Settings are saved in your browser and apply instantly.</span>
          </div>
        </section>
      </main>
    </div>
  );
}