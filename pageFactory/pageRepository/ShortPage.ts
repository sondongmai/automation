import {Page, BrowserContext, Locator, expect} from "@playwright/test";
import {WebActions} from "@lib/WebActions";
import {testConfig} from "../../testConfig";
import {BasePage} from "./BasePage";

let webActions: WebActions;

export class ShortPage extends BasePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly FIRST_SHORT: Locator;
  readonly SAVE_BUTTON: Locator;
  private visibilityInput: Locator;
  private createButton: Locator;
  private saveToPopUp: Locator;
  private privateOption: Locator;
  private addNewCollectionButton: Locator;
  private publicOption: Locator;
  private textField: Locator;
  private dropdown: Locator;
  private collectionName: Locator;
  private collectionTitle: Locator;
  private newCollectionCheckbox: Locator;
  private closeButton: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.FIRST_SHORT = page.locator("xpath=(//h2[@class='postTitle block'])[1]");
    // this.SAVE_BUTTON = page.getByTitle("Save").first()
    this.SAVE_BUTTON = page.locator("(//span[contains(@class, 'save')])[1]/ancestor::button");
  }

  async clickOnFirstShort(): Promise<void> {
    await this.FIRST_SHORT.click();
  }

  async clickOnSaveButton(): Promise<void> {
    await this.SAVE_BUTTON.click();
  }

  async verifySaveToPopUpIsShown(): Promise<boolean> {
    await this.page.waitForTimeout(3000);
    this.saveToPopUp = this.page.locator(".dialog_saveto_popup");
    const isPopupVisible = await this.saveToPopUp.isVisible();
    const isForLaterTitleVisible = await this.page.getByTitle("For later").isVisible();
    const isCreateNewCollectionVisible = await this.page
      .getByText("Create new collection")
      .isVisible();
    return isPopupVisible && isForLaterTitleVisible && isCreateNewCollectionVisible;
  }

  async verifyUserCanNotChangeDefaultVisibility(): Promise<boolean> {
    this.privateOption = this.page.getByTitle("Private");
    const isVisable = await this.privateOption.isVisible();
    return isVisable;
  }

  async verifyUserCanClickNewCollectionButton(): Promise<void> {
    this.addNewCollectionButton = this.page.locator('//button[text()="Create new collection"]');
    expect(await this.addNewCollectionButton.isVisible());
    await this.addNewCollectionButton.click();
  }

  async verifyNewCollectionPopUpIsShown(): Promise<void> {
    expect(await this.saveToPopUp.isVisible());
  }

  async verifyDefaultVisibility(): Promise<void> {
    this.visibilityInput = this.page.getByPlaceholder("Private");
    expect(await this.visibilityInput.isVisible());
  }

  async verifyVisibilityOptions(): Promise<void> {
    this.publicOption = this.page.getByText("Public");
    await expect(this.privateOption).toBeHidden();
    await expect(this.publicOption).toBeHidden();
  }

  async clickOnTextField(): Promise<void> {
    this.textField = this.page.locator('//div[text()="Visibility"]/following-sibling::div[1]');
    await this.textField.click();
  }

  async verifyDropdownIsShown(): Promise<void> {
    this.dropdown = this.page.locator('//input[@placeholder="Private"]/following-sibling::div');
    await expect(this.dropdown).toBeVisible();
  }

  async fillCollectionName(value: string): Promise<void> {
    this.collectionName = this.page.locator('//div[text()="Name"]/following-sibling::input[1]');
    await this.collectionName.fill(value);
  }

  async verifyButtonIsDisable(): Promise<boolean> {
    this.createButton = this.page.getByTitle("Create");
    return await this.createButton.isDisabled();
  }

  async clickCreateButton(): Promise<void> {
    await this.createButton.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyNewCollectionIsCreated(collectionName: string): Promise<boolean> {
    this.collectionTitle = this.page.getByTitle(collectionName);
    const isVisible = await this.collectionTitle.isVisible();
    this.newCollectionCheckbox = this.page.locator(
      '//*[@title="test123"]/parent::*/preceding-sibling::*[1]/input',
    );
    const isChecked = await this.newCollectionCheckbox.isChecked();
    return isVisible && isChecked;
  }

  async closePopUp(): Promise<void> {
    this.closeButton = this.page.locator('//*[@data-testid="common-xmark"]/parent::*');
    await this.closeButton.click();
  }
}
