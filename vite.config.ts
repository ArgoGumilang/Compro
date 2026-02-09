import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default Vite dev port
    allowedHosts: ["milissa-anuric-unpalpablely.ngrok-free.dev"],
    proxy: {
      '/api': {
        target: 'https://vandikategar.online',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});
