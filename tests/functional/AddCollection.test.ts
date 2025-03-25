import test from "@lib/BaseTest";
import {loginData} from "../../data/login";
import {loginPage} from "../../pageFactory/pageRepository/LoginPage";
import {expect} from "allure-playwright";

test(`Verify User Can Add A Collection`, {tag: "@Smoke"}, async ({myChannelPage, shortPage}) => {
  await test.step(`Navigate to Application and login`, async () => {
    await loginPage.navigateToURL();
    await loginPage.login({
      username: loginData.userTw1.email,
      password: loginData.userTw1.password,
      verificationPoint: loginPage.AVARTAR_IMG,
    });
  });

  await test.step(`Click Home tab in My Channel then save first short`, async () => {
    await myChannelPage.expandMeMenu({menu: "My Channel", url: "**/channel/**"});
    await myChannelPage.clickOnATab({tabName: "Home"});
    await shortPage.clickOnFirstShort();
    await shortPage.clickOnSaveButton();
  });

  await test.step(`Verify pop up show default collection`, async () => {
    const result = await shortPage.verifySaveToPopUpIsShown();
    expect(result).toBeTruthy();
    const isDefault = await shortPage.verifyUserCanNotChangeDefaultVisibility();
    expect(isDefault).toBeTruthy();
  });

  await test.step(`Verify user can click on add new collection button`, async () => {
    await shortPage.verifyUserCanClickNewCollectionButton();
  });

  await test.step(`Verify default visibility and options`, async () => {
    await shortPage.verifyDefaultVisibility();
    await shortPage.verifyVisibilityOptions();
  });

  await test.step(`Click on textfield and verify dropdown is shown`, async () => {
    await shortPage.clickOnTextField();
    await shortPage.verifyDropdownIsShown();
    //click again to close dropdown options
    await shortPage.clickOnTextField();
  });

  await test.step(`Verify button only active when name and visibility are provided`, async () => {
    expect(await shortPage.verifyButtonIsDisable()).toBeTruthy();
    await shortPage.fillCollectionName(loginData.collectionName);
    expect(await shortPage.verifyButtonIsDisable()).toBeFalsy();
  });

  await test.step(`Click create button and verify new collection is created and save to popup reappear `, async () => {
    await shortPage.clickCreateButton();
    expect(await shortPage.verifyNewCollectionIsCreated(loginData.collectionName)).toBeTruthy();
    expect(await shortPage.verifySaveToPopUpIsShown()).toBeTruthy();
  });

  await test.step(`Close popup Click Collection tab in My Channel and verify new collection is added`, async () => {
    await shortPage.closePopUp();
    await myChannelPage.expandMeMenu({menu: "My Channel", url: "**/channel/**"});
    await myChannelPage.clickOnATab({tabName: "Collections"});
    expect(
      await myChannelPage.verifyNewCollectionIsAddAtCollectionsTab(loginData.collectionName),
    ).toBeTruthy();
  });
});
