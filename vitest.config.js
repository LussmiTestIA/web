import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.jsx"],
    pool: "threads",
    maxWorkers: 1,
  },
});
