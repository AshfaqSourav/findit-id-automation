process.env.SKIP_GLOBAL_SETUP = 'true';
import { test } from "../../../lib/BaseTest.js";
import { config } from "../../../config/testConfig.js";
// import { newUserLoginPage } from "../../pages/newUserLoginPage.js";
import { generateRandomName  } from "../../../utils/randomValue.js";
const fs = require('fs');
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, '../../config/setup-completed.lock');

test.beforeAll(async () => {
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
    console.log('Lock file deleted, will run global setup again.');
}
    // Clear the LoginAuth.json file before running tests
    fs.writeFileSync('./LoginAuth.json', '{}'); // Clear the file (reset to empty JSON)
});
const MailSlurp = require('mailslurp-client').MailSlurp;

test.describe("Login to Findit New User", () => {
    
  test.beforeEach(async ({ page , loginPage  }) => {
    await loginPage.visit();
    await loginPage.acceptCookies();
  });
  // test.beforeEach(async ({ newUserLoginPage }) => {
  //   await newUserLoginPage.visit();
  //   await loginPage.acceptCookies();
  // });
  
  // test("New User Successful login", async ({ loginPage , newUserLoginPage }) => {
  //   // const mailslurp = new MailSlurp({ apiKey: config.mailslurpApiKey });
  //   // const inbox = await mailslurp.inboxController.createInboxWithDefaults();
  //   // const inboxId = inbox.id;
  //   // const emailAddress = inbox.emailAddress;
    
  //   // await loginPage.loginEmail(emailAddress);
  //   // const email = await mailslurp.waitForLatestEmail(inboxId, 30000, true);
  
  //   // const otpRegex = /\b\d{6}\b/;   
  //   // const otpMatch = otpRegex.exec(email.body);
  //   // console.log('otp:', otpMatch[0]);
  //   // const verificationCode = otpMatch[0];
  //   const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 

  //   await loginPage.loginEmailOtp(verificationCode);

  //   const fullname = await generateRandomName();
  //   console.log('Fullname:', fullname);
    
    
  //   await newUserLoginPage.newUserLoginDetails(fullname);

  // });

  test("Empty State Full Name", async ({ loginPage , newUserLoginPage }) => {
    const verificationCode=  await newUserLoginPage.generateNewEmailAndOtp(loginPage) 
    await loginPage.loginEmailOtp(verificationCode);
    await newUserLoginPage.verifyRequiredField(config.credentials.blankString);
  });
})