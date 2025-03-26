import test from "@lib/BaseTest";
import {loginData} from "../../data/login";
import {ContentType} from "@lib/HelperAction";
const {faker} = require("@faker-js/faker");
import {messages} from "../../data/Studio";
import {url} from "../../data/url";
import {title} from "process";
import {heading} from "../../data/Studio";

// We can use Steps like in Cucmber format as shown below
// test.beforeEach(async ({ loginPage, studioPage }) => {
//   const { email, password } = loginData.newAcc; //
//   await loginPage.login({
//     username: email,
//     password: password,
//   });
//   await studioPage.navigateToStudio();
// });

test.afterEach(async ({studioPage}) => {
  console.log("Done with tests");
  await studioPage.deleteAllContent();
  await studioPage.verifyContentEmpty();
});

// conten video
const testData = [{contentType: ContentType.video}];

testData.forEach(({contentType}) => {
  test(
    `Verify Studio can upload ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.newAcc3);
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      await studioPage.selectUploadContent(contentType);

      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
    },
  );
});

testData.forEach(({contentType}) => {
  test(
    `Verify can update content ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.newAcc2);
      await studioPage.openSideBarMenu({
        menu: "content",
      });

      await studioPage.selectUploadContent(contentType);

      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.clickOnEditBtn();
      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(15),
        description: faker.lorem.sentence(30),
      });
      await studioPage.handleContentButton({contentType: "other" as ContentType});
      await studioPage.verifyNotification({
        locator: studioPage.notification,
        message: messages.VIDEO,
      });
      await studioPage.clickOnBackChannel();
    },
  );
});
// Article
test(`Verify Studio Can Create an Article`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
  await studioPage.loginAndNavigate({loginPage}, loginData.enNormalUser2);
  await studioPage.selectUploadContent(ContentType.article);
  await studioPage.fillArticleContent({
    title: faker.lorem.sentence(8),
    articleContent: faker.lorem.sentence(18),
    description: faker.lorem.sentence(),
    category: "Autos",
    contentLang: "English",
    uploadThumbnail: true,
  });
  await studioPage.clickOnback();
});

test(`Verify Studio Can update an Article`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
  await studioPage.loginAndNavigate({loginPage}, loginData.jwNormalAcc);
  await studioPage.selectUploadContent(ContentType.article);
  await studioPage.fillArticleContent({
    title: faker.lorem.sentence(8),
    description: faker.lorem.sentence(),
    articleContent: "This is a test article",
    category: "Autos",
    contentLang: "English",
    uploadThumbnail: true,
  });
  await studioPage.clickOnback();
  await studioPage.clickOnEditBtn();

  await studioPage.fillArticleContent({
    title: faker.lorem.sentence(18),
    description: faker.lorem.sentence(30),
    articleContent: "This is a test articleok",
    category: "Autos",
    contentLang: "English",
  });
  await studioPage.handleContentButton({contentType: ContentType.article});
  await studioPage.verifyNotification({
    locator: studioPage.notification,
    message: messages.ARTICLE,
  });
  await studioPage.clickOnback();
});
// short video

test(`Verify Studio can upload Short`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
  await studioPage.loginAndNavigate({loginPage}, loginData.newAcc2);

  await studioPage.selectUploadContent(ContentType.short);

  await studioPage.fillContentDetail({
    title: faker.lorem.sentence(18),
    description: faker.lorem.sentence(30),
    category: "Autos",
    contentLang: "English",
  });
  await studioPage.handleContentButton({contentType: ContentType.short});
});

test(`Verify can update content Short`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
  await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);

  await studioPage.selectUploadContent(ContentType.short);

  await studioPage.fillContentDetail({
    title: faker.lorem.sentence(8),
    description: faker.lorem.sentence(),
    category: "Autos",
    contentLang: "English",
  });
  await studioPage.handleContentButton({contentType: ContentType.short});
  await studioPage.clickOnEditBtn();
  await studioPage.fillContentDetail({
    title: faker.lorem.sentence(15),
    description: faker.lorem.sentence(30),
    category: "Arts",
    contentLang: "Tiếng Việt",
  });
  await studioPage.handleContentButton({contentType: "other" as ContentType});
  await studioPage.verifyNotification({
    locator: studioPage.notification,
    message: messages.SHORT,
  });
  // click on back button
  await studioPage.clickOnBackChannel();
});

