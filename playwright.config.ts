import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
  ],
});
