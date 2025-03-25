import test from "@lib/BaseTest";
import {loginData} from "../../data/login";
const {faker} = require("@faker-js/faker");

// We can use Steps like in Cucmber format as shown below

/**
 * Verifies that a logged-in user can edit a collection in the application.
 *
 * This test case performs the following steps:
 * 1. Navigates to the application's login page.
 * 2. Logs in using the provided user credentials.
 * 3. Expands the "My Channel" menu and clicks on the "Collections" tab.
 * 4. Opens the collection page and edits a collection with a random description.
 *
 * @param {Object} loginPage - The login page object.
 * @param {Object} myChannelPage - The "My Channel" page object.
 * @param {Object} collectionPage - The collection page object.
 * @returns {Promise<void>}
 */
test(
  `Verify Login Users Can Edit A Collection`,
  {tag: "@Smoke"},
  async ({loginPage, myChannelPage, collectionPage}) => {
    await test.step(`Navigate to Application`, async () => {
      await loginPage.navigateToURL();
    });

    await loginPage.login({
      username: loginData.userTw1.email,
      password: loginData.userTw1.password,
    });

    await myChannelPage.expandMeMenu({menu: "My Channel", url: "**/channel/**"});
    await myChannelPage.clickOnATab({tabName: "Collections"});
    await myChannelPage.openCollectionPage({urlPart: "channel"});
    await collectionPage.editACollection({collectionDescription: faker.lorem.sentence()});

    console.log("Test Completed");
  },
);
