import test from "@lib/BaseTest";
import {expect} from "@playwright/test";

test.describe.configure({mode: "parallel"});
test(`Verify Elements Page.`, async ({page, loginPage}) => {
  await loginPage.navigateToURL();
  expect(await page.screenshot()).toMatchSnapshot("MainPage.png");
});

test(`Verify Elements Page 2.`, async ({page, loginPage}) => {
  await loginPage.navigateToURL();
  // expect(await page.screenshot()).toMatchSnapshot('MainPage.png');
});
