import test from "@lib/BaseTest";

test(`Generate and verify HAR file for Login Page.`, async ({page, loginPage, webActions}) => {
  // To record HAR file use below line where "update:true"
  // This line creates a directory named har and stores all the har related files in it.
  await page.routeFromHAR("har/loginPage.har", {update: true});

  // Once you record the har file you can uncomment the below line for Network Replay with update:false
  //The below line uses the har file from the recoded directory.
  // await page.routeFromHAR('har/loginPage.har',{update:false});
});
