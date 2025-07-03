import { expect } from "@playwright/test";
import { config } from "../config/testConfig";
import { getOpsUrl } from "../utils/getBaseUrl.js";

export class LoginOpsPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  initializeSelectors(page) {
    this.usernameTxt = page.getByPlaceholder('Enter your username');
    this.passwordTxt = page.getByPlaceholder('Enter your password');
    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
  }

  async visit() {
    const opsUrl = getOpsUrl();
    await this.page.goto(opsUrl);
  }

  async login(page = this.page) {
    this.initializeSelectors(page);
    await expect(this.signInBtn).toBeVisible({timeout: 10000});
    await this.usernameTxt.fill(config.credentials.opsUsername);
    await this.passwordTxt.fill(config.credentials.opsPassward1);
    await this.signInBtn.click();
    await this.page.waitForTimeout(3000);
  }
}
