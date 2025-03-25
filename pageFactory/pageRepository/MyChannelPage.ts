import {Page, BrowserContext, Locator, expect} from "@playwright/test";
import {WebActions} from "@lib/WebActions";
import {testConfig} from "../../testConfig";
import {BasePage} from "./BasePage";

let webActions: WebActions;

export class MyChannelPage extends BasePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly PROFILE_BUTTON: Locator;
  readonly MYCHANNEL_MENU: Locator;
  readonly COLLECTION_THREEDOT: Locator;
  readonly COLLECTION_THREE_DOT_MENU: Locator;
  readonly COLLECTION_HEADER: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.PROFILE_BUTTON = page.getByTestId(`profile-avatar`);
    this.MYCHANNEL_MENU = page.getByRole("link").filter({hasText: "My Channel"});
    this.COLLECTION_THREEDOT = page.locator(".playlist_block_container div.pm-menuWrapper");
    this.COLLECTION_THREE_DOT_MENU = page.getByTestId("menu-edit");
    this.COLLECTION_HEADER = page.getByRole("heading");
  }

  async expandMeMenu({menu, url}): Promise<void> {
    await this.PROFILE_BUTTON.click();
    if (menu) {
      this.MYCHANNEL_MENU.click();
    }
    if (url) {
      await this.page.waitForURL(url);
    }
  }

  async navigateToMyChannelPage(): Promise<void> {
    await this.page.goto("/");
  }

  async clickOnATab({tabName}): Promise<void> {
    await this.page
      .getByRole("listitem")
      .filter({has: this.page.getByRole("button", {name: tabName})})
      .click();
  }

  async openCollectionMenu({menu}): Promise<void> {
    await this.COLLECTION_THREEDOT.click();
    if (menu) {
      await this.COLLECTION_THREE_DOT_MENU.click();
    }
  }

  async editCollection({collectionName}): Promise<void> {
    await this.page
      .getByRole("listitem")
      .filter({has: this.page.getByRole("button", {name: collectionName})})
      .click();
  }

  async openCollectionPage({urlPart}): Promise<void> {
    await this.page.waitForTimeout(15000);
    // await this.COLLECTION_HEADER.click();
    await this.page.locator("//h2").click();
    if (urlPart) {
      await expect(this.page).toHaveURL(new RegExp(urlPart));
    }
    console.log("end of method");
  }

  async verifyNewCollectionIsAddAtCollectionsTab(collectionName: string): Promise<boolean> {
    await this.page.waitForTimeout(5000);
    return await this.page.getByTitle(collectionName).isVisible();
  }
}
