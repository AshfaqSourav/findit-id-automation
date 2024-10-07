process.env.SKIP_GLOBAL_SETUP = 'true';
import { test } from "../../../lib/BaseTest.js";
import { config  } from "../../../config/testConfig.js";
const fs = require('fs');
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, '../../config/setup-completed.lock');
fs.writeFileSync('./LoginAuth.json', '{}');
test.beforeAll(async () => {
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
    console.log('Lock file deleted, will run global setup again.');
    }
 
  });


test.describe("Login to Findit", () => {
  test.beforeEach(async ({  loginPage }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();

  });
  
  test("Successful login", async ({ page , loginPage }) => {
    await loginPage.loginEmail(config.credentials.email1);
    await page.waitForTimeout(3000);
    await loginPage.loginEmailOtp(config.credentials.otp);
  });
  // test("Empty State Email", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.blankString);
  //   await loginPage.verifyRequiredField();
  // });
  // test("Invalid Email only name", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.invalidEmail1);
  //   await loginPage.verifyInvalidEmail();
  // });
  // test("Invalid Email format", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.invalidEmail2);
  //   await loginPage.verifyInvalidEmailToast();
  // });
  // test("Empty State otp", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.email1);
  //   await loginPage.loginEmailOtp(config.credentials.blankString);
  //   await loginPage.verifyRequiredField();
  // });
  // test("Invalid otp length", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.email1);
  //   await loginPage.loginEmailOtp(config.credentials.invalidOtp);
  //   await loginPage.verifyInvalidOtpLength();
  // });
  // test("Invalid otp", async ({ loginPage }) => {
  //   await loginPage.loginEmail(config.credentials.email1);
  //   await loginPage.loginEmailOtp(config.credentials.invalidOtp2);
  //   await loginPage.verifyInvalidOtp();
  // });


});
