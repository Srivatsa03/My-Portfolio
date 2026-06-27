import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served as a project page at srivatsa03.github.io/My-Portfolio/.
  // If a custom domain (root) is activated later, change this back to "/".
  base: "/My-Portfolio/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
