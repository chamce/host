import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // * you might get terminal warning after build: "Use build.rollupOptions.output.manualChunks to improve chunking"
    // ? experimental configuration to improve chunking found below in rollupOptions.output.manualChunks
    // ! "Be aware that manual chunks can change the behavior of the application...
    // ! ...if side effects are triggered before the corresponding modules are actually used."
    // * quoted from https://rollupjs.org/configuration-options/#output-manualchunks
    // ! comment out rollupOptions.output.manualChunks configuration if build version behaves differently from dev version...
    // ! ...or if some functionality is lost
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
    emptyOutDir: true,
    // * change outDir to "Y:/reports/..." when deploying to Chad's server
    outDir: "docs",
  },
  plugins: [react(), eslint()],
  base: "",
});
