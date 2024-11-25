import { expect } from "@playwright/test";
import { config } from "../config/testConfig";

export class LoginOpsPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.usernameTxt= page.getByPlaceholder('Enter your username')
    this.passwordTxt= page.getByPlaceholder('Enter your password')
    this.signInBtn= page.getByRole('button', { name: 'Sign in' })


  }

  async visit() {
    await this.page.goto('https://base99.ops.findit.id/');
  }
  async login(){
    await this.usernameTxt.fill(config.credentials.opsUsername)
    await this.passwordTxt.fill(config.credentials.opsPassward1)
    await this.signInBtn.click();
  }
}