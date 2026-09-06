import { cn } from "@/lib/utils";

export function Verdict({
  kicker = "本週結論",
  stamp,
  children,
  className,
}: {
  kicker?: string;
  stamp?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn("rounded-sm bg-teal-soft px-5 py-5 sm:px-6", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs tracking-[0.16em] text-teal-ink">{kicker}</p>
        {stamp ? (
          <span className="rounded-full bg-teal px-2.5 py-0.5 text-xs text-paper">{stamp}</span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-xl leading-snug text-ink sm:text-[1.65rem] sm:leading-snug">
        {children}
      </p>
    </aside>
  );
}
