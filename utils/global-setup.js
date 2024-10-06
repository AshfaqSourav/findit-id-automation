const { chromium } = require('@playwright/test');
const { config } = require('../config/testConfig.js'); 
const fs = require('fs');
const path = require('path'); 
const lockFilePath = path.resolve(__dirname, './setup-completed.lock');

async function globalSetup(emailKey) {
    console.log('Input emailKey:', emailKey);
   // Check if the lock file exists
   if (fs.existsSync(lockFilePath)) {
    console.log('Global setup already completed. Skipping...');
    return;
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://base99.findit.id/');
    // await page.timeout(3000);
    await page.getByRole('button', { name: 'Allow Cookies' }).click();
  
    // Login steps
    await page.getByText('Login').nth(3).click();
    await page.getByRole('button', { name: 'Continue with Email' }).click();
    await page.locator('#email').click();
    // await page.locator('#email').fill('ashfaq.ahmed@findit.id');
    // await page.locator('#email').fill(config.credentials.email3);
    const email = config.credentials[emailKey];
    console.log('Email:', email);

    if (!email) {
        throw new Error(`Email key "${emailKey}" not found in config.`);
    }

    await page.locator('#email').fill(email);

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000); 

    // OTP inputs
    await page.locator("div[class='sc-b7605178-0 bjuisZ'] input:nth-child(1)").fill('7');
    await page.locator('input:nth-child(2)').fill('2');
    await page.locator("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(3)").fill('7');
    await page.locator('input:nth-child(4)').fill('2');
    await page.locator('input:nth-child(5)').fill('7');
    await page.locator('input:nth-child(6)').fill('2');
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.waitForTimeout(5000); 
    

    // Ensure login was successful
    await page.waitForSelector('.sc-fad81cfc-2 > .sc-12f5973e-0 > .icon > path', { timeout: 10000 });

    // Save storage state to use for authenticated sessions
    await page.context().storageState({ path: './LoginAuth.json' });
    
    await browser.close();
    fs.writeFileSync(lockFilePath, 'Global setup completed');
}

module.exports = globalSetup;