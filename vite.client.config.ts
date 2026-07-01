import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Client-only Vite config for production builds (Vercel/Netlify).
// Keeps server/prisma code out of the config bundle.
export default defineConfig({
  build: {
    outDir: "dist/spa",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
