"use client";
import { useEffect, useRef, useState } from "react";

// Typing paragraphs (short and medium) - India themed
const PARAGRAPHS = [
  // Short
  "India is the world’s largest democracy.",
  "The Taj Mahal is a symbol of love and beauty.",
  "Cricket is the most popular sport in India.",
  "India celebrates many colourful festivals each year.",
  "Hindi and English are widely spoken languages.",
  // Medium
  "India is a land of great diversity, with over a billion people, hundreds of languages, and a rich tapestry of cultures and traditions. From the snowy peaks of the Himalayas to the tropical beaches of Kerala, the country offers a wide range of landscapes and experiences.",
  "The Indian cuisine is famous for its spices and flavours. Dishes like biryani, dosa, butter chicken, and samosas are enjoyed not only in India but around the world. Each region has its own unique culinary traditions.",
  "Bollywood, the Hindi film industry based in Mumbai, produces more movies than any other country. Indian films are known for their vibrant music, dance, and dramatic storytelling.",
  "India’s history stretches back thousands of years, with ancient civilizations like the Indus Valley and great empires such as the Maurya and Mughal dynasties. The country gained independence from British rule in 1947.",
  "Yoga and meditation, which originated in India, are now practiced by millions of people globally for health and well-being.",
  "Indian festivals like Diwali, Holi, and Eid are celebrated with joy and enthusiasm, bringing families and communities together in vibrant displays of light, colour, and tradition."
];

import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";



// Theme management removed

// TopBar component must be defined outside of useThemeSync



function TopBar() {
  const [showPalette, setShowPalette] = useState(false);

  // Features for the marquee
  const features = [
    "Minimalist typing test UI",
    "Real-time WPM, CPM, and accuracy stats",
    "Accessible and responsive design",
    "Achievements and badges for progress",
    "Customisable accent colours",
    "Profile and settings management",
    "Practice streaks and personal bests",
    "Open source on GitHub!",
  ];

  const GITHUB_REPO_URL = "https://github.com/cxxc7/keyshark";

  // Color palette logic
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
    if (typeof window !== "undefined") {
      const accent = localStorage.getItem("accent") || "blue";
      document.documentElement.setAttribute("data-accent", accent);
      const colorObj = COLORS.find(c => c.value === accent);
      document.documentElement.style.setProperty('--accent-color', colorObj?.hex || '#3b82f6');
    }
  }, []);

  const router = useRouter();
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const profilePic = typeof window !== "undefined" ? localStorage.getItem("profilePic") : null;

  function handleAccountClick() {
    if (user) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }

  return (
    <header className="w-full h-12 sm:h-14 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm fixed top-0 left-0 z-30 backdrop-blur">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="font-bold text-lg tracking-tight text-blue-700 dark:text-blue-300 select-none">KeyShark</span>
        <span className="ml-2 text-xs text-zinc-400 font-mono hidden sm:inline">Typing Test</span>
        {/* Marquee right of KeyShark, now stretches to fill available space */}
        <div className="flex-1 flex items-center min-w-0 mx-4 overflow-hidden">
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
      </div>
      <div className="flex items-center gap-2">
        {/* Accent color picker */}
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
        {/* GitHub icon */}
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
        {/* Account button with profile pic */}
        <button className="p-2 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition ml-2" aria-label="Account" onClick={handleAccountClick}>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile pic"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-300 dark:border-zinc-700 shadow"
            />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
          )}
          <span className="hidden sm:inline">{user ? user.split("@")[0] : "Login"}</span>
        </button>
      </div>
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

