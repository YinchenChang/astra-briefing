import { createFileRoute } from "@tanstack/react-router";
import { BriefingPage } from "@/components/briefing/BriefingPage";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BriefingPage />;
}
