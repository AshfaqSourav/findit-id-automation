export class BuyNowSelfPickup {
    constructor(page) {
      this.page = page;
      this.productTitle = page.locator('.product-title'); // Example selector for product title
      this.buyNowBtn= page.getByRole('button', { name: 'Buy it now' })
      this.yesConfirmBtn= page.getByRole('button', { name: 'Yes Confirm' })
      this.dealBtn= page.locator('div').filter({ hasText: 'InboxDeals' }).locator('div').nth(4)
      this.selfPickUpOpt= page.getByRole('button', { name: 'No, I will self pickup' })
      this.yesProceedBtn= page.getByRole('button', { name: 'Pay now' })
      this.bankPaymentOpt= page.getByRole('button', { name: 'Bank Payment' })
      this.paymentDoneBtn= page.getByRole('button', { name: 'Payment Done' })
      this.yesPaymentDone= page.getByRole('button', { name: 'Yes! Payment Done' })
    }
  
    async verifyProductDetailsPageLoaded() {
      await expect(this.productTitle).toBeVisible();
      console.log("Product details page loaded successfully");
    }
    async buyNowFlow(){
      await this.buyNowBtn.click();
      await this.yesConfirmBtn.click();
      await this.selfPickUpOpt.click();
      await this.yesProceedBtn.click();
      await this.bankPaymentOpt.click()
      await this.paymentDoneBtn.click()
      await this.yesPaymentDone.click()
    
    }
  }
  