import fs from 'fs';
import path from 'path';
import { expect } from "@playwright/test";
import { config } from "../config/testConfig";
import { getRandomImage ,getRandomProductName , getRandomOption , generateRandomNumber} from '../utils/randomValue';
import {getValidPriceFromStored,extractAndSaveDynamicPrice} from '../utils/addProductUtils.js';
import { clickUntilVisible , captureAndSaveText ,clickUntilVisible2} from "./BasePage.js";


export class AddProductPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.sellitBtn= page.getByRole('button', { name: 'Sell it' });
    this.uploadImageBtn= page.getByText('Upload images and let the AI');
    this.namePlaceholderTxt = page.getByPlaceholder('Name'); 
    this.categoryDropdown = page.locator('div').filter({ hasText: /^Select category$/ }).nth(1);
    this.subCategoryDropdown = page.locator('div').filter({ hasText: /^Select sub category$/ }).nth(1);
    this.selectConditionDropDown = page.getByPlaceholder('Select condition');
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.askingPriceNum= page.locator('#price');
    this.postListingForFreeBtn= page.getByRole('button', { name: 'Post listing for free' });
    this.successListingPageProductClick = page.getByRole('button', { name: 'View listing page' });
    this.errorLbl = page.locator('.sc-6870bbef-3');
    this.errorToastLbl= page.locator("div[role='alert'] div:nth-child(2)");
    this.priceNote = page.getByText('Products under Rp 50000 are for direct purchase only.')
    this.fixedTag = page.getByText('Fixed');
    this.negoDaysTitle = page.getByText('Negotiation expiry date');
    this.locationOption = page.locator('(//input[@id="pickup_location"])[1]');
    this.locationOption2 = page.locator('(//input[@id="pickup_location"])[2]');
    this.locationTxt = page.getByText('Jakarta Selatan, South');
    this.confirmBtn = page.getByRole('button', { name: 'Confirm Address' });
    this.addressInput = page.getByRole('textbox', { name: 'Please mention House, Road,'});
    this.shippingAddressTxt = page.getByRole('heading', { name: 'What’s your shipping address?' });
    this.locationChangeBtn = page.getByRole('button', { name: 'Change' });
    this.productTitle = page.locator('h2.sc-74947c2c-0.OsDcO').first();
  }

async uploadProduct(){
  await this.sellitBtn.click();
  await this.sellitPage1Details();
  await this.sellitPage2Details();
  await this.newSetLocation();
  await this.postListing();
}

async sellitPage1Details(){
    await this.uploadRandomImage();
    await this.fillProductNameIfEmpty(); 
    await this.selectCategoryIfEmpty(); 
    await this.selectSubCategoryIfEmpty();
    await this.selectRandomProductCondition();
    await this.page.waitForTimeout(30000);
    await this.clickNext(); 
}
async clickNext(){
    await this.nextBtn.click();
}

async sellitPage2Details() {
  await this.productPrice(40000);
  await extractAndSaveDynamicPrice(this.priceNote);
  const { validPrice, negoPrice } = getValidPriceFromStored();
  await this.askingPriceNum.clear();
  await this.askingPriceNum.fill(validPrice.toString());
  await this.fixedTag.waitFor({ timeout: 2000 });
  await this.askingPriceNum.clear();
  await this.askingPriceNum.fill(negoPrice.toString());
  await this.negoDaysTitle.waitFor({ timeout: 2000 });
}

async newSetLocation(){
   if (await this.locationChangeBtn.isVisible()) {
    return;
  }
  await clickUntilVisible(this.locationOption,this.locationOption2,this.page,5)
  await this.locationOption2.click();
  await this.locationOption2.fill('jaka');
  await this.locationTxt.click();
  await this.confirmBtn.click();
  await this.addressInput.click();
  await this.addressInput.fill(config.credentials.addressDetails);
}
async postListing(){
  await expect(this.postListingForFreeBtn).toBeVisible({ timeout: 10000 });
  await clickUntilVisible2(this.postListingForFreeBtn,this.successListingPageProductClick,this.page,5);
  await this.successListingPageProductClick.click();
  await expect(this.productTitle).toBeVisible({ timeout: 10000 });
}
  async captureProductTitleAndStore() {
    return await captureAndSaveText(this.productTitle, 'productDetailsProductName.txt');
  }
async uploadRandomImage() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadImageBtn.click();
    const fileChooser = await fileChooserPromise;
    const randomImage = getRandomImage();
    await fileChooser.setFiles(randomImage);
  }
  async fillProductNameIfEmpty() {
    const nameFieldValue = await this.namePlaceholderTxt.inputValue();  

    if (nameFieldValue.trim() === '') {
      await this.page.getByText('Re generate').click(); 
      await this.page.waitForTimeout(5000); 

      const newNameFieldValue = await this.namePlaceholderTxt.inputValue(); 
      if (newNameFieldValue.trim() === '') {
        const randomProductName = getRandomProductName(); 
        await this.namePlaceholderTxt.fill(randomProductName);  
      }
    }
    const finalNameFieldValue = await this.namePlaceholderTxt.inputValue();
    expect(finalNameFieldValue).not.toBe(''); 
  }
  async selectCategoryIfEmpty() {
    if (await this.categoryDropdown.isVisible()) {
      await this.page.getByText('Select category').click(); 
      await this.page.locator('li').filter({ hasText: 'Electronics' }).click(); 
    }
  }
  async selectSubCategoryIfEmpty() {
    if (await this.subCategoryDropdown.isVisible()) {
      await this.page.getByText('Select sub category').click(); 
      await this.page.locator('li').filter({ hasText: 'Streaming Devices' }).click();  
    }
}
async selectRandomProductCondition() {
    const randomOption = getRandomOption();
    await this.selectConditionDropDown.click();
    await this.page.getByRole('button', { name: randomOption }).click();
    console.log(`Selected condition: ${randomOption}`);
  
}

async productPrice(price) {
  await this.askingPriceNum.fill(price.toString());
}
async storeProductIdFromUrl() {
  await this.getSegmentFromUrl();
  const segmentFilePath = path.resolve(__dirname, '../storedValue/productId.txt');
  fs.writeFileSync(segmentFilePath, config.productSegment, 'utf8');
  // const segmentFilePath = path.resolve(__dirname, '../../storedValue/productId.txt');
  //     fs.writeFileSync(segmentFilePath, config.productSegment, 'utf8');
}
async getSegmentFromUrl() {
    const currentUrl = this.page.url();
    const urlSegments = currentUrl.split('/').filter(segment => segment !== '');
    const lastSegment = urlSegments[urlSegments.length - 1];
    console.log(`The last segment is: ${lastSegment}`);
    config.productSegment = lastSegment;
    return lastSegment;  
  }
}
