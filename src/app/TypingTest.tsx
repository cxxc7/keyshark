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

import Sidebar from "./Sidebar";

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
      setTimerDuration(Number(localStorage.getItem("timerDuration") ?? 60));
      setShowLiveStats(localStorage.getItem("showLiveStats") !== "off");
      setShowAccuracy(localStorage.getItem("showAccuracy") !== "off");
      setShowProgressBar(localStorage.getItem("showProgressBar") !== "off");
    }
    loadParagraph(Number(localStorage.getItem("timerDuration") ?? 60));
    // Focus input on keydown
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener("keydown", focusInput);
    return () => window.removeEventListener("keydown", focusInput);
    // eslint-disable-next-line
  }, []);

  // Helper: Update personal bests
  function updatePersonalBests(wpm: number, cpm: number, accuracy: number, sessionMin: number) {
    const prevBestWpm = Number(localStorage.getItem("bestWpm") ?? 0);
    const prevBestAccuracy = Number(localStorage.getItem("bestAccuracy") ?? 0);
    const prevLongest = Number(localStorage.getItem("longestSession") ?? 0);
    if (wpm > prevBestWpm) localStorage.setItem("bestWpm", String(wpm));
    if (cpm > prevBestWpm * 5) localStorage.setItem("bestCpm", String(cpm));
    if (accuracy > prevBestAccuracy) localStorage.setItem("bestAccuracy", String(accuracy));
    if (sessionMin > prevLongest) localStorage.setItem("longestSession", String(sessionMin));
  }
  
  function getPracticeWeeks() {
    try {
      return JSON.parse(localStorage.getItem('practiceWeeks') ?? '{}') as Record<string, number>;
    } catch {
      return {};
    }
  }
  
  function setPracticeWeeks(weekObj: Record<string, number>) {
    localStorage.setItem('practiceWeeks', JSON.stringify(weekObj));
  }
  
  function updatePracticeCount(timerDuration: number, timeLeft: number) {
    const now = new Date();
    const week = now.getFullYear() + '-' + getISOWeek(now);
    const weekObj = getPracticeWeeks();
    weekObj[week] = (weekObj[week] || 0) + 1;
    setPracticeWeeks(weekObj);
    localStorage.setItem('practiceCount', String(weekObj[week]));
    return { week, weekObj };
  }
  
  function getBadges(): string[] {
    try {
      return JSON.parse(localStorage.getItem('badges') ?? '[]');
    } catch {
      return [];
    }
  }
  
  function setBadges(badges: string[]) {
    localStorage.setItem('badges', JSON.stringify(badges));
  }
  
  function updateBadges(wpm: number, accuracy: number, sessionMin: number, week: string, weekObj: Record<string, number>) {
    const badges = getBadges();
    const addBadge = (label: string) => {
      if (!badges.includes(label)) badges.push(label);
    };
    if (wpm >= 50) addBadge('First 50 WPM');
    if (wpm >= 80) addBadge('80+ WPM!');
    if (accuracy === 100) addBadge('No Mistakes');
    if (sessionMin >= 10) addBadge('10+ Min Session');
    if (weekObj[week] >= 7) addBadge('7 Days Streak');
    setBadges(badges);
  }

  useEffect(() => {
    if (charIndex === text.length && timer) {
      clearInterval(timer);
      setIsTyping(false);
      const accuracy = input.length > 0 ? Math.max(0, Math.round((input.split('').filter((c, i) => c === text[i]).length / input.length) * 100)) : 100;
      const sessionMin = Math.round((timerDuration - timeLeft) / 60);
      updatePersonalBests(wpm, cpm, accuracy, sessionMin);
      const { week, weekObj } = updatePracticeCount(timerDuration, timeLeft);
      updateBadges(wpm, accuracy, sessionMin, week, weekObj);
    }
    // eslint-disable-next-line
  }, [charIndex, text, timer]);

  function loadParagraph(duration?: number) {
    const random = Math.floor(Math.random() * PARAGRAPHS.length);
    setText(PARAGRAPHS[random]);
    setInput("");
    setCharIndex(0);
    setMistakes(0);
    const dur = duration ?? timerDuration;
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
    if (val.endsWith(currentChar)) {
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
      <Sidebar />
      <main className="md:ml-20 sm:ml-56 pt-16 sm:pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] w-full">
        <section className="w-full max-w-xs sm:max-w-xl mt-4 sm:mt-0 p-2 xs:p-3 sm:p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col gap-3 xs:gap-4 sm:gap-6 border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-base xs:text-lg sm:text-2xl font-bold text-center mb-2">
            <span
              className="text-base xs:text-lg sm:text-xl font-bold justify-center"
              style={{ color: 'var(--accent-color, #2563eb)' }}
            >
              KeyShark
            </span>
            <span className="block text-xs xs:text-sm sm:text-base font-normal">Inspired by Monkeytype</span>
          </h1>
          <div className="typing-text text-sm xs:text-base sm:text-lg font-mono bg-zinc-100 dark:bg-zinc-800 rounded p-1 xs:p-2 sm:p-4 min-h-[40px] xs:min-h-[48px] sm:min-h-[64px] select-none break-words">
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
                <span key={`${char}-${i}`} className={className}>{char}</span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            className="input-feild w-full p-2 xs:p-2.5 sm:p-3 border rounded focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white text-xs xs:text-sm sm:text-base"
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
          <div className="flex flex-col xs:flex-row sm:flex-row justify-between text-xs xs:text-xs sm:text-sm mt-2 gap-1 xs:gap-2 sm:gap-0">
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
            <div className="flex flex-col xs:flex-row sm:flex-row justify-end text-xs text-zinc-500 dark:text-zinc-400 gap-1 xs:gap-2 sm:gap-4 mt-1">
              <span><b>WPM</b>: Words Per Minute (correct words typed per minute, 1 word = 5 chars)</span>
              <span><b>CPM</b>: Characters Per Minute (correct characters typed per minute)</span>
            </div>
          )}
          {isTyping && timeLeft > 0 ? (
            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              <button
                className="px-2 xs:px-3 sm:px-4 py-2 text-white rounded transition col-span-1 text-xs xs:text-sm sm:text-base"
                style={{
                  backgroundColor: 'var(--accent-color, #2563eb)',
                  border: '2px solid var(--accent-color, #2563eb)',
                }}
                disabled
              >
                Test Running...
              </button>
              <button
                className="px-2 xs:px-3 sm:px-4 py-2 text-white rounded transition border-2 col-span-1 text-xs xs:text-sm sm:text-base"
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
              className="mt-4 px-2 xs:px-3 sm:px-4 py-2 text-white rounded transition text-xs xs:text-sm sm:text-base"
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
