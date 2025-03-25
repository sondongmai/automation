import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { testConfig } from "../../testConfig";
import { BasePage } from "./BasePage";
import { url } from "../../data/url";
import { ContentType } from "@lib/HelperAction";
import { pageTitle } from "../../data/Studio";
import { joinFile } from "../../utils/functional/utils"

import * as path from 'path';
import { el } from "@faker-js/faker/.";
let webActions: WebActions;
const CONTENT_SELECTION = (content) => {
  return `//ul[contains(@class, 'MuiMenu-list')]//li[.='${content}']`;
};
const VIDEO_UPLOAD_INPUT_SELECTOR = `input[type='file']`;
const THUMB_UPLOAD_INPUT_SELECTOR = `label.content-center input[type='file']`;
const TITLE_VIDEO_PLAYLIST = ".playlist_video_title"
const TITLE_VIDEO = "//main[@id='main']/div/div[2]"
const selectionList = (category) => {
  return `//label[text()='${category}']/following-sibling::div`;
};
const videoDetails = (option) => {
  return `//label[.='${option}']`;
};
const menuSelectionOption = (option) => {
  return `//li[.='${option}']`;
};
const leftMenuContent = (menu) => {
  return `//div[contains(@class, '${menu}')]`;
};

const menuShareOption = (option) => {
  return `//button[@aria-label="Share to${option}"]`;
};
const sidebarOption = (option) => {
  return `#menu_item_${option}`;
};
const buttonHeader = (role) => {
  return `//button[normalize-space()='${role}']`;
};
const menuOptionChannel = (option) => {
  return `//button[@title='${option}']`;
};
const menuOptionGJW = (option) => {
  return `//span[normalize-space()='${option}']`;
};

