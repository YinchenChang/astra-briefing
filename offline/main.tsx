import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import { BriefingPage } from "../src/components/briefing/BriefingPage";

const root = document.getElementById("root");
if (!root) throw new Error("root missing");

createRoot(root).render(
  <StrictMode>
    <BriefingPage />
  </StrictMode>,
);
