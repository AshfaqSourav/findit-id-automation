export class BuyNowSelfPickup {
    constructor(page) {
      this.page = page;
      this.productTitle = page.locator('.product-title'); // Example selector for product title
      this.buyNowBtn= page.getByRole('button', { name: 'Buy it now' })
      this.yesConfirmBtn= page.getByRole('button', { name: 'Yes Confirm' })
    }
  
    async verifyProductDetailsPageLoaded() {
      await expect(this.productTitle).toBeVisible();
      console.log("Product details page loaded successfully");
    }
    async buyNowFlow(){
      await this.buyNowBtn.click();
      await this.yesConfirmBtn.click();
    }
  }
  