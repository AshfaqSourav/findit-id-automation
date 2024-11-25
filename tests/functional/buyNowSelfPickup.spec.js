// process.env.SKIP_GLOBAL_SETUP = 'true';
import fs from 'fs';
import { test } from "../../lib/BaseTest.js";
import { config } from "../../config/testConfig.js";
import globalSetup from '../../utils/global-setup.js';
import { LoginOpsPage } from '../functional/1.Login/loginOps.spec.js'; 
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, '../../utils/setup-completed.lock');

test.beforeAll(async () => {
    if (fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
        console.log('Lock file deleted, will run global setup again.');
    }
    fs.writeFileSync('./LoginAuth.json', '{}');
    await globalSetup('email3'); 
});

test.describe("Navigate to Product Details Page", () => {

  // test.beforeEach(async ({ page, loginPage}) => {
  //   // Perform login actions
  //   await loginPage.visit();
  //   await page.waitForTimeout(3000);
  //   const segment = fs.readFileSync('segment.txt', 'utf8');
  //   config.productSegment = segment; 
  // });

  test("Buy now", async ({ context , page , productDetailsPage, loginOpsPage }) => {
    // const fullProductUrl = `${config.VF_QA}/product/${config.productSegment}`;
    // console.log(`Navigating to: ${fullProductUrl}`);
    // await page.goto(fullProductUrl);

    // // Optionally, add a check to confirm the navigation
    // await page.waitForTimeout(5000); // Wait for the page to load
    // console.log("Successfully navigated to the product details page.");

    // await productDetailsPage.buyNowFlow();

    const newTab = await context.newPage();
    const fullOpsPanelUrl = `${config.CM_QA}/products/${config.productSegment}`; 
    await newTab.goto(fullOpsPanelUrl); 
    console.log("Navigated to Ops panel product page in a new tab.");
    await newTab.loginOpsPage.login()
    // Step 4: Perform Login in the New Tab
    // const loginOpsPageInNewTab = new loginOpsPage(newTab);  // Create a new instance of the LoginOpsPage for the new tab
    // await loginOpsPageInNewTab.login();
    console.log("Successfully logged into the Ops panel in the new tab.");

    await newTab.waitForTimeout(3000);
  });
});
