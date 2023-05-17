import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    reporters: "verbose",
    environment: "jsdom",
    testTimeout: 0,
    setupFiles: ["src/setupTests.js"],
    deps: {
      inline: [/@mui/, /@eulerxyz/]
    },
  },
})