//share
testData.forEach(({contentType}) => {
  test(`Verify Share icon and Functionality `, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
    test.setTimeout(510000);

    await studioPage.loginAndNavigate({loginPage}, loginData.gjwNormalAcc);
    await studioPage.openSideBarMenu({
      menu: "content",
    });
    await studioPage.selectUploadContent(contentType);
    await studioPage.fillContentDetail({
      title: faker.lorem.sentence(8),
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType});
    await studioPage.clickOnMoreOptions({
      index: 0,
    });
    await studioPage.handleThreeDotMenu({
      option: "Share",
    });
    await studioPage.verifyShare({
      content: "video",
    });
    await studioPage.clickShareIcon({
      items: ["Telegram", "Facebook", "Line", "Reddit", "Weibo", "Twitter"],
    });
    await studioPage.clickButtonCopy();
    await studioPage.verifyNotification({
      locator: studioPage.notification,
      message: messages.COPYLINK,
    });
    await studioPage.clickCloseIcon();
  });
});
// Verify can watch
testData.forEach(({contentType}) => {
  test(
    `Verify can watch in GJW app ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, videoPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.playNormalAcc);
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      await studioPage.selectUploadContent(contentType);
      const videoTitle = faker.lorem.sentence(8);

      await studioPage.fillContentDetail({
        title: videoTitle,
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType: ContentType.video});

      // Click to watch video and  verify video is playing
      const newPage = await studioPage.clickOnWatch();
      await videoPage.verifyVideoTitle(videoTitle, newPage);
      await newPage.close();
    },
  );
});

test(
  `Verify can watch in GJW app Short`,
  {tag: "@Smoke"},
  async ({studioPage, videoPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.normalAcc);

    await studioPage.selectUploadContent(ContentType.short);
    const shortTitle = faker.lorem.sentence(8);
    await studioPage.fillContentDetail({
      title: shortTitle,
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType: ContentType.short});
    await studioPage.page.waitForSelector(`text=${shortTitle}`, {state: "visible"});
    const newPage = await studioPage.clickOnWatch();
    await videoPage.verifyShortTitle(shortTitle, newPage);
    await newPage.close();
  },
);

test(
  `Verify can read in GJW app Article `,
  {tag: "@Smoke"},
  async ({studioPage, videoPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.enNormalUser1);

    await studioPage.selectUploadContent(ContentType.article);
    const articleTitle = faker.lorem.sentence(8);
    await studioPage.fillArticleContent({
      description: faker.lorem.sentence(30),
      title: articleTitle,
      articleContent: faker.lorem.sentence(18),
      category: "Autos",
      contentLang: "English",
      uploadThumbnail: true,
    });
    await studioPage.clickOnback();
    const newPage = await studioPage.clickOnPreview();
    await videoPage.verifyArticleTitle(articleTitle, newPage);
    await newPage.close();
  },
);
//Verify Pagination
// test(`Verify Pagination On Content Video `, { tag: "@Smoke" }, async ({ studioPage, loginPage }) => {
//   test.setTimeout(510000);
//   await studioPage.loginAndNavigate({ loginPage }, loginData.enNormalUser2);

//   for (let i = 0; i < 20; i++) {
//     await studioPage.selectUploadContent(ContentType.video);
//     await studioPage.fillContentDetail({
//       title: `Video ${i + 1} - ${faker.lorem.sentence(8)}`,
//       description: faker.lorem.sentence(),
//       category: "Autos",
//       contentLang: "English",
//     });
//     await studioPage.handleContentButton({ contentType: ContentType.video });
//   }
//   await studioPage.verifyItemPage("10");
//   await studioPage.clickOnNextPage()
//   await studioPage.deleteAllContent();

// });

// test(`Verify Pagination On Content Short `, { tag: "@Smoke" }, async ({ studioPage, loginPage }) => {
//   test.setTimeout(510000);

//   await studioPage.loginAndNavigate({ loginPage }, loginData.jwNormalAcc);

//   for (let i = 0; i < 20; i++) {
//     await studioPage.selectUploadContent(ContentType.short);
//     await studioPage.fillContentDetail({
//       title: `Short ${i + 1} - ${faker.lorem.sentence(8)}`,
//       description: faker.lorem.sentence(),
//       category: "Autos",
//       contentLang: "English",
//     });
//     await studioPage.handleContentButton({ contentType: ContentType.short });
//   }
//   await studioPage.verifyItemPage("10");
//   await studioPage.clickOnNextPage()
//   await studioPage.deleteAllContent();

// });

// test(`Verify Pagination On Content Articles `, { tag: "@Smoke" }, async ({ studioPage, loginPage }) => {
//   test.setTimeout(510000);
//   await studioPage.loginAndNavigate({ loginPage }, loginData.kbNormalAcc);
//   for (let i = 0; i < 20; i++) {
//     await studioPage.selectUploadContent(ContentType.article);
//     await studioPage.fillArticleContent({
//       description: faker.lorem.sentence(30),
//       title: `Articles ${i + 1} - ${faker.lorem.sentence(8)}`,
//       articleContent: faker.lorem.sentence(18),
//       category: "Autos",
//       contentLang: "English",
//       uploadThumbnail: true,

//     });
//     await studioPage.clickOnback();

//   }
//   await studioPage.verifyItemPage("10");
//   await studioPage.clickOnNextPage()
//   await studioPage.deleteAllContent();

// });

//comment
testData.forEach(({contentType}) => {
  test(
    `Can comments display correctly in comment tab`,
    {tag: "@Smoke"},
    async ({studioPage, videoPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.gjwNormalAcc);
      await studioPage.openSideBarMenu({
        menu: "content",
      });

      await studioPage.selectUploadContent(contentType);
      const videoTitle = faker.lorem.sentence(8);
      const comment = faker.lorem.sentence(10);
      await studioPage.fillContentDetail({
        title: videoTitle,
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});

      const newPage = await studioPage.clickOnWatch();
      await videoPage.verifyVideoTitle(videoTitle, newPage);
      await videoPage.addComment(comment, newPage);
      await newPage.close();
      await studioPage.openSideBarMenu({
        menu: "comments",
      });
      await studioPage.verifyComment({
        title: comment,
      });
      await studioPage.clickOnMoreOptions({
        index: 0,
      });
      await studioPage.clickDeleteContent({
        option: "Delete",
      });
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

test(
  `Verify can create comment for article `,
  {tag: "@Smoke"},
  async ({studioPage, videoPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.enNormalUser2);

    const articleTitle = faker.lorem.sentence(8);
    const comment = faker.lorem.sentence(10);

    await studioPage.selectUploadContent(ContentType.article);
    await studioPage.fillArticleContent({
      title: articleTitle,
      articleContent: faker.lorem.sentence(18),
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
      uploadThumbnail: true,
    });
    await studioPage.clickOnback();
    await studioPage.page.waitForSelector(`text=${articleTitle}`, {state: "visible"});
    const newPage = await studioPage.clickOnPreview();

    await videoPage.verifyArticleTitle(articleTitle, newPage);
    await videoPage.addComment(comment, newPage);
    await newPage.close();
    await studioPage.openSideBarMenu({
      menu: "comments",
    });
    await studioPage.verifyComment({
      title: comment,
    });
    await studioPage.clickOnMoreOptions({
      index: 0,
    });
    await studioPage.clickDeleteContent({
      option: "Delete",
    });
    await studioPage.openSideBarMenu({
      menu: "content",
    });
  },
);

test(
  `Verify can create comment for  Short`,
  {tag: "@Smoke"},
  async ({studioPage, videoPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);

    await studioPage.selectUploadContent(ContentType.short);
    const shortTitle = faker.lorem.sentence(8);
    const comment = faker.lorem.sentence(10);

    await studioPage.fillContentDetail({
      title: shortTitle,
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType: ContentType.short});
    const newPage = await studioPage.clickOnWatch();
    await videoPage.verifyShortTitle(shortTitle, newPage);
    await videoPage.addCommentShort(comment, newPage);
    await newPage.close();
    await studioPage.openSideBarMenu({
      menu: "comments",
    });
    await studioPage.verifyComment({
      title: comment,
    });
    await studioPage.clickOnMoreOptions({
      index: 0,
    });
    await studioPage.clickDeleteContent({
      option: "Delete",
    });
    await studioPage.openSideBarMenu({
      menu: "content",
    });
  },
);

//playlist
//
testData.forEach(({contentType}) => {
  test(
    `Add playlist for ${contentType}`,
    {tag: "@Smoke"},

    async ({studioPage, videoPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.playlistTest);
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      await studioPage.deleteAllContent();
      const videoCount = 2;
      for (let i = 0; i < videoCount; i++) {
        await studioPage.selectUploadContent(contentType);
        await studioPage.fillContentDetail({
          title: `Video ${i + 1} - ${faker.lorem.sentence(8)}`,
          description: faker.lorem.sentence(),
          category: "Autos",
          contentLang: "English",
        });
        await studioPage.handleContentButton({contentType});
      }
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickAddPlayList();
      const titlePlayList = faker.lorem.sentence(8);
      await studioPage.fillContentPlayList({
        title: titlePlayList,
        description: faker.lorem.sentence(),
      });
      await studioPage.clickOnAddContent({
        createButton: true,
      });
      const newPage = await studioPage.clickOnWatch();
      await videoPage.verifyPlayList(titlePlayList, newPage, videoCount);
      await newPage.close();
      await studioPage.deleteAllContent();
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

testData.forEach(({contentType}) => {
  test(`Remove playlist for ${contentType}`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.gjwNormalAcc);

    await studioPage.selectUploadContent(contentType);
    await studioPage.fillContentDetail({
      title: faker.lorem.sentence(8),
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType});
    await studioPage.openSideBarMenu({
      menu: "playlists",
    });
    await studioPage.clickAddPlayList();
    await studioPage.fillContentPlayList({
      title: faker.lorem.sentence(8),
      description: faker.lorem.sentence(),
    });
    await studioPage.clickOnAddContent({
      createButton: true,
    });
    await studioPage.deleteAllContent();
    await studioPage.openSideBarMenu({
      menu: "content",
    });
  });
});
testData.forEach(({contentType}) => {
  test(
    `Verify that user can Set as playlist thumbnail `,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.normalAcc);

      await studioPage.selectUploadContent(contentType);
      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickAddPlayList();
      await studioPage.fillContentPlayList({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
      });
      await studioPage.clickOnAddContent({
        createButton: true,
      });
      await studioPage.clickOnEditBtn();
      await studioPage.changeThumbnail();
      await studioPage.clickOnMoreOptions({
        index: 0,
      });
      await studioPage.handleThreeDotMenu({option: "Set as playlist thumbnail"});
      await studioPage.handleContentButton({contentType: "other" as ContentType});
      await studioPage.clickOnback();
      await studioPage.deleteAllContent();
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

testData.forEach(({contentType}) => {
  test(
    `Verify that user can Move to bottom/top`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      test.setTimeout(510000);
      await studioPage.loginAndNavigate({loginPage}, loginData.jwNormalAcc);
      const videoCount = 2;
      for (let i = 0; i < videoCount; i++) {
        const titleVideo = `Video ${i + 1} - ${faker.lorem.sentence(8)}`;
        await studioPage.selectUploadContent(contentType);
        await studioPage.fillContentDetail({
          title: titleVideo,
          description: faker.lorem.sentence(),
          category: "Autos",
          contentLang: "English",
        });
        await studioPage.handleContentButton({contentType});
      }
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickAddPlayList();
      const titlePlayList = faker.lorem.sentence(8);
      await studioPage.fillContentPlayList({
        title: titlePlayList,
        description: faker.lorem.sentence(),
      });
      await studioPage.clickOnAddContent({
        createButton: true,
      });
      await studioPage.clickOnEditBtn();
      await studioPage.clickOnMoreOptions({
        index: 0,
      });
      await studioPage.getVideoTitlesFromList({
        direction: "Move to bottom",
        option: 0,
      });
      await studioPage.clickOnMoreOptions({
        index: 1,
      });
      await studioPage.getVideoTitlesFromList({
        direction: "Move to top",
        option: 1,
      });

      await studioPage.clickOnback();
      await studioPage.deleteAllContent();
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

testData.forEach(({contentType}) => {
  test(
    `Verify that user can add videos to a playlist`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      test.setTimeout(510000);
      await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
      await studioPage.selectUploadContent(contentType);

      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});

      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickAddPlayList();
      const titlePlayList = faker.lorem.sentence(8);
      await studioPage.fillContentPlayList({
        title: titlePlayList,
        description: faker.lorem.sentence(),
      });
      await studioPage.clickOnAddContent({
        createButton: true,
      });
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      //video unlisted
      await studioPage.selectUploadContent(contentType);
      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.changeVisibility({
        order: 0,
        option: "Unlisted",
      });
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickOnEditBtn();
      await studioPage.clickOnAddContent({});
      //Private
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      const titleVideo = faker.lorem.sentence(8);
      await studioPage.selectUploadContent(contentType);
      await studioPage.fillContentDetail({
        title: titleVideo,
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.changeVisibility({
        order: 0,
        option: "Private",
      });
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickOnEditBtn();
      await studioPage.clickOnAddContent({});
      await studioPage.clickOnback();
      await studioPage.clickOnMoreOptions({
        index: 0,
      });
      await studioPage.handleThreeDotMenu({
        option: "Share",
      });
      await studioPage.clickButtonCopy();
      await studioPage.clickCloseIcon();
      await studioPage.verifyAvatarOptions({
        option: "Sign out",
        title: "Gan Jing World",
      });
      await studioPage.navigateToUrlClipboard();
      await studioPage.verifyTitle({
        title: titlePlayList,
      });
      await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.deleteAllContent();
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

testData.forEach(({contentType}) => {
  test(` Can change Public of playlist `, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
    const videoTitle = faker.lorem.sentence(8);
    await studioPage.selectUploadContent(contentType);
    await studioPage.fillContentDetail({
      title: videoTitle,
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType});
    await studioPage.openSideBarMenu({
      menu: "playlists",
    });
    await studioPage.clickAddPlayList();
    const titlePlayList = faker.lorem.sentence(8);
    await studioPage.fillContentPlayList({
      title: titlePlayList,
      description: faker.lorem.sentence(),
    });
    await studioPage.clickOnAddContent({
      createButton: true,
    });
    await studioPage.changeVisibility({
      order: 0,
      option: "Public",
    });
    await studioPage.clickOnMoreOptions({
      index: 0,
    });
    await studioPage.handleThreeDotMenu({
      option: "Share",
    });
    await studioPage.clickButtonCopy();
    await studioPage.clickCloseIcon();
    await studioPage.verifyAvatarOptions({
      option: "Sign out",
      title: "Gan Jing World",
    });
    await studioPage.navigateToUrlClipboard();
    await studioPage.verifyTitleVideoPlayList({
      titleVideoPublic: videoTitle,
    });
    await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
    await studioPage.openSideBarMenu({
      menu: "content",
    });
  });
});
testData.forEach(({contentType}) => {
  test(` Can change unlisted  of playlist `, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
    const titleVideo = faker.lorem.sentence(8);

    await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
    await studioPage.selectUploadContent(contentType);
    await studioPage.fillContentDetail({
      title: titleVideo,
      description: faker.lorem.sentence(),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType});
    await studioPage.openSideBarMenu({
      menu: "playlists",
    });
    await studioPage.clickAddPlayList();
    await studioPage.fillContentPlayList({
      title: faker.lorem.sentence(8),
      description: faker.lorem.sentence(),
    });
    await studioPage.clickOnAddContent({
      createButton: true,
    });
    await studioPage.changeVisibility({
      order: 0,
      option: "Unlisted",
    });
    await studioPage.clickOnMoreOptions({
      index: 0,
    });
    await studioPage.handleThreeDotMenu({
      option: "Share",
    });
    await studioPage.clickButtonCopy();
    await studioPage.clickCloseIcon();
    await studioPage.verifyAvatarOptions({
      option: "Sign out",
      title: "Gan Jing World",
    });
    await studioPage.navigateToUrlClipboard();
    await studioPage.verifyTitleVideoPlayList({
      titleVideoPrivate: titleVideo,
    });
    await studioPage.loginAndNavigate({loginPage}, loginData.htNormalAcc);
    await studioPage.openSideBarMenu({
      menu: "playlists",
    });
    await studioPage.deleteAllContent();
    await studioPage.openSideBarMenu({
      menu: "content",
    });
  });
});

testData.forEach(({contentType}) => {
  test(
    `Can play all video of playlist`,
    {tag: "@Smoke"},

    async ({studioPage, videoPage, loginPage}) => {
      test.setTimeout(510000);

      await studioPage.loginAndNavigate({loginPage}, loginData.playlistTest);

      const videoCount = 3;
      for (let i = 0; i < videoCount; i++) {
        await studioPage.selectUploadContent(contentType);
        await studioPage.fillContentDetail({
          title: `Video ${i + 1} - ${faker.lorem.sentence(8)}`,
          description: faker.lorem.sentence(),
          category: "Autos",
          contentLang: "English",
        });
        await studioPage.handleContentButton({contentType});
      }
      await studioPage.openSideBarMenu({
        menu: "playlists",
      });
      await studioPage.clickAddPlayList();
      const titlePlayList = faker.lorem.sentence(8);
      await studioPage.fillContentPlayList({
        title: titlePlayList,
        description: faker.lorem.sentence(),
      });
      await studioPage.clickOnAddContent({
        createButton: true,
      });
      await studioPage.clickOnEditBtn();

      const newPage = await studioPage.clickButtonPlayAll();
      await videoPage.allVideoPlayList(newPage, videoCount);
      await newPage.close();
      await studioPage.clickDeletePlayList();
      await studioPage.verifyNotification({
        locator: studioPage.notification,
        message: messages.DELETE_VIDEO_PLAYLIST,
      });
      await studioPage.deleteAllContent();
      await studioPage.openSideBarMenu({
        menu: "content",
      });
    },
  );
});

// dowload

testData.forEach(({contentType}) => {
  test(
    `Verify Studio can download ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.normalAcc);

      await studioPage.selectUploadContent(contentType);
      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.clickOnMoreOptions({
        index: 0,
      });
      await studioPage.handleThreeDotMenu({option: "Download"});
      await studioPage.downloadContent();
    },
  );
});
test(`Verify Studio can download Short`, {tag: "@Smoke"}, async ({studioPage, loginPage}) => {
  await studioPage.loginAndNavigate({loginPage}, loginData.playlistTest);

  await studioPage.selectUploadContent(ContentType.short);
  await studioPage.fillContentDetail({
    title: faker.lorem.sentence(8),
    description: faker.lorem.sentence(),
    category: "Autos",
    contentLang: "English",
  });
  await studioPage.handleContentButton({contentType: ContentType.short});
  await studioPage.clickOnMoreOptions({
    index: 0,
  });
  await studioPage.handleThreeDotMenu({option: "Download"});
  await studioPage.downloadContent();
});

