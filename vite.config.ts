import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@http": path.resolve(__dirname, "./src/http"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@enums": path.resolve(__dirname, "./src/enums"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@widgets": path.resolve(__dirname, "./src/widgets")
    },
  },
});
