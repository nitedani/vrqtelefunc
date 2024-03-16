import react from "@vitejs/plugin-react";
import vikeNode from "vike-node/plugin";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { telefunc } from "telefunc/vite";

export default defineConfig({
  plugins: [
    react(),
    vike(),
    vikeNode({
      server: "./src/server.ts",
      standalone: true,
    }),
    telefunc(),
  ],
});
