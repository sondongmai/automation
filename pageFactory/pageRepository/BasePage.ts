import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { HelperActions } from "@lib/HelperAction";

let webActions: WebActions;
const helperActions = new HelperActions();

export class BasePage {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    webActions = new WebActions(this.page, this.context);
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/");
  }

  async fillInputField({ inputField, value }): Promise<void> {
    await this.page.locator(inputField).fill("");
    await this.page.locator(inputField).fill(value);
  }

  async waitForApiResponse(url: string, elementSelector: Locator, page?: Page): Promise<void> {
    const activePage = page || this.page; 
    await Promise.all([
      activePage.waitForResponse(url),elementSelector.click()
    ]);
  }

  async uploadContent(inputSelector: string, filePath: string): Promise<void> {
    console.log("filePath", filePath);
    await helperActions.getFullPath(filePath);
    await this.page.setInputFiles(inputSelector, filePath);
    await this.page.waitForTimeout(20000);
  }


  async handleMultipleWindows(elementSelector: Locator | string): Promise<Page> {
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      typeof elementSelector === 'string'
        ? this.page.locator(elementSelector).click()
        : elementSelector.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 240000 });
    await newPage.bringToFront();
    return newPage;
  }

}
