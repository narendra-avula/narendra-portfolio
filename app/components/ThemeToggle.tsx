"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getIsDark = () => document.documentElement.classList.contains("dark");

export default function ThemeToggle() {
  // null on the server so the first client render matches the HTML
  const isDark = useSyncExternalStore<boolean | null>(subscribe, getIsDark, () => null);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark !== null && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            {isDark ? (
              <LuMoon className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <LuSun className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