// Helper: get ISO week number
function getISOWeek(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Main TypingTest component

export default function TypingTest() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // Settings state
  const [sound, setSound] = useState(true);
  const [showHints, setShowHints] = useState(true);
  const [timerDuration, setTimerDuration] = useState(60);
  const [showLiveStats, setShowLiveStats] = useState(true);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    if (typeof window !== "undefined") {
      setSound(localStorage.getItem("sound") !== "off");
      setShowHints(localStorage.getItem("showHints") !== "off");
      setTimerDuration(Number(localStorage.getItem("timerDuration")) || 60);
      setShowLiveStats(localStorage.getItem("showLiveStats") !== "off");
      setShowAccuracy(localStorage.getItem("showAccuracy") !== "off");
      setShowProgressBar(localStorage.getItem("showProgressBar") !== "off");
    }
    loadParagraph(Number(localStorage.getItem("timerDuration")) || 60);
    // Focus input on keydown
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener("keydown", focusInput);
    return () => window.removeEventListener("keydown", focusInput);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (charIndex === text.length && timer) {
      clearInterval(timer);
      setIsTyping(false);
      // --- Personal Bests ---
      const prevBestWpm = Number(localStorage.getItem("bestWpm") || 0);
      const prevBestAccuracy = Number(localStorage.getItem("bestAccuracy") || 0);
      const prevLongest = Number(localStorage.getItem("longestSession") || 0);
      if (wpm > prevBestWpm) localStorage.setItem("bestWpm", String(wpm));
      if (cpm > prevBestWpm * 5) localStorage.setItem("bestCpm", String(cpm));
      const accuracy = input.length > 0 ? Math.max(0, Math.round((input.split('').filter((c, i) => c === text[i]).length / input.length) * 100)) : 100;
      if (accuracy > prevBestAccuracy) localStorage.setItem("bestAccuracy", String(accuracy));
      const sessionMin = Math.round((timerDuration - timeLeft) / 60);
      if (sessionMin > prevLongest) localStorage.setItem("longestSession", String(sessionMin));
      // --- Practice Count (for goals) ---
      const now = new Date();
      const week = now.getFullYear() + '-' + getISOWeek(now);
      let weekObj: Record<string, number> = {};
      try { weekObj = JSON.parse(localStorage.getItem('practiceWeeks') || '{}'); } catch {}
      weekObj[week] = (weekObj[week] || 0) + 1;
      localStorage.setItem('practiceWeeks', JSON.stringify(weekObj));
      localStorage.setItem('practiceCount', String(weekObj[week]));
      // --- Badges ---
      let badges: string[] = [];
      try { badges = JSON.parse(localStorage.getItem('badges') || '[]'); } catch {}
      // Add badge if not present
      function addBadge(label: string) { if (!badges.includes(label)) badges.push(label); }
      if (wpm >= 50) addBadge('First 50 WPM');
      if (wpm >= 80) addBadge('80+ WPM!');
      if (accuracy === 100) addBadge('No Mistakes');
      if (sessionMin >= 10) addBadge('10+ Min Session');
      if (weekObj[week] >= 7) addBadge('7 Days Streak');
      localStorage.setItem('badges', JSON.stringify(badges));
    }
    // eslint-disable-next-line
  }, [charIndex, text, timer]);

  function loadParagraph(duration?: number) {
    const random = Math.floor(Math.random() * PARAGRAPHS.length);
    setText(PARAGRAPHS[random]);
    setInput("");
    setCharIndex(0);
    setMistakes(0);
    const dur = duration || timerDuration;
    setTimeLeft(dur);
    setWpm(0);
    setCpm(0);
    setIsTyping(false);
    if (timer) clearInterval(timer);
  }

  function startTimer() {
    if (!isTyping) {
      setIsTyping(true);
      const t = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(t);
            setIsTyping(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(t);
    }
  }

  // Play key sound if enabled (mechanical keyboard style)
  function playKeySound() {
    if (!sound) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      // Mechanical keyboard: short, clicky, with a little randomness
      o.type = "square";
      // Randomize frequency for realism (1200-1700Hz)
      o.frequency.value = 1200 + Math.random() * 500;
      g.gain.value = 0.13 + Math.random() * 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + (0.025 + Math.random() * 0.015));
      o.onended = () => ctx.close();
    } catch {}
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!isTyping) startTimer();
    if (val.length < input.length) {
      // Backspace
      setCharIndex(val.length);
      setInput(val);
      return;
    }
    const currentChar = text[charIndex];
    if (val[val.length - 1] === currentChar) {
      setCharIndex(charIndex + 1);
      playKeySound();
    } else {
      setMistakes(mistakes + 1);
      setCharIndex(charIndex + 1);
    }
    setInput(val);
    // CPM & WPM
    const correct = val.split("").filter((c, i) => c === text[i]).length;
    setCpm(correct);
    const elapsed = 60 - timeLeft;
    const wpmCalc = elapsed > 0 ? Math.round((correct / 5) / (elapsed / 60)) : 0;
    setWpm(wpmCalc > 0 && isFinite(wpmCalc) ? wpmCalc : 0);
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <TopBar />
      <Sidebar />
      <main className="md:ml-20 sm:ml-56 pt-16 sm:pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] w-full">
        <section className="w-full max-w-xs sm:max-w-xl mt-4 sm:mt-0 p-3 sm:p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col gap-4 sm:gap-6 border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-lg sm:text-2xl font-bold text-center mb-2">KeyShark <span className="text-xs sm:text-base font-normal">&mdash; Inspired by Monkeytype</span></h1>
          <div className="typing-text text-base sm:text-lg font-mono bg-zinc-100 dark:bg-zinc-800 rounded p-2 sm:p-4 min-h-[48px] sm:min-h-[64px] select-none break-words">
            {text.split("").map((char, i) => {
              let className = "";
              if (i === charIndex) {
                className = `border-b-2 text-[color:var(--accent-color)] border-[color:var(--accent-color)]`;
                if (showHints) className += " animate-pulse";
              } else if (input[i] === char) {
                className = "text-green-600 dark:text-green-400";
              } else if (input[i] && input[i] !== char) {
                className = "text-red-500 dark:text-red-400";
              }
              return (
                <span key={i} className={className}>{char}</span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            className="input-feild w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white text-sm sm:text-base"
            style={{
              borderColor: 'var(--accent-color)',
              boxShadow: '0 0 0 2px var(--accent-color, #2563eb)',
            }}
            type="text"
            value={input}
            onChange={handleInput}
            disabled={timeLeft === 0 || charIndex === text.length}
            placeholder="Start typing here..."
            autoFocus
            spellCheck={false}
            aria-label="Typing input"
          />
          <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm mt-2 gap-1 sm:gap-0">
            <div className="time">Time: <b>{timeLeft}</b>s</div>
            <div className="mistake">Mistakes: <span>{mistakes}</span></div>
            {showLiveStats && <><div className="wpm" title="Words Per Minute: Number of correctly typed words per minute (1 word = 5 characters)">WPM: <span>{wpm}</span></div>
            <div className="cpm" title="Characters Per Minute: Number of correctly typed characters per minute">CPM: <span>{cpm}</span></div></>}
            {showAccuracy && (
              <div className="accuracy" title="Accuracy: Percentage of correct keystrokes">
                Accuracy: <span>{input.length > 0 ? Math.max(0, Math.round((input.split('').filter((c, i) => c === text[i]).length / input.length) * 100)) : 100}%</span>
              </div>
            )}
          </div>
          {showProgressBar && (
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden mt-2">
              <div
                className="h-full bg-[color:var(--accent-color)] transition-all duration-300"
                style={{ width: `${Math.min(100, (charIndex / text.length) * 100)}%` }}
                aria-label="Progress bar"
              />
            </div>
          )}
          {showLiveStats && (
            <div className="flex flex-col sm:flex-row justify-end text-xs text-zinc-500 dark:text-zinc-400 gap-1 sm:gap-4 mt-1">
              <span><b>WPM</b>: Words Per Minute (correct words typed per minute, 1 word = 5 chars)</span>
              <span><b>CPM</b>: Characters Per Minute (correct characters typed per minute)</span>
            </div>
          )}
          {isTyping && timeLeft > 0 ? (
            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              <button
                className="px-2 sm:px-4 py-2 text-white rounded transition col-span-1 text-xs sm:text-base"
                style={{
                  backgroundColor: 'var(--accent-color, #2563eb)',
                  border: '2px solid var(--accent-color, #2563eb)',
                }}
                disabled
              >
                Test Running...
              </button>
              <button
                className="px-2 sm:px-4 py-2 text-white rounded transition border-2 col-span-1 text-xs sm:text-base"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--accent-color, #2563eb)',
                  color: 'var(--accent-color, #2563eb)',
                }}
                onClick={() => loadParagraph(timerDuration)}
              >
                Restart
              </button>
            </div>
          ) : (
            <button
              className="mt-4 px-2 sm:px-4 py-2 text-white rounded transition text-xs sm:text-base"
              style={{
                backgroundColor: 'var(--accent-color, #2563eb)',
                border: '2px solid var(--accent-color, #2563eb)',
              }}
              onClick={() => loadParagraph(timerDuration)}
            >
              Change Sentence
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
