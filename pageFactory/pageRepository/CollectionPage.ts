import {Page, BrowserContext, Locator, expect} from "@playwright/test";
import {WebActions} from "@lib/WebActions";
import {testConfig} from "../../testConfig";
import {BasePage} from "./BasePage";

let webActions: WebActions;

export class CollectionPage extends BasePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly EDIT_BUTTON: Locator;
  readonly SAVE_BUTTON: Locator;
  readonly COLLECTION_DESCRIPTION: Locator;
  readonly EDIT_TXT: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.EDIT_BUTTON = page.locator("button.black");
    this.SAVE_BUTTON = page.locator("//button[.='Save']");
    this.COLLECTION_DESCRIPTION = page.locator("//div[contains(@class, 'collectionPage_desc')]");
    this.EDIT_TXT = page.locator('textarea[maxlength="2000"]');
  }

  async editACollection({collectionDescription}): Promise<void> {
    console.log("Edit a Collection");
    await this.EDIT_BUTTON.click();
    await super.fillInputField({
      inputField: 'textarea[maxlength="2000"]',
      value: collectionDescription,
    });
    await this.SAVE_BUTTON.click();
    const descContent = await this.COLLECTION_DESCRIPTION.textContent();
    expect(descContent).toContain(collectionDescription);
  }
}
