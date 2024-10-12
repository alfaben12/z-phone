import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  base: "./",
  build: {
    outDir: "../html",
    emptyOutDir: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
