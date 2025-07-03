import fs from 'fs';
import path from 'path';
import { expect } from "@playwright/test"; 
import { clickRandomRating} from '../utils/randomValue';
import { AddProductPage } from "./AddProductPage";
import { ActionOpsPage } from "./ActionOpsPage.js";
import { captureAndSaveText , compareTextFiles ,captureAndSavePrice} from "./BasePage.js";
import { getBaseUrl } from '../utils/getBaseUrl.js';

export class BuyItNow {
    constructor(page) {
      this.page = page;
      this.addProductPage = new AddProductPage(this.page, this.context);
      this.actionOpsPage = new ActionOpsPage(this.page, this.context);
      this.productTitle = page.locator('h2.sc-74947c2c-0.OsDcO').nth(0);
      this.chatProductTitle = page.locator('h3[title]').first();
      this.buyNowBtn= page.getByRole('button', { name: 'Buy it now' })
      this.yesConfirmBtn= page.getByRole('button', { name: 'Yes Confirm' })
      this.cvnBtn= page.locator('.flex.items-center.p-2.gap-1.cursor-pointer.rounded-\\[100px\\].false');
      this.dealBtn = page.locator('div').filter({ hasText: /^InboxConversations$/ }).locator('div').nth(3);
      this.checkoutBtn= page.getByRole('button', { name: 'Checkout' });
      this.codOpt= page.locator('div').filter({ hasText: /^COD \(Pay On the spot\)$/ }).nth(1);
      this.placeOrderBtn= page.getByRole('button', { name: 'Place Order' });
      this.productPriceBd = page.locator('h3.text-xs.font-bold.text-black-common.text-nowrap');
      this.bpPriceBd = page.locator('h3.text-xs.font-bold.text-black-common').nth(1);
      this.dcPriceBd = page.locator('h3.text-xs.font-bold.text-black-common').nth(2);
      this.stPriceBd = page.locator('h3.text-xs.font-bold.text-black-common').nth(3);
      this.pdPriceBd = page.locator('h3.text-xs.font-bold.text-black-common').nth(4);
      this.tpPriceBd = page.locator('h3.text-sm.lg\\:text-xl.font-bold.text-black-common.text-nowrap').nth(0);
      this.orderConfirmedTxt =page.getByText('Order Confirmed');
      this.cardChatPrice= page.locator('.sc-e467ecce-5.jrGFHa').last();
      this.cardChatPaidTag = page.getByText('Paid');
      this.cardChatPendingTag = page.getByText('Pending', { exact: true });
      this.reviewToSellerBtn= page.getByRole('button', { name: 'Write a review to seller' })
      this.reviewTxt= page.locator('#reviewText');
      this.sendReviewBtn= page.getByRole('button', { name: 'Send Review' });
      this.toolTipDismissBtn= page.getByRole('button', { name: 'Dismiss' });
      this.chatIconNavbar= page.locator('.sc-48e7ccf0-1 > svg');
      this.goTOChatButton= page.getByRole('button', { name: 'Go to Chat' });

    }
    async verifyProductDetailsPageLoaded() {
      await expect(this.productTitle).toBeVisible();
      console.log("Product details page loaded successfully");
    }
    async buyNowFlow(){
      await this.buyNowBtn.click();
      await this.yesConfirmBtn.click();
      await expect(this.toolTipDismissBtn).toBeVisible({timeout: 10000});
      await this.toolTipDismissBtn.click();
      await expect(this.chatProductTitle).toBeVisible({timeout: 10000});
      await this.CompareproductTitleWithChat();
      await expect(this.checkoutBtn).toBeVisible({timeout: 20000});
      await this.checkoutBtn.click();
      await expect(this.codOpt).toBeVisible();
      await this.addProductPage.newSetLocation();
      await this.codOpt.click();
      await captureAndSavePrice(this.productPriceBd, 'productPriceBdValue.txt');
      await captureAndSavePrice(this.bpPriceBd, 'buyerProtectionBdValue.txt');
      await captureAndSavePrice(this.dcPriceBd, 'deliveryChargeBdValue.txt');
      await captureAndSavePrice(this.stPriceBd, 'subTotalBdValue.txt');
      await captureAndSavePrice(this.pdPriceBd, 'promoBdValue.txt');
      await captureAndSavePrice(this.tpPriceBd, 'totalPayableValue.txt');
      await this.placeOrderBtn.click();
      await expect(this.orderConfirmedTxt).toBeVisible();
    }
  
 async navigateToProductDetails() {
  const BASE_URL = getBaseUrl();
    const filePath = path.resolve(__dirname, '../storedValue/productId.txt');
    const segment = fs.readFileSync(filePath, 'utf8').trim();
    const fullProductUrl = `${BASE_URL}/product/${segment}`;
    console.log(`Navigating to: ${fullProductUrl}`);
    await this.page.goto(fullProductUrl, { waitUntil: 'domcontentloaded' });
    await expect(this.buyNowBtn).toBeVisible();
    console.log('✅ Successfully navigated to the product details page.');
  }
async CompareproductTitleWithChat() {
  await captureAndSaveText(this.chatProductTitle, 'chatProductName.txt');
  let isMatch = await compareTextFiles('productDetailsProductName.txt', 'chatProductName.txt'); 
  if (!isMatch) {
    console.warn('❌ First mismatch. Clicking Deal button...');
    await this.dealBtn.click();
    await captureAndSaveText(this.chatProductTitle, 'chatProductName.txt');
    isMatch = await compareTextFiles('productDetailsProductName.txt', 'chatProductName.txt'); 
    if (!isMatch) {
      console.warn('❌ Second mismatch. Clicking CVN button...');
      await this.cvnBtn.click();
      await captureAndSaveText(this.chatProductTitle, 'chatProductName.txt');
      isMatch = await compareTextFiles('productDetailsProductName.txt', 'chatProductName.txt'); 
    }
  }

  expect(isMatch).toBe(true);
}
async verifyProductPrice() {
  await captureAndSavePrice(this.cardChatPrice, 'cardChatPrice.txt');
  let isMatch = await compareTextFiles('cardChatPrice.txt', 'totalPayableValue.txt');
  expect(isMatch).toBe(true);
}

    async verifyCardTagIsPaid() {
      await expect(this.cardChatPaidTag).toBeVisible();
      console.log("Verified that the status is 'Paid'");
    }
    async redirectToChat() {
      await expect(this.chatIconNavbar).toBeVisible();
      await this.chatIconNavbar.click();
      await expect(this.goTOChatButton).toBeVisible();
      await this.goTOChatButton.click();
      console.log("Redirected to chat successfully.");
      await this.cvnBtn.click();
    }
 
    async reviewToSeller(){
      await expect(this.reviewToSellerBtn).toBeVisible();
      await this.reviewToSellerBtn.click()
      await clickRandomRating(this.page);  
      console.log("Random rating clicked.");
      await this.reviewTxt.fill('good seller');
      await this.sendReviewBtn.click();
      await this.page.waitForTimeout(2000);
    }
  }
  