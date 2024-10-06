import { faker } from '@faker-js/faker';
import { expect } from "@playwright/test";
import { config } from "../config/testConfig";
// import { test } from "../lib/BaseTest";
// import { LoginPage } from "./LoginPage";
import { getRandomImage } from '../utils/randomValue';
// import path from 'path';

const MailSlurp = require('mailslurp-client').MailSlurp;


export class NewUserLoginPage {
  constructor(page, context) {
    this.mailslurp = new MailSlurp({ apiKey: config.mailslurpApiKey});
    this.page = page;
    this.context = context;
    this.newUserLoginFullNameTxt= page.locator('#fullName');
    this.newUserLoginUploadBtn= page.getByRole('button', { name: 'Upload' });
    this.newUserCreateProfileBtn= page.getByRole('button', { name: 'Create Profile' });
    this.newUserCreateProfileCrossBtn= page.locator('.sc-12f5973e-0 kdtDWT icon-wrapper -wrapper')
    this.errorLbl = page.locator('.sc-6870bbef-3');
    this.errorToastLbl= page.locator("div[role='alert'] div:nth-child(2)");


  }

  async visit() {
    await this.page.goto('/');
  }

  async newUserLoginDetails(fullname){
    await this.newUserLoginFullNameTxt.fill(fullname);
    await this.uploadRandomImage();
    await this.newUserCreateProfileBtn.click();
  }

  // async newUserLoginDetailsTxt(fullname){
  //   await this.newUserLoginFullNameTxt.fill(fullname);
  // }

  // async newUserLoginDetailsImage(){
  //   await this.uploadRandomImage();
  // }

  // async newUserLoginDetailsCreateBtn(){

  // }


  async uploadRandomImage() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.newUserLoginUploadBtn.click();
    const fileChooser = await fileChooserPromise;
    const randomImage = getRandomImage();
    await fileChooser.setFiles(randomImage);
  }

  async generateNewEmailAndOtp(loginPage) {
    const inbox = await this.mailslurp.inboxController.createInboxWithDefaults();
    const inboxId = inbox.id;
    const emailAddress = inbox.emailAddress;

    // Login using generated email
    await loginPage.loginEmail(emailAddress);

    // Fetch the OTP from the MailSlurp email inbox
    const email = await this.mailslurp.waitForLatestEmail(inboxId, 30000, true);
    const otpRegex = /\b\d{6}\b/;
    const otpMatch = otpRegex.exec(email.body);

    if (otpMatch) {
      return otpMatch[0];
    } else {
      throw new Error("OTP not found in email");
    }
  }

  async verifyRequiredField(fullname){
    await this.newUserLoginFullNameTxt.fill(fullname);
    await this.newUserCreateProfileBtn.click();
    await expect(this.errorLbl).toBeVisible();
    expect(await this.errorLbl.textContent()).toEqual(
      "Required field");
   }
}