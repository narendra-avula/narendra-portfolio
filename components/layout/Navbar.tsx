"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LuDownload, LuMenu, LuX } from "react-icons/lu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { navItems } from "@/lib/site";
import { profile } from "@/content/profile";

const items = navItems.filter((i) => i.enabled);
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** "/#about" -> "about"; route links return null */
const hashOf = (href: string) => (href.startsWith("/#") ? href.slice(2) : null);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const onHome = pathname === "/";

  // Highlight the section currently in view (homepage only)
  useEffect(() => {
    if (!onHome) return;
    // Observe every section so sections outside the nav (e.g. Skills) clear the highlight
    const els = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = ({ href, section }: (typeof items)[number]) => {
    const hash = hashOf(href) ?? section;
    if (onHome) return active === hash;
    return !hashOf(href) && pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          href="/#top"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2.5 rounded-md font-semibold text-fg ${focusRing}`}
          aria-label={`${profile.name}, home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-fg font-mono text-xs font-bold text-bg">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm lg:flex">
          {items.map((item) => {
            const current = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`relative isolate rounded-md px-3 py-2 transition-colors ${focusRing} ${
                    current ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {current && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-surface-2"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume.href}
            download={profile.resume.filename}
            className={`hidden min-h-10 items-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex ${focusRing}`}
          >
            <LuDownload className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:bg-surface-2 lg:hidden ${focusRing}`}
          >
            {open ? <LuX className="h-5 w-5" aria-hidden="true" /> : <LuMenu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-6">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={`flex min-h-12 items-center border-b border-line text-sm font-medium text-muted transition-colors hover:text-fg aria-[current=page]:text-fg ${focusRing}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a
                  href={profile.resume.href}
                  download={profile.resume.filename}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg bg-fg text-sm font-medium text-bg ${focusRing}`}
                >
                  <LuDownload className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
