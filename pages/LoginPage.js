import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.allowCookiesBtn= page.getByRole('button', { name: 'Allow Cookies' });
    this.loginLnk= page.getByText('Login').nth(3);
    this.continueWithEmailBtn=page.getByRole('button', { name: 'Continue with Email' });
    this.emailTxt = page.locator('#email');
    this.nextBtn= page.getByRole('button', { name: 'Next' });
    this.otp1Txt = page.locator("(//input[@placeholder='-'])[1]");
    this.otp2Txt = page.locator('input:nth-child(2)');
    this.otp3Txt = page.locator('input.sc-351d33f8-1.dUdBjV').nth(2);
    this.otp4Txt = page.locator('input:nth-child(4)');
    this.otp5Txt = page.locator('input:nth-child(5)');
    this.otp6Txt = page.locator('input:nth-child(6)');
    this.verifyBtn= page.getByRole('button', { name: 'Verify' });
    this.errorLbl = page.locator('.sc-6870bbef-3');
    this.errorToastLbl= page.locator("div[role='alert'] div:nth-child(2)");
  }

  async visit() {
    await this.page.goto('/');
  }
  async acceptCookies(){
    await this.allowCookiesBtn.click();
  }
  async loginEmail(username) {
    await this.loginLnk.click();
    await this.continueWithEmailBtn.click();
    await this.emailTxt.fill(username);
    await this.nextBtn.click();
    

  }
  async loginEmailOtp(password) {
    await this.otp1Txt.fill(password && password.length>0?password.charAt(0):'');
    await this.otp2Txt.fill(password && password.length>1?password.charAt(1):'');
    await this.otp3Txt.fill(password && password.length>2?password.charAt(2):'');
    await this.otp4Txt.fill(password && password.length>3?password.charAt(3):'');
    await this.otp5Txt.fill(password && password.length>4?password.charAt(4):'');
    await this.otp6Txt.fill(password && password.length>5?password.charAt(5):'');
    await this.verifyBtn.click();
  }

  async verifyInvalidEmail(){
  await expect(this.errorLbl).toBeVisible();
    expect(await this.errorLbl.textContent()).toEqual(
      "Invalid email address");
 }
 async verifyInvalidEmailToast(){
  await expect(this.errorToastLbl).toBeVisible();
    expect(await this.errorToastLbl.textContent()).toEqual(
      "Enter a valid email address.");
 }
 async verifyInvalidOtpLength(){
  await expect(this.errorLbl).toBeVisible();
    expect(await this.errorLbl.textContent()).toEqual(
      "OTP code must be exactly 6 characters long");
 }
 async verifyInvalidOtp(){
  await expect(this.errorToastLbl).toBeVisible();
    expect(await this.errorToastLbl.textContent()).toEqual(
      "OTP code is wrong or expired");
 }
 async verifyRequiredField(){
  await expect(this.errorLbl).toBeVisible();
  expect(await this.errorLbl.textContent()).toEqual(
    "Required field");
 }
}

