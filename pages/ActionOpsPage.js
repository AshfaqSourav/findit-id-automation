import { config  } from "../config/testConfig";
import { expect } from "@playwright/test"; 

export class ActionOpsPage {
    constructor(page) {
        this.page = page;
        this.deliveryStatusDropDown= page.getByRole('combobox');
        this.assigningDriverStatus= page.getByText('Assigning Driver', { exact: true });
        this.onGoingStatus= page.getByRole('option', { name: 'On Going' });
        this.pickedUpStatus= page.getByText('Picked Up', { exact: true });
        this.deliveredStatus= page.getByRole('option', { name: 'Delivered' });
        this.deliveryStatusChangedSuccessToast= page.getByText('Delivery status updated');
        this.paymentStatusDropDown= page.getByRole('combobox').filter({ hasText: 'Select status' });
        this.paymentStatusChangedSuccessToast= page.getByText('Payment status updated');
        this.emailLink = page.locator('section:has-text("Conversations")').locator(`span:text-is("${config.credentials.buyer}")`)
  
    }

async clickBuyerChatroom() {
        await expect(this.emailLink).toBeVisible();
        await this.emailLink.click();
        console.log("Buyer chatroom clicked successfully.");
        await this.page.waitForTimeout(3000); 
}
async changeDeliveryStausToAssigningDriver() {
        await this.deliveryStatusDropDown.click();
        await this.assigningDriverStatus.click();
        await expect(this.deliveryStatusChangedSuccessToast).toBeVisible({ timeout: 10000 });
        console.log("Status changed to 'Assigning Driver' successfully.");
        await this.page.waitForTimeout(3000); 
}
async changeDeliveryStausToOnGoing() {
        await this.deliveryStatusDropDown.click();
        await this.onGoingStatus.click();
        await expect(this.deliveryStatusChangedSuccessToast).toBeVisible({ timeout: 10000 });
        console.log("Status changed to 'On Going' successfully.");
        await this.page.waitForTimeout(3000); 
}
async changeDeliveryStausToPickedUp() {
        await this.deliveryStatusDropDown.click();
        await this.pickedUpStatus.click();
        await expect(this.deliveryStatusChangedSuccessToast).toBeVisible({ timeout: 10000 });
        console.log("Status changed to 'Picked Up' successfully.");
        await this.page.waitForTimeout(3000); 
}
async changeDeliveryStausToDelivered() {
        await this.deliveryStatusDropDown.click();
        await this.deliveredStatus.click();
        await expect(this.deliveryStatusChangedSuccessToast).toBeVisible({ timeout: 10000 });
        console.log("Status changed to 'Delivered' successfully.");
        await this.page.waitForTimeout(3000); 
}
async changePaymentStatusToPaid() {
        await this.paymentStatusDropDown.click();
        await this.page.getByRole('option', { name: 'Paid' }).click();
        await expect(this.paymentStatusChangedSuccessToast).toBeVisible({ timeout: 10000 });
        console.log("Payment status changed to 'Paid' successfully.");
        await this.page.waitForTimeout(3000);
}
}