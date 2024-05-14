import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babelImport from "vite-plugin-imp";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babelImport({
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],

  resolve: {
    // 这部分
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
});
