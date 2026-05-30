import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist",
  },
  preview: {
    allowedHosts: ["bolishtestbot-production.up.railway.app"],
    port: process.env.PORT || 4173,
    host: "0.0.0.0",
  },
});
