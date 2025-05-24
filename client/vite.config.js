import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src", // This assumes you want to map '@' to the 'src' directory.
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove /api prefix
      },
    },
  },
});
