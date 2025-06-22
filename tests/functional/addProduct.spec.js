import fs from 'fs';
import { doLogin } from '../../utils/setupLoginTest.js';
import { config } from '../../config/testConfig.js';

const test = doLogin('email1');

const ENV = process.env.ENV || 'FI_QA';
const BASE_URL = config[ENV];

test.describe('Add Product to Findit', () => {
  test('@smoke Add product after login', async ({ page, addProductPage }) => {
    await page.goto(BASE_URL);
    await addProductPage.sellitPage1Details();
    await page.waitForTimeout(30000);
    await addProductPage.clickNext();
    await addProductPage.sellitPage2Details();
    await page.waitForTimeout(2000);
    await addProductPage.newSetLocation();
    await page.waitForTimeout(3000);
    await addProductPage.postListing();
    await page.waitForTimeout(5000);

    const segment = await addProductPage.getSegmentFromUrl();
    fs.writeFileSync('segment.txt', config.productSegment, 'utf8');
  });
});
