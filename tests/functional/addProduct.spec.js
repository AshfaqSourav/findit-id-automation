process.env.SKIP_GLOBAL_SETUP = 'false';
    import fs from 'fs';
    import { test } from "../../lib/BaseTest.js";
    import { config } from "../../config/testConfig.js";
    import globalSetup from '../../utils/global-setup.js'; 
    
    // test.beforeAll(async () => {
    //     fs.writeFileSync('./LoginAuth.json', '{}');
    //     await globalSetup('email3'); 
    // });

    test.describe("Add Product to Findit", () => {
    
    test.beforeEach(async ({ page , loginPage }) => {
        await loginPage.visit();
        await page.waitForTimeout(3000);
        await page.waitForSelector('.sc-93b4d862-2', { timeout: 10000 });
        const element = await page.$('.sc-93b4d862-2');
        if (element) {
        const isVisible = await element.isVisible();
        console.log('Element is visible:', isVisible);
        } else {
        console.error('Element not found');
        }
    });
    
    test("Add product after successful login", async ({ page , addProductPage }) => {
        await addProductPage.sellitPage1Details();
        await page.waitForTimeout(25000);
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