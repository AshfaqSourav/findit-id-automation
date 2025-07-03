import { test } from "../../../lib/BaseTest.js";
import { config  } from "../../../config/testConfig.js";

test.describe.serial("Login to Findit", () => {
  test.beforeEach(async ({  loginPage }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();
  });
  
  test("@regression Successful login", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await loginPage.loginEmailOtp(config.credentials.otp);
  });
  test("@regression Empty State Email", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.blankString);
    await loginPage.verifyRequiredField();
  });
  test("@regression Invalid Email only name", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.invalidEmail1);
    await loginPage.verifyInvalidEmail();
  });
  test("@regression Invalid Email format", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.invalidEmail2);
    await loginPage.verifyInvalidEmailToast();
  });
  test("@regression Empty State otp", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await loginPage.loginEmailOtp(config.credentials.blankString);
    await loginPage.verifyRequiredField();
  });
  test("@regression Invalid otp length", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await loginPage.loginEmailOtp(config.credentials.invalidOtp);
    await loginPage.verifyInvalidOtpLength();
  });
  test("@regression Invalid otp", async ({ loginPage }) => {
    await loginPage.loginEmail(config.credentials.buyer);
    await loginPage.loginEmailOtp(config.credentials.invalidOtp2);
    await loginPage.verifyInvalidOtp();
  });
});
