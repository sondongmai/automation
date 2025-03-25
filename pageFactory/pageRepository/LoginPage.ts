import {Page, BrowserContext, Locator, expect} from "@playwright/test";
import {WebActions} from "@lib/WebActions";
import {testConfig} from "../../testConfig";
import {BasePage} from "./BasePage";
import {url} from "../../data/url";

let webActions: WebActions;

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly SIGNIN_BUTTON: Locator;
  readonly USERNAME_EDITBOX: Locator;
  readonly CONTINUE_BUTTON: Locator;
  readonly PASSWORD_EDITBOX: Locator;
  readonly LOGIN_BUTTON: Locator;
  readonly SUBMIT_SIGNIN_BUTTON: Locator;
  readonly AVARTAR_IMG: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.SIGNIN_BUTTON = page.getByTestId(`profile-signin`);
    this.USERNAME_EDITBOX = page.locator("input[name='email']");
    this.PASSWORD_EDITBOX = page.locator("input[name='password']");
    this.CONTINUE_BUTTON = page.getByTestId(`signin-dialog-continue`);
    this.LOGIN_BUTTON = page.getByPlaceholder(`profile-signin`);
    this.SUBMIT_SIGNIN_BUTTON = page.getByTestId(`signin-dialog-signin`);
    this.AVARTAR_IMG = page.locator("img[alt='Hello Taiwan']");
  }

  async login({username, password}): Promise<void> {
    await this.navigateToURL();
    await this.SIGNIN_BUTTON.click();
    await this.USERNAME_EDITBOX.fill(username);
    await this.CONTINUE_BUTTON.click();
    await this.PASSWORD_EDITBOX.fill(password);

    await this.waitForApiResponse(url.getProfile, this.SUBMIT_SIGNIN_BUTTON);
  }
}
