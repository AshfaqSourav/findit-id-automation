process.env.SKIP_GLOBAL_SETUP = 'true';
import { config  } from "../../../config/testConfig.js";
import { test } from "../../../lib/BaseTest.js";

const MailSlurp = require('mailslurp-client').MailSlurp;

test.describe("Login to Findit New User", () => {
    
  test.beforeEach(async ({  loginPage  }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();

  });

  test("Successful New User Login", async ({ loginPage ,newUserLoginPage }) => {
    const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
    await loginPage.loginEmailOtp(verificationCode);
    await newUserLoginPage.newUserLoginDetails();

  });
  test("Empty State Full Name", async ({ loginPage , newUserLoginPage }) => {
    const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
    await loginPage.loginEmailOtp(verificationCode);
    await newUserLoginPage.verifyRequiredField(config.credentials.blankString);
  });
  test ("Re-Upload Button check",async ({loginPage , newUserLoginPage })=>{
    const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
    await loginPage.loginEmailOtp(verificationCode);
    
    await newUserLoginPage.reUploadBtnCheck()

  })
})