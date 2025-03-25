import test from "@lib/BaseTest";
// import {loginData} from "../../data/login";

// We can use Steps like in Cucmber format as shown below

test(`Verify Login Page`, {tag: "@Smoke"}, async ({loginPage}) => {
  await test.step(`Navigate to Application`, async () => {
    await loginPage.navigateToURL();
  });

  // await loginPage.login({
  //   username: loginData.userTw1.email,
  //   password: loginData.userTw1.password,
  //   verificationPoint: loginPage.AVARTAR_IMG,
  // });
});
