import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom", // Set jsdom as the test environment
  },
  plugins: [react()],
  sourcemap: true, // Add this
  productionBrowserSourceMaps: true,
});
