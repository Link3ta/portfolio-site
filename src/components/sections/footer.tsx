export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="font-serif lowercase text-lg text-[var(--text-primary)]"
            style={{ fontWeight: 500 }}
          >
            zavian.ai
          </span>
          <span className="text-[var(--text-muted)] text-sm">
            · Anders Ljungstedt
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
          © 2026 Anders Ljungstedt · zavian.ai
        </div>
      </div>
    </footer>
  );
}
