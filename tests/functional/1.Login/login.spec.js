import { test } from "../../../lib/BaseTest.js";
import { config  } from "../../../config/testConfig.js";

test.describe.serial("Login to Findit", () => {
  test.beforeEach(async ({  loginPage }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();

  });
  
  test("Successful login", async ({page ,loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await page.waitForTimeout(1000);
    await loginPage.loginEmailOtp(config.credentials.otp);
  });
  test("Empty State Email", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.blankString);
    await loginPage.verifyRequiredField();
  });
  test("Invalid Email only name", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.invalidEmail1);
    await loginPage.verifyInvalidEmail();
  });
  test("Invalid Email format", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.invalidEmail2);
    await loginPage.verifyInvalidEmailToast();
  });
  test("Empty State otp", async ({ page,loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await page.waitForTimeout(2000);
    await loginPage.loginEmailOtp(config.credentials.blankString);
    await loginPage.verifyRequiredField();
  });
  test("Invalid otp length", async ({ page,loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await page.waitForTimeout(2000);
    await loginPage.loginEmailOtp(config.credentials.invalidOtp);
    await loginPage.verifyInvalidOtpLength();
  });
  test("Invalid otp", async ({ page,loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await page.waitForTimeout(2000);
    await loginPage.loginEmailOtp(config.credentials.invalidOtp2);
    await loginPage.verifyInvalidOtp();
  });


});
