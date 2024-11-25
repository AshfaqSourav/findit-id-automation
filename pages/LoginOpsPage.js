import { expect } from "@playwright/test";
import { config } from "../config/testConfig";

export class LoginOpsPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    // this.usernameTxt= page.getByPlaceholder('Enter your username') 
    // this.passwordTxt= page.getByPlaceholder('Enter your password')
    // this.signInBtn= page.getByRole('button', { name: 'Sign in' })


  }
  initializeSelectors(page) {
    this.usernameTxt = page.getByPlaceholder('Enter your username');
    this.passwordTxt = page.getByPlaceholder('Enter your password');
    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
  }

  async visit() {
    await this.page.goto('https://base99.ops.findit.id/');
  }
  async login(page = this.page){
    // console.log(config.credentials.opsUsername);
    // // await this.usernameTxt.fill(config.credentials.opsUsername)
    // console.log("Waiting for username input...");
    // await this.page.waitForSelector('input[placeholder="Enter your username"]'); // Ensure the input is in the DOM

    // // Check if the username input is found and then fill it
    // const usernameInput = await this.usernameTxt; // Reference the selector directly
    // if (usernameInput) {
    //   console.log("Username input found, filling...");
    //   await usernameInput.fill(config.credentials.opsUsername);
    // } else {
    //   console.log("Username input not found.");
    // }
    // await this.passwordTxt.fill(config.credentials.opsPassward1)
    // await this.signInBtn.click();
    this.initializeSelectors(page); // Reinitialize selectors with the provided page
    console.log(config.credentials.opsUsername);

    // Wait for the username input and fill in credentials
    await page.waitForSelector('input[placeholder="Enter your username"]');
    await this.usernameTxt.fill(config.credentials.opsUsername);
    await this.passwordTxt.fill(config.credentials.opsPassward1);
    await this.signInBtn.click();
  }
}