import { cn } from "@/lib/utils";

export function PullQuote({
  children,
  by,
  role,
  className,
}: {
  children: React.ReactNode;
  by: string;
  role?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn("rounded-sm bg-sand-soft px-6 py-8 sm:px-10 sm:py-10", className)}
    >
      <blockquote className="font-display text-2xl leading-snug text-ink sm:text-[1.85rem] sm:leading-snug">
        {children}
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-sand/25 pt-4">
        <cite className="not-italic text-ink">{by}</cite>
        {role ? <span className="text-sm text-sand">{role}</span> : null}
      </figcaption>
    </figure>
  );
}
