process.env.SKIP_GLOBAL_SETUP = 'true';
import { test } from "../../../lib/BaseTest.js";
const fs = require('fs');
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, '../../config/setup-completed.lock');

test.beforeAll(async () => {
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
    console.log('Lock file deleted, will run global setup again.');
}
    fs.writeFileSync('./LoginAuth.json', '{}'); 
});
const MailSlurp = require('mailslurp-client').MailSlurp;

test.describe("Login to Findit New User", () => {
    
  test.beforeEach(async ({  loginPage  }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();

  });

  // test("Successful New User Login", async ({ loginPage ,newUserLoginPage }) => {
  //   const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
  //   await loginPage.loginEmailOtp(verificationCode);
  //   await newUserLoginPage.newUserLoginDetails();

  // });


  // test("Empty State Full Name", async ({ loginPage , newUserLoginPage }) => {
  //   const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
  //   await loginPage.loginEmailOtp(verificationCode);
  //   await newUserLoginPage.verifyRequiredField(config.credentials.blankString);
  // });
  test ("Re-Upload Button check",async ({loginPage , newUserLoginPage })=>{
    const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
    await loginPage.loginEmailOtp(verificationCode);
    
    await newUserLoginPage.reUploadBtnCheck()

  })
})