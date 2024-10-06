export class ProductDetailsPage {
    constructor(page) {
      this.page = page;
      this.productTitle = page.locator('.product-title'); // Example selector for product title
    }
  
    async verifyProductDetailsPageLoaded() {
      await expect(this.productTitle).toBeVisible();
      console.log("Product details page loaded successfully");
    }
  }
  