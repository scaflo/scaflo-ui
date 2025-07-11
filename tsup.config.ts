// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // your public API
  format: ["esm"], // only ES modules
  dts: true, // emit .d.ts files
  splitting: true, // no code‑splitting for libs
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  bundle: true,
});
