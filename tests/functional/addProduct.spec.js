process.env.SKIP_GLOBAL_SETUP = 'true';
    import fs from 'fs';
    import { test } from "../../lib/BaseTest.js";
    import { config } from "../../config/testConfig.js";
    import globalSetup from '../../utils/global-setup.js'; 
    
    test.beforeAll(async () => {
        fs.writeFileSync('./LoginAuth.json', '{}');
        await globalSetup('email1'); // Pass 'email1' to use that email
    });

    test.describe("Add Product to Findit", () => {
    
    test.beforeEach(async ({ page , loginPage }) => {
        await loginPage.visit();
        await page.waitForTimeout(3000);
        await page.waitForSelector('.sc-fad81cfc-2 > .sc-12f5973e-0 > .icon > path', { timeout: 10000 });
        const element = await page.$('.sc-fad81cfc-2 > .sc-12f5973e-0 > .icon > path');
        if (element) {
        const isVisible = await element.isVisible();
        console.log('Element is visible:', isVisible);
        } else {
        console.error('Element not found');
        }
    });
    
    test("Add product after successful login", async ({ page , addProductPage }) => {
        await addProductPage.sellitPage1Details();
        await page.waitForTimeout(15000);
        await addProductPage.clickNext();
        await addProductPage.sellitPage2Details();
        await page.waitForTimeout(2000);
        await addProductPage.locationDropdown();
        await page.waitForTimeout(3000);
        await addProductPage.postListing();
        await page.waitForTimeout(5000);

        const segment = await addProductPage.getSegmentFromUrl();

        fs.writeFileSync('segment.txt', config.productSegment, 'utf8');
    });
    });