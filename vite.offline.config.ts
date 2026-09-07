import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: rootDir,
  base: "./",
  publicDir: false,
  envPrefix: ["VITE_"],
  define: {
    "import.meta.env.VITE_OFFLINE": JSON.stringify("1"),
  },
  resolve: {
    alias: { "@": path.join(rootDir, "src") },
  },
  plugins: [tailwindcss(), viteReact()],
  build: {
    outDir: path.join(rootDir, "dist-offline"),
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: false,
    assetsInlineLimit: 20_000_000,
    modulePreload: false,
    rollupOptions: {
      input: path.join(rootDir, "offline/index.html"),
      output: {
        codeSplitting: false,
      },
    },
  },
});
