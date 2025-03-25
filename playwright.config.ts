import { PlaywrightTestConfig, devices } from "@playwright/test";
import { testConfig } from "./testConfig";
import { OrtoniReportConfig } from "ortoni-report";

const ENV = process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(
    `Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`,
  );
  process.exit();
}

const reportConfig: OrtoniReportConfig = {
  base64Image: true,
  title: "Playwright Framework with Typescript",
  showProject: true,
  filename: "OrtoniHtmlReport",
  authorName: "Moon Nguyen",
  preferredTheme: "dark",
  folderPath: "html-report",
  projectName: "Playwright Framework with Typescript",
};

const config: PlaywrightTestConfig = {
  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [
    [`./CustomReporterConfig.ts`],
    [`allure-playwright`],
    [`html`, { outputFolder: "html-report", open: "never" }],
    ["ortoni-report", reportConfig],
    ['line']
  ],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,

        //Chrome Browser Config
        channel: `chrome`,

        //Picks Base Url based on User input
        baseURL: testConfig[ENV],

        //Browser Mode
        headless: false,

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        // viewport: { width: 500, height: 730 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[ENV],
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: `Device`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,

        channel: `chrome`,
        baseURL: testConfig[ENV],
        // headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: `DB`,
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[ENV],
      },
    },
  ],
};
export default config;
