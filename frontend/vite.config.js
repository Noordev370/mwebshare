// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        download: resolve(__dirname, "src/download/index.html"),
        upload: resolve(__dirname, "src/upload/index.html")
      },
    },
  },
});
