import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: [["line"], ["allure-playwright"]],
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      testDir: "./tests/ui",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },

    {
      name: "chromium-headless",
      testDir: "./tests/ui",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },

    {
      name: "firefox",
      testDir: "./tests/ui",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "apiTesting",
      testDir: "./tests/api",
      use: {
        baseURL: "https://automationexercise.com",
        trace: "on-first-retry",
      },
    },
  ],
});