// Verify Details page
testData.forEach(({contentType}) => {
  test(
    `Verify that the Details page ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.gjwNormalAcc);
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      await studioPage.selectUploadContent(contentType);
      const titleVideo = faker.lorem.sentence(8);
      const descriptionVideo = faker.lorem.sentence();
      await studioPage.fillContentDetail({
        title: titleVideo,
        description: descriptionVideo,
        category: "Autos",
        contentLang: "English",
      });
      await studioPage.handleContentButton({contentType});
      await studioPage.clickOnEditBtn();
      await studioPage.verifyContentDetail({
        title: titleVideo,
        description: descriptionVideo,
        options: ["Disable comments", "Hold all comments", "Schedule"],
        category: "Autos",
        contentLang: "English",
        Visibility: "Public",
        role: ["Cancel", "Save", "Delete", "Download"],
        thumbnail: "Thumbnail",
        uploadVideo: "Upload Video",
      });
      await studioPage.changeThumbnail();
      await studioPage.handleContentButton({contentType: "other" as ContentType});
      await studioPage.verifyNotification({
        locator: studioPage.notification,
        message: messages.VIDEO,
      });
      await studioPage.clickOnBackChannel();
    },
  );
});

testData.forEach(({contentType}) => {
  test.only(
    `verify Studio can update and visibility of Video ${contentType}`,
    {tag: "@Smoke"},
    async ({studioPage, loginPage}) => {
      await studioPage.loginAndNavigate({loginPage}, loginData.newAcc3);
      await studioPage.openSideBarMenu({
        menu: "content",
      });
      await studioPage.selectUploadContent(contentType);

      await studioPage.fillContentDetail({
        title: faker.lorem.sentence(8),
        description: faker.lorem.sentence(),
        category: "Autos",
        contentLang: "English",
      });

      await studioPage.handleContentButton({contentType});
      await studioPage.changeVisibility({
        order: 0,
        option: "Private",
      });

      await studioPage.verifyNotification({
        locator: studioPage.notification,
        message: messages.VIDEO,
      });
    },
  );
});

test(
  `Verify Studio can update Visibility of Short ${ContentType.short}`,
  {tag: "@Smoke"},
  async ({studioPage, loginPage}) => {
    await studioPage.loginAndNavigate({loginPage}, loginData.newAcc2);

    await studioPage.selectUploadContent(ContentType.short);

    await studioPage.fillContentDetail({
      title: faker.lorem.sentence(18),
      description: faker.lorem.sentence(30),
      category: "Autos",
      contentLang: "English",
    });
    await studioPage.handleContentButton({contentType: ContentType.short});

    await studioPage.changeVisibility({
      order: 0,
      option: "Public",
    });

    await studioPage.verifyNotification({
      locator: studioPage.notification,
      message: messages.VIDEO,
    });
  },
);

//     title: "Gan Jing World | Creator Studio",
//   });
//   await studioPage.expandAvatarMenu({option: expectedMenuItems, title: expectedMenuItems});
//   await studioPage.navigateFromAvartaMenu({option: "My Channel", title: "Gan Jing World"});
//   const menuBtnChannel = ["Home", "Posts", "Playlists", "Collections", "About", "Followers"];
//   await studioPage.menuBtnChannel({option: menuBtnChannel, title: menuBtnChannel});

//   await studioPage.verifyAvatarItems({
//     option: "Creator studio",
//     title: "Gan Jing World | Creator Studio",
//   });
//   await studioPage.expandAvatarMenu({option: expectedMenuItems, title: expectedMenuItems});
//   await studioPage.navigateFromAvartaMenu({option: "Gang JW", title: heading.TITLE_GAN_JING_WORLD});
//   const menuBtnGJW = ["Home", "GJW+", "Campus", "#Events", "Shorts"];
//   await studioPage.menuBtnGJW({option: menuBtnGJW, title: menuBtnGJW});
// });

// test(`Verify can remove all uploaded videos`, { tag: "@Smoke" }, async ({ studioPage, loginPage }) => {
//   await studioPage.loginAndNavigate({ loginPage }, loginData.normalAcc);

//   await studioPage.selectLeftMenu("Content");
// });
