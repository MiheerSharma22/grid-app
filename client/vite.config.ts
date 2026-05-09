import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const frontendUrl = env.VITE_FRONTEND_URL || "http://localhost:5174";
  const frontendPort = Number(new URL(frontendUrl).port) || 5174;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: frontendPort,
    },
  };
});
