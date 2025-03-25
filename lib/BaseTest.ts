import { TestInfo, test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ElementsPage } from "@pages/ElementsPage";
import { AlertsFrameWindowsPage } from "@pages/AlertsFrameWindowsPage";
import { WidgetsPage } from "@pages/WidgetsPage";
import { InteractionsPage } from "@pages/InteractionsPage";
import { WebActions } from "@lib/WebActions";
import { MyChannelPage } from "@pages/MyChannelPage";
import AxeBuilder from "@axe-core/playwright";
import { CollectionPage } from "@pages/CollectionPage";
import { ShortPage } from "@pages/ShortPage";
import { StudioPage } from "@pages/StudioPage";
import { VideoPage } from "@pages/VideoPage";

const test = baseTest.extend<{
  webActions: WebActions;
  loginPage: LoginPage;
  elementsPage: ElementsPage;
  alertsFrameWindowsPage: AlertsFrameWindowsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
  makeAxeBuilder: AxeBuilder;
  testInfo: TestInfo;
  myChannelPage: MyChannelPage;
  collectionPage: CollectionPage;
  shortPage: ShortPage;
  studioPage: StudioPage;
  videoPage: VideoPage;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  elementsPage: async ({ page, context }, use) => {
    await use(new ElementsPage(page, context));
  },
  alertsFrameWindowsPage: async ({ page, context }, use) => {
    await use(new AlertsFrameWindowsPage(page, context));
  },
  widgetsPage: async ({ page, context }, use) => {
    await use(new WidgetsPage(page, context));
  },
  interactionsPage: async ({ page, context }, use) => {
    await use(new InteractionsPage(page, context));
  },
  myChannelPage: async ({ page, context }, use) => {
    await use(new MyChannelPage(page, context));
  },
  collectionPage: async ({ page, context }, use) => {
    await use(new CollectionPage(page, context));
  },
  studioPage: async ({ page, context }, use) => {
    await use(new StudioPage(page, context));
  },
  videoPage: async ({ page, context }, use) => {
    await use(new VideoPage(page, context));
  },
  makeAxeBuilder: async ({ page }, use) => {
    await use(
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .exclude("#commonly-reused-element-with-known-issue"),
    );
  },
  shortPage: async ({ page, context }, use) => {
    await use(new ShortPage(page, context));
  },
});

export default test;
