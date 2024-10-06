import fs from 'fs';
import { test } from "../../lib/BaseTest.js";
import { config } from "../../config/testConfig.js";
import globalSetup from '../../utils/global-setup.js';
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, '../../utils/setup-completed.lock');

test.beforeAll(async () => {
    if (fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
        console.log('Lock file deleted, will run global setup again.');
    }
    fs.writeFileSync('./LoginAuth.json', '{}');
    await globalSetup('email3'); // Pass 'email1' to use that email
});

test.describe("Navigate to Product Details Page", () => {

  test.beforeEach(async ({ page, loginPage }) => {
    // Perform login actions
    await loginPage.visit();
    await page.waitForTimeout(3000);
    const segment = fs.readFileSync('segment.txt', 'utf8');
    config.productSegment = segment; 
  });

  test("Visit Product Details Page using stored URL", async ({ page }) => {
    // Construct the full product URL using the base URL from config and the stored segment
    const fullProductUrl = `${config.VF_QA}/product/${config.productSegment}`;
    console.log(`Navigating to: ${fullProductUrl}`);

    // Navigate to the constructed product URL
    await page.goto(fullProductUrl);

    // Optionally, add a check to confirm the navigation
    await page.waitForTimeout(5000); // Wait for the page to load
    console.log("Successfully navigated to the product details page.");
  });
});
