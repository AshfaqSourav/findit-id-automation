// process.env.SKIP_GLOBAL_SETUP = 'true';
import fs from 'fs';
import path from 'path';
import { config } from "../../config/testConfig.js";
import { BuyItNow } from "../../pages/BuyItNowPage.js";
import { ActionOpsPage } from "../../pages/ActionOpsPage.js";
import { doLogin } from '../../utils/setupLoginTest.js';
import { navigateToOpsPanel , navigateToOpsProductPage } from '../../utils/navigateToOpsPanel.js';

const test = doLogin('buyer');

test.describe("Buy Product with buy it now,COD,J&T", () => {
  const productIdPath = path.resolve(__dirname, '../../storedValue/productId.txt');

test.beforeEach(() => {
  if (!fs.existsSync(productIdPath)) {
    throw new Error('❌ productId.txt not found. Add Product test must run first.');
  }
});

  test("Buy it now along with COD,J&T", async ({ context , page , buyItNow, loginOpsPage }) => {
    await buyItNow.navigateToProductDetails();
    await buyItNow.buyNowFlow();
    const newTab = await navigateToOpsPanel(context, loginOpsPage);
    const filePath = path.resolve(__dirname, '../../storedValue/productId.txt');
    const productSegment = fs.readFileSync(filePath, 'utf8').trim();
    // await page.waitForTimeout(2000); 
    const opsPanelPage = await navigateToOpsProductPage(newTab, productSegment, ActionOpsPage);
    await opsPanelPage.clickBuyerChatroom();
    await opsPanelPage.changeDeliveryStausToAssigningDriver();
    await opsPanelPage.changeDeliveryStausToOnGoing();
    await opsPanelPage.changeDeliveryStausToPickedUp();
    await opsPanelPage.changeDeliveryStausToDelivered();
    await opsPanelPage.changePaymentStatusToPaid();
    await page.bringToFront();
    const firstTabPage = new BuyItNow(page);
    // await page.waitForTimeout(2000); 
    await firstTabPage.redirectToChat();
    await firstTabPage.CompareproductTitleWithChat();
    await firstTabPage.reviewToSeller();
  });
});
