import { expect } from "@playwright/test";
import { config } from "../config/testConfig";
import { getRandomImage ,getRandomProductName , getRandomOption , generateRandomNumber} from '../utils/randomValue';

export class AddProductPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.sellitBtn= page.getByRole('button', { name: 'Sell it' });
    this.uploadImageBtn= page.getByText('Upload images and let the AI');
    this.namePlaceholderTxt = page.getByPlaceholder('Name'); 
    this.categoryDropdown = page.locator('div').filter({ hasText: /^Select category$/ }).nth(1);
    this.subCategoryDropdown = page.locator('div').filter({ hasText: /^Select sub category$/ }).nth(1);
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.askingPriceNum= page.getByPlaceholder('0.00');
    this.locationTxt= page.getByPlaceholder('Location');
    this.locationOptionList= page.locator("div[class='sc-e88ca585-5 jQtCoB'] div:nth-child(1)")
    this.postListingForFreeBtn= page.getByRole('button', { name: 'Post listing for free' });
    this.successListingPageProductClick = page.locator('img').nth(3);
    this.errorLbl = page.locator('.sc-6870bbef-3');
    this.errorToastLbl= page.locator("div[role='alert'] div:nth-child(2)");


  }
async sellitPage1Details(){
    await this.sellitBtn.click();
    await this.uploadRandomImage();
    await this.fillProductNameIfEmpty(); 
    await this.selectCategoryIfEmpty(); 
    await this.selectSubCategoryIfEmpty();
    await this.selectRandomProductCondition();
}
async clickNext(){
    await this.nextBtn.click();
}
async sellitPage2Details(){
    await this.productPrice();
    await this.locationTxt.fill('jaka', { timeout:5000 });
    
}
async locationDropdown(){
    await this.locationOptionList.click();
}
async postListing(){
    await this.postListingForFreeBtn.click();
    await this.successListingPageProductClick.click();
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
    await this.page.locator(randomOption).check(); 
}
async productPrice(){
    const randomNum = generateRandomNumber();
    await this.askingPriceNum.fill(randomNum.toString())
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
