// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // your public API
  format: ["esm"], // only ES modules
  dts: true, // emit .d.ts files
  splitting: true, // no code‑splitting for libs
  sourcemap: process.env.NODE_ENV === "development",
  clean: true,
  treeshake: "recommended",
  external: ["react", "react-dom"],
  bundle: true,
});
