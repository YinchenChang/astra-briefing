import { Badge } from "@/components/ui/badge";
import { evidenceLabel, type Evidence } from "@/data/briefing";
import { cn } from "@/lib/utils";

const styles: Record<Evidence, string> = {
  official: "bg-teal-soft text-teal-ink",
  estimate: "bg-sand-soft text-sand",
  unconfirmed: "bg-stone-soft text-stone",
};

export function EvidenceTag({ level }: { level: Evidence }) {
  return <Badge className={cn(styles[level])}>{evidenceLabel[level]}</Badge>;
}
