import { NAV } from "@/data/briefing";
import { cn } from "@/lib/utils";

export function SiteNav({ active }: { active: string }) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#open" className="shrink-0 font-display text-sm tracking-wide text-ink">
          Astra 更新
        </a>
        <nav className="hidden items-center gap-1 overflow-x-auto md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                "rounded-full px-3 py-2 text-sm transition-colors",
                active === n.id ? "bg-teal-soft text-teal-ink" : "text-muted hover:text-ink",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="hidden text-xs text-subtle lg:block">相對 8/25</p>
      </div>
      <div className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs",
              active === n.id ? "bg-teal-soft text-teal-ink" : "text-muted",
            )}
          >
            {n.label}
          </a>
        ))}
      </div>
    </header>
  );
}
