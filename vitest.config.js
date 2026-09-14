import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.jsx"],
    pool: "forks",
    maxWorkers: 1,
  },
});