export class StudioPage extends BasePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly CREATE_BUTTON: Locator;
  readonly SELECT_FILE_BUTTON: Locator;
  readonly TITLE_INPUT: Locator;
  readonly CONTENT_TYPE_SELECT: Locator;
  readonly VIDEO_UPLOAD_BTN: Locator;
  readonly descriptionInpput: Locator;
  readonly nextButton: Locator;
  readonly doneButton: Locator;
  readonly shortUploadBtn: Locator;
  readonly streamUploadBtn: Locator;
  readonly publishBtn: Locator;
  readonly articleEditor: Locator;
  readonly articlePublishBtn: Locator;
  readonly articleTitle: Locator;
  readonly articleDescription: Locator;
  readonly draftArticleBtn: Locator;
  readonly langSelection: Locator;
  readonly selectAllOption: Locator;
  readonly deleteBtn: Locator;
  readonly deleteConfirmCheckbox: Locator;
  readonly deleteConfirmBtn: Locator;
  readonly noVideoLabel: Locator;
  readonly editBtn: Locator;
  readonly saveBtn: Locator;
  readonly backBtn: Locator;
  readonly notification: Locator;
  readonly backBtnHeader: Locator;
  readonly moreOptions: Locator;
  readonly titleDialog: Locator;
  readonly copyLink: Locator;
  readonly closeBtn: Locator;
  readonly watchLocator: Locator;
  readonly previewLocator: Locator;
  readonly publishArticleBtn: Locator;
  readonly nextPage: Locator;
  readonly itemPage: Locator;
  readonly updateArticleBtn: Locator;
  readonly titleComment: Locator;
  readonly moreOptionsComment: Locator;
  readonly deleteComent: Locator;
  readonly addPlayListBtn: Locator;
  readonly textareaPlayList: Locator;
  readonly descriptionInpputPlayList: Locator;
  readonly addVideoBtn: Locator;
  readonly selectAllVideoOption: Locator;
  readonly allListVideoBtn: Locator;
  readonly creatListVideoBtn: Locator;
  readonly moreVisibilityBTN: Locator;
  readonly myAvatarOption: Locator;
  readonly playListTitle: Locator;
  readonly playAllBtn: Locator;
  readonly deletePlayListBtn: Locator;
  readonly titlePlayList: Locator;
  readonly categoryInput: Locator;
  readonly thumbnailInput: Locator;
  readonly visibilityInput: Locator;
  readonly uploadVideoInput: Locator;
  readonly myAvaOption:Locator;
  readonly avatar:Locator;
  readonly avatarUser: Locator;
  readonly avatarMyChannel: Locator;
  readonly avatarGangJW: Locator;  








  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.CREATE_BUTTON = page.locator(`button[title="Create Content"]`);
    this.SELECT_FILE_BUTTON = page.locator(`//button[.='Select File']`);
    this.TITLE_INPUT = page.locator(`textarea#title`);
    this.textareaPlayList = page.locator(`//textarea[@placeholder='Add a descriptive title']`);
    this.descriptionInpputPlayList = page.locator(`//textarea[@placeholder='Tell viewers more about your playlist']`);
    this.VIDEO_UPLOAD_BTN = page.locator(CONTENT_SELECTION(ContentType.video));
    this.descriptionInpput = page.locator(`textarea#description`);
    this.nextButton = page.locator(`//button[.='Next']`);
    this.doneButton = page.locator(
      "div.upload-steps div.MuiDialogActions-root button.MuiButton-containedPrimary",
    );
    this.shortUploadBtn = page.locator(CONTENT_SELECTION(ContentType.short));
    this.publishBtn = page.locator(
      "div.MuiDialogActions-spacing button[aria-label='Loading button']",
    );
    this.articleEditor = page.locator(`div.rich-text-editor div.ck-editor__main p`);
    this.articlePublishBtn = page.locator(`div.MuiStack-root button.MuiButton-containedSizeMedium`);
    this.articleTitle = page.locator(`textarea[name='title']`);
    this.articleDescription = page.locator(`textarea[name='description']`);
    this.langSelection = page.locator(`div#lang`);
    this.selectAllOption = page.locator(`th input.PrivateSwitchBase-input`);
    this.deleteBtn = page.locator(`button.MuiButton-colorError`);
    this.deleteConfirmCheckbox = page.locator(`label.MuiFormControlLabel-root input`);
    this.deleteConfirmBtn = page.locator(`.MuiDialogActions-root button.MuiButton-colorError`);
    this.noVideoLabel = page.locator(`.absolute-center`);
    this.editBtn = page.locator(`(//button[@aria-label='Edit'])[1]`)
    this.saveBtn = page.locator(`//button[normalize-space()='Save']`);
    this.backBtn = page.locator(`//li[1]/button`);
    this.notification = page.locator(`#notistack-snackbar`);
    this.backBtnHeader = page.locator(`h2>button`);
    this.moreOptions = page.locator(`.video_menu_btn`)
    this.titleDialog = page.locator(`.share_dialog>h3`)
    this.copyLink = page.locator(`//button[text()="Copy Link"]`)
    this.closeBtn = page.locator(`.close_btn`)
    this.watchLocator = page.locator(`(//button[@aria-label='Watch'])[1]`)
    this.previewLocator = page.locator(`(//button[@aria-label='Preview'])[1]`)
    this.updateArticleBtn = page.locator("//button[.='Update']");
    this.draftArticleBtn = page.locator("//button[.='Save Draft']");
    this.publishArticleBtn = page.locator("//button[.='Publish Now']");
    this.nextPage = page.locator(".big > button:nth-of-type(2)");
    this.itemPage = page.locator(".css-fwgudj");
    this.titleComment = page.locator(".max-lines");
    this.deleteComent = page.locator("//button[contains(text(), 'delete')] ");
    this.addPlayListBtn = page.locator("td>div>button");
    this.addVideoBtn = page.locator("//button[normalize-space()='Add Videos']");
    this.selectAllVideoOption = page.locator("div > label > span > input[type='checkbox']");
    this.allListVideoBtn = page.locator("//button[contains(@aria-label, 'Loading button') and contains(text(), 'Add')]");
    this.creatListVideoBtn = page.locator("//button[contains(@aria-label, 'Loading button') and contains(text(), 'Create Playlist')]");
    this.moreVisibilityBTN = page.locator("td>div>div>div>span")
    this.myAvatarOption = page.locator(".avatar_menu")
    this.myAvaOption = page.locator("//header[contains(@id,'header')]//button//div[contains(@class, 'avatar_wrap')]")

    this.playListTitle = page.locator("//main[@id='main']/div/div[2]");
    this.playAllBtn = page.locator("//button[normalize-space()='Play All']");
    this.deletePlayListBtn = page.locator("//button[normalize-space()='Delete Playlist']");
    this.titlePlayList = page.locator("//main[@id='main']//h1");
    this.categoryInput = page.locator("#category_id");
    this.thumbnailInput = page.locator("//label[text()[normalize-space()='Thumbnail']]");
    this.uploadVideoInput = page.locator("//label[text()[normalize-space()='Upload Video']]");
    this.avatar = page.locator(".userInfo");
    this.avatarUser = page.locator("ul.MuiMenu-list li:nth-child(1) a");
    this.avatarMyChannel = page.locator("//ul[contains(@class, 'MuiMenu-list')]//li[2]//a");
    this.avatarGangJW = page.locator("//ul[contains(@class, 'MuiMenu-list')]//li[3]//a");




  }

  async navigateToStudio(): Promise<void> {
    await this.page.goto(testConfig.studioUrl)
  }
  async loginAndNavigate({ loginPage }, accountData) {
    const { email, password } = accountData;
    await loginPage.login({
      username: email,
      password: password,
    });
    await this.navigateToStudio();
  }
  async verifyAvatarOptions({ option, title }) {
    await this.myAvatarOption.first().click()
    await this.page.locator(menuSelectionOption(option)).click();
    const titlePage = await this.page.title();
    expect(titlePage).toContain(title);
  }

  async expandAvatarMenu({option,title} ) {
    await this.myAvaOption.click();
    for (let i = 0; i < option.length; i++) {
      const menu = this.page.locator(menuSelectionOption(option[i]));
      await expect(menu).toBeVisible();
      await expect(menu).toHaveText(title[i]);
    } 
  }
  async navigateFromAvartaMenu({option,title} ) {
      switch (option) {
        case 'user':
          await this.avatarUser.click();
          break;
        case 'My Channel':
          await this.avatarMyChannel.click();
          break;
        case 'Gang JW':
          await this.avatarGangJW.click();
          break;
        default:
          throw new Error(`Invalid option: ${option}`);
      }
      const titlePage = await this.page.title();
      expect(titlePage).toContain(title);
  }
  async menuBtnChannel({ option, title }) {
    for (let i = 0; i < option.length; i++) {
      const menu = this.page.locator(menuOptionChannel(option[i]));
      await expect(menu).toBeVisible();
      await expect(menu).toHaveText(title[i]);
    }
  }
  async menuBtnGJW({ option, title }) {
    for (let i = 0; i < option.length; i++) {
      const menu = this.page.locator(menuOptionGJW(option[i]));
      await expect(menu).toBeVisible();
      await expect(menu).toHaveText(title[i]);
    }
  }
  async verifyAvatarItems({ option, title }) {
    await this.avatar.click()
    await this.page.locator(menuSelectionOption(option)).click();
    const titlePage = await this.page.title();
    expect(titlePage).toContain(title);
  }

  async selectUploadContent(contentType: ContentType): Promise<void> {
    await this.CREATE_BUTTON.click();
    await this.page.locator(CONTENT_SELECTION(contentType)).click();
    if (contentType === ContentType.video) {
      await this.selectLang("English");
    }
    if (contentType !== ContentType.article) {
      let contentPath: string = contentType === ContentType.video ? testConfig.videoPath : testConfig.shortPath;
      await this.uploadContent(VIDEO_UPLOAD_INPUT_SELECTOR, contentPath);
    }
  }

  async uploadThumbnail(): Promise<void> {
    await this.uploadContent(THUMB_UPLOAD_INPUT_SELECTOR, testConfig.thumbnailPath[0]);
  }
  async changeThumbnail(): Promise<void> {
    await this.uploadContent(VIDEO_UPLOAD_INPUT_SELECTOR, testConfig.thumbnailPath[1]);
  }

  async fillContentDetail({
    title,
    description,
    category = "",
    contentLang = "",
  }) {
    await this.TITLE_INPUT.fill(title);
    await this.descriptionInpput.fill(description);
    if (category) {
      await this.page.locator(selectionList("Category")).click();
      await this.page.locator(menuSelectionOption(category)).click();
    }
    if (contentLang) {
      await this.page.locator(selectionList("Content Language")).click();
      await this.page.locator(menuSelectionOption(contentLang)).click();
    }
  }

  async handleContentButton({ contentType }: { contentType: ContentType }) {
    switch (contentType) {
      case ContentType.video:
        await this.uploadThumbnail();
        await this.nextButton.click();
        await this.nextButton.click();
        await this.waitForApiResponse(url.updateContent, this.doneButton);
        break;

      case ContentType.short:
        await this.waitForApiResponse(url.updateContent, this.publishBtn);
        break;

      case ContentType.article:
        await this.waitForApiResponse(url.updateContent, this.updateArticleBtn);
        break;

      default:
        await this.saveBtn.click();
        break;
    }
  }

  async fillArticleContent({ title, description, articleContent, category, contentLang, uploadThumbnail = false }) {
    await this.articleEditor.fill(articleContent);
    await this.articleTitle.fill(title);
    await this.articleDescription.fill(description);
    await this.page.locator(selectionList("Category")).click();
    await this.page.locator(menuSelectionOption(category)).click();
    await this.page.locator(selectionList("Content Language")).click();
    await this.page.locator(menuSelectionOption(contentLang)).click();
    await this.articleEditor.fill(articleContent);
    
    if (uploadThumbnail) {
      await this.uploadThumbnail();
      await this.waitForApiResponse(url.addContent, this.publishArticleBtn);
    }
  }

  async selectLang(lang: string): Promise<void> {
    await this.langSelection.click();
    await this.page.locator(menuSelectionOption(lang)).click();
  }

  async selectLeftMenu(menu: string): Promise<void> {
    await this.page.locator(leftMenuContent(menu)).click();
  }

  async deleteAllContent(): Promise<void> {
    await this.selectAllOption.click();
    await this.deleteBtn.click();
    await this.deleteConfirmCheckbox.check();
    await this.deleteConfirmBtn.click();
  }

  async verifyContentEmpty(): Promise<void> {
    await expect(this.noVideoLabel).toBeVisible();
    await expect(this.noVideoLabel).toContainText('have no');

  }
  async clickOnEditBtn(): Promise<void> {
    await this.editBtn.click();
  }

  async verifyNotification({ locator, message }) {
    await expect(locator.first()).toBeVisible();
    await expect(locator.first()).toContainText(message);
  }

  async clickOnBackChannel(): Promise<void> {
    await this.backBtn.click();
  }
  async clickButtonCopy(): Promise<void> {
    await this.copyLink.click();
  }
  async clickOnback(): Promise<void> {
    await this.backBtnHeader.click();
  }
  async clickOnMoreOptions({ index }: { index: number }) {
    const option = this.moreOptions.nth(index);
    await option.click();
    await this.page.waitForTimeout(500);
  }
  async handleThreeDotMenu({ option }) {
    await this.page.locator(menuSelectionOption(option)).click()
  }
  async verifyShare({ content }) {
    const shareOptions = ['Facebook', 'Twitter', 'Telegram', 'Line', 'Reddit', 'Weibo'];

    await expect(this.titleDialog).toBeVisible();
    await expect(this.titleDialog).toContainText(`Share this ${content}`);

    for (const option of shareOptions) {
      const button = this.page.locator(menuShareOption(option));
      await expect(button).toBeVisible();
    }
  }

  async clickShareIcon({ items }: { items: string[] }) {
    for (const item of items) {
      const shareButtonLocator = this.page.locator(menuShareOption(item));
      const newPage = await this.handleMultipleWindows(shareButtonLocator);
      let expectedTitle = item;
      if (item === 'Twitter') {
        expectedTitle = pageTitle.Twitter;
      } else if (item === 'Weibo') {
        expectedTitle = pageTitle.Weibo;
      }
      const titlePage = await newPage.title();
      expect(titlePage.toLowerCase()).toContain(expectedTitle.toLowerCase());
      await newPage.close();
    }
  }

  async verifyItemPage(parameter) {
    await this.selectAllOption.click();
    await expect(this.itemPage).toBeVisible();
    await expect(this.itemPage).toContainText(parameter);
  }

  async verifyComment({ title }) {
    await expect(this.titleComment.first()).toBeVisible();
    await expect(this.titleComment.first()).toHaveText(title);

  }
  async clickDeleteContent({ option }) {
    await this.page.locator(menuSelectionOption(option)).click();
    await this.deleteBtn.click();

  }
  async changeVisibility({ order, option }: { order: number, option: string }) {
    await this.moreVisibilityBTN.nth(order).click();
    await this.page.locator(menuSelectionOption(option)).click();

  }
  async clickAddPlayList() {
    await this.addPlayListBtn.click();
  }
  async openSideBarMenu({ menu }) {
    await this.page.locator(sidebarOption(menu)).click();
    await this.page.reload();

  }
  async fillContentPlayList({ title, description }) {
    await this.textareaPlayList.fill(title);
    await this.descriptionInpputPlayList.fill(description);
  }
  async clickOnAddContent({ createButton = false }) {
    await this.addVideoBtn.click();
    await this.selectAllVideoOption.click();
    await this.allListVideoBtn.click();
    if (createButton) {
      await this.creatListVideoBtn.click();
      await this.page.waitForTimeout(5000);
    }
  }

  async clickOnNextPage() {
    await this.nextPage.click();
  }
  async clickDeletePlayList() {
    await this.deletePlayListBtn.click();
    await this.deleteConfirmCheckbox.check();
    await this.deleteConfirmBtn.click();
  }


  async clickCloseIcon(): Promise<void> {
    await expect(this.closeBtn).toBeVisible();
    await this.closeBtn.click();
  }

  async clickOnWatch(): Promise<Page> {
    const newPage = await this.handleMultipleWindows(this.watchLocator);
    return newPage;
  }
  async clickButtonPlayAll(): Promise<Page> {
    const newPage = await this.handleMultipleWindows(this.playAllBtn);
    return newPage;
  }
  async clickOnPreview(): Promise<Page> {
    const newPage = await this.handleMultipleWindows(this.previewLocator);
    return newPage;
  }
  async downloadContent(): Promise<void> {
    const downloadPath = path.join(__dirname, testConfig.downloadFile);
    const waitForDownloadEvent = this.page.waitForEvent("download");
    const download = await waitForDownloadEvent;
    const fileName = download.suggestedFilename();
    await download.saveAs(path.join(downloadPath, fileName));
    joinFile(downloadPath, fileName)
  }

  async getVideoTitles(page: any, selector: string): Promise<string[]> {
    return await page.$$eval(selector, (elements) =>
      elements.map((el) => el.textContent?.trim() || "")
    );
  }

  async getVideoTitlesFromList({ direction, option }) {
    const titlesBeforeChange = await this.getVideoTitles(this.page, TITLE_VIDEO_PLAYLIST);

    const directions = this.page.locator(menuSelectionOption(direction));
    await this.waitForApiResponse(url.updatePlayList, directions);
    await this.page.waitForTimeout(2000)

    const titlesAfterChange = await this.getVideoTitles(this.page, TITLE_VIDEO_PLAYLIST);

    if (direction === "Move to bottom") {
      expect(titlesBeforeChange[option]).toBe(titlesAfterChange[titlesAfterChange.length - 1]);
    } else if (direction === "Move to top") {
      expect(titlesBeforeChange[option]).toBe(titlesAfterChange[0]);
    } else {
      expect(titlesBeforeChange[0]).toBe(titlesAfterChange[0]);
    }
  }


  async navigateToUrlClipboard() {
    await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: this.page.url(),

    });

    const clipboardContent = await this.page.evaluate(() => navigator.clipboard.readText());

    await this.page.goto(clipboardContent);
  }

  async verifyTitleVideoPlayList({ titleVideoPrivate, titleVideoPublic }: { titleVideoPrivate?: string; titleVideoPublic?: string }): Promise<void> {
    const titles = await this.getVideoTitles(this.page, TITLE_VIDEO);

    if (!titles.includes(titleVideoPrivate)) {
      return;
    }
    if (titleVideoPublic && titles.includes(titleVideoPublic)) {
      const matchingElement = this.playListTitle.locator(`text=${titleVideoPublic}`);
      await expect(matchingElement).toBeVisible();
      await expect(matchingElement).toHaveText(titleVideoPublic);
    }
    await this.page.waitForTimeout(2000)

  }
  async verifyTitle({ title }) {
    await expect(this.titlePlayList).toBeVisible();
    await expect(this.titlePlayList).toHaveText(title);
  }


  async verifyContentDetail({ title, description, options, category, contentLang, Visibility, role, thumbnail, uploadVideo }) {
    await expect(this.TITLE_INPUT).toBeVisible();
    await expect(this.thumbnailInput).toHaveText(new RegExp(title));
    await this.TITLE_INPUT.hover();

    await expect(this.descriptionInpput).toBeVisible();
    await expect(this.thumbnailInput).toHaveText(new RegExp(description));

    await expect(this.page.locator(selectionList("Category"))).toBeVisible();
    await expect(this.categoryInput).toHaveValue(category);

    await expect(this.thumbnailInput).toBeVisible();
    await expect(this.thumbnailInput).toHaveText(new RegExp(thumbnail));

    await expect(this.uploadVideoInput).toBeVisible();
    await expect(this.uploadVideoInput).toHaveText(new RegExp(uploadVideo));

    const detailsToCheck = [
      // (Disable comments, Hold all comments, Schedule)
      ...options.map(option => ({ locator: videoDetails(option), text: option })),
      { locator: selectionList("Content Language"), text: contentLang },
      { locator: selectionList("Visibility"), text: Visibility },
      // Các nút (Cancel, Save, Delete, Download)
      ...role.map(role => ({ locator: buttonHeader(role), text: role })),

    ];
    for (const { locator, text, count = 1 } of detailsToCheck) {
      const element = this.page.locator(locator);

      for (let i = 0; i < count; i++) {
        await expect(element).toBeVisible();
        await expect(element).toHaveText(new RegExp(text));
      }
    }
  }












}
