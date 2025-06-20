// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

import { config } from "./config/testConfig.js";


const ENV = process.env.ENV || 'FI_QA';
// const ENV = process.env.ENV || 'FI_DEV';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
if (!ENV || ![`FI_PROD`, `FI_QA`, `OPS_PROD`, `OPS_QA`, `FI_DEV`].includes(ENV)) {
  console.log(`Please provide a correct environment value from testConfig`);
  process.exit();
}
console.log(ENV + '-------------------------');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // globalSetup: require.resolve('./config/global-setup.js'),
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 0,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video:'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure', //trace will only show when test is failed
    storageState: './LoginAuth.json', 
    // Set geolocation coordinates
    geolocation: { latitude: 23.8103, longitude: 90.4125 }, // Example: Dhaka

    // Grant only geolocation permission
    permissions: ['geolocation'],

    // Required for Chromium-based browsers
    launchOptions: {
      args: [
        '--enable-geolocation', // explicitly enable geolocation
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], baseURL: config[ENV] },
    },
    
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

