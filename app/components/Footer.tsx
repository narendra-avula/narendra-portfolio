export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Narendra Avula</p>

        <p>Software Engineering · Cloud · AI/GenAI</p>

        <a
          href="#top"
          className="transition hover:text-zinc-700 focus-visible:text-zinc-700 focus-visible:underline dark:hover:text-zinc-200 dark:focus-visible:text-zinc-200"
          aria-label="Back to top"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
