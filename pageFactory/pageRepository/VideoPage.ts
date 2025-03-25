import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { testConfig } from "../../testConfig";
import { BasePage } from "./BasePage";
import { url } from "../../data/url";
import { urlNewPage } from "../../data/Studio";



let webActions: WebActions;
const videoTitle = "//h1//span";
const shortTitle = "//div[contains(@class, 'shortSlide_shortInfo__2SKbV')]"
const articleTitle = "//h1//span//span";
const addComment = "//textarea[@placeholder='Add a comment…']";
const buttonComment = "//button[@title='Comment']";
const playListTitle = "//main[@id='main']//h1";
const fromChannel = "#from_channel";
const videoItem = ".vt-item";
const videoPlayList = ".relatedContentWrapper";

export class VideoPage extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly FIRST_SHORT: Locator;
    readonly SAVE_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.context = context;
    }
    async verifyVideoTitle(title: string, page: Page): Promise<void> {
        await expect(page).toHaveURL(urlNewPage.Video);
        await expect(page.locator(videoTitle)).toHaveText(title);
    }
    async verifyPlayList(title: string, page: Page, videoCount: number): Promise<void> {
        await expect(page).toHaveURL(urlNewPage.PlayList);
        await expect(page.locator(playListTitle)).toHaveText(title);
        await expect(page.locator(videoItem)).toHaveCount(videoCount);
    }

    async verifyShortTitle(title: string, page: Page): Promise<void> {
        await expect(page).toHaveURL(urlNewPage.Short);
        await expect(page.locator(shortTitle).first()).toHaveText(title);

    }
    async verifyArticleTitle(title: string, page: Page): Promise<void> {
        await expect(page).toHaveURL(urlNewPage.Article);
        await expect(page.locator(articleTitle)).toHaveText(title);

    }
    async addComment(comment: string, page: Page,): Promise<void> {
        const commentBox = page.locator(addComment);
        await commentBox.click();
        await commentBox.fill(comment);
        const commentButton = page.locator(buttonComment);
        await this.waitForApiResponse(url.addComment, commentButton, page);
    }
    async addCommentShort(comment: string, page: Page,): Promise<void> {
        const commentBox = page.locator(addComment);
        const commentButton = page.locator(buttonComment);
        await commentButton.click()
        await commentBox.click();
        await commentBox.fill(comment);
        await this.waitForApiResponse(url.addComment, commentButton.nth(1), page);
    }
    async allVideoPlayList(page: Page, videoCount: number): Promise<void> {
        await expect(page).toHaveURL(urlNewPage.Video);
        const fromChannelBtn = page.locator(fromChannel);
        await fromChannelBtn.click();
        await expect(page.locator(videoPlayList)).toHaveCount(videoCount - 1);
    }
}