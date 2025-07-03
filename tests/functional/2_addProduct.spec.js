import { doLogin } from '../../utils/setupLoginTest.js';
import { getBaseUrl } from '../../utils/getBaseUrl.js';
const test = doLogin('seller');
const BASE_URL = getBaseUrl();

test.describe('Upload product as seller', () => {
  test('@smoke upload product', async ({ page, addProductPage }) => {
    await page.goto(BASE_URL);
    await addProductPage.uploadProduct();
    await addProductPage.captureProductTitleAndStore();
    await addProductPage.storeProductIdFromUrl();
  });
});
