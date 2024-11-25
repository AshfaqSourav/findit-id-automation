import { config  } from "../config/testConfig";
import { expect } from "@playwright/test"; 
import { clickRandomRating} from '../utils/randomValue';

export class BuyNowSelfPickup {
    constructor(page) {
      this.page = page;
      this.productTitle = page.locator('.product-title'); // Example selector for product title
      this.buyNowBtn= page.getByRole('button', { name: 'Buy it now' })
      this.yesConfirmBtn= page.getByRole('button', { name: 'Yes Confirm' })
      this.dealBtn= page.locator('div').filter({ hasText: 'InboxDeals' }).locator('div').nth(4)
      this.selfPickUpOpt= page.getByRole('button', { name: 'No, I will self pickup' })
      this.yesProceedBtn= page.getByRole('button', { name: 'Yes! Proceed' })
      this.payNowBtn= page.getByRole('button', { name: 'Pay now' })
      this.bankPaymentOpt= page.getByRole('button', { name: 'Bank Payment' })
      this.paymentDoneBtn= page.getByRole('button', { name: 'Payment Done' })
      this.yesPaymentDone= page.getByRole('button', { name: 'Yes! Payment Done' })
      this.emailLink = page.getByText(config.credentials.email4);
      this.statusDropdown = page.getByRole('combobox').filter({ hasText: 'Select status' });
      this.paidOption = page.getByRole('option', { name: 'Paid' });
      this.pickupDoneBtn= page.getByRole('button', { name: 'Pickup Done' });
      this.reviewToSellerBtn= page.getByRole('button', { name: 'Write a review to seller' })
      this.reviewTxt= page.locator('#reviewText');
      this.sendReviewBtn= page.getByRole('button', { name: 'Send Review' });
      this.toolTipDismissBtn= page.getByRole('button', { name: 'Dismiss' });
      this.paymentPendingCM= page.getByText('Your payment is pending, awaiting your a...')
      this.paymentPendingTag= page.locator('.m-0').first()
      this.paymentPendingStage= page.locator('.text-xsm').first()
      this.awaitingForPaymentApprovalCM= page.getByText('Awaiting for payment approval', { exact: true }).first()
      this.completedPaymentCM= page.getByText('You completed the payment')
      this.paidStage= page.locator('span').filter({ hasText: 'Paid' })
      this.reviewStage= page.getByText('Review', { exact: true }).first()
      this.submittedReviewCM= page.getByText('You submitted a review')  
    }
    async verifyProductDetailsPageLoaded() {
      await expect(this.productTitle).toBeVisible();
      console.log("Product details page loaded successfully");
    }
    async buyNowFlow(){
      await this.buyNowBtn.click();
      await this.yesConfirmBtn.click();
      await this.page.waitForTimeout(2000);
      await this.toolTipDismissBtn.click();
      await this.page.waitForTimeout(2000);
      await expect(this.paymentPendingCM).toBeVisible();
      await expect(this.paymentPendingTag).toBeVisible();
      await expect(this.paymentPendingStage).toBeVisible();
      await this.selfPickUpOpt.click();
      await this.yesProceedBtn.click();
      await this.page.waitForTimeout(3000);
      await this.payNowBtn.click();
      await this.bankPaymentOpt.click()
      await this.paymentDoneBtn.click()
      await this.yesPaymentDone.click()
      await this.page.waitForTimeout(2000);
      await expect(this.awaitingForPaymentApprovalCM).toBeVisible();
    }

    async navigateToEmailAndSelectStatus() {
      await this.emailLink.click();
      await this.statusDropdown.click();
      await this.paidOption.click();
      await this.page.waitForTimeout(3000);
      console.log("Status set to 'Paid'");
    }

    async verifyStatusIsPaid() {
      const selectedStatus = await this.statusDropdown.textContent();
      expect(selectedStatus).toContain('Paid');
      console.log("Verified that the status is 'Paid'");
    }
    async pickupDone(){
      await this.page.waitForTimeout(2000);
      await expect(this.completedPaymentCM).toBeVisible();
      await expect(this.paidStage).toBeVisible()
      await this.pickupDoneBtn.click()
      await this.page.waitForTimeout(2000);
      await expect(this.reviewStage).toBeVisible()
      await this.page.waitForTimeout(3000);
    }
    async reviewToSeller(){
      await this.reviewToSellerBtn.click()
      await clickRandomRating(this.page);  
      console.log("Random rating clicked.");
      await this.reviewTxt.fill('good seller');
      await this.sendReviewBtn.click();
      await this.page.waitForTimeout(2000);
      await expect(this.submittedReviewCM).toBeVisible();
      await this.page.waitForTimeout(2000);
    }
  }
  