const { chromium } = require('@playwright/test');
const { config } = require('../config/testConfig.js');
const fs = require('fs');
const path = require('path');
const lockFilePath = path.resolve(__dirname, './setup-completed.lock');
const loginAuthPath = path.resolve(__dirname, '../LoginAuth.json');

async function globalSetup(emailKey) {
    console.log('Input emailKey:', emailKey);

    let isLoginAuthEmpty ;
    if (!fs.existsSync(loginAuthPath)) {
        console.log('LoginAuth.json not found. Proceeding with global setup...');
        isLoginAuthEmpty = true;
    } else {
        const loginAuthData = fs.readFileSync(loginAuthPath, 'utf-8');
        if (loginAuthData.trim() === '{}' || loginAuthData.trim() === '') {
            console.log('LoginAuth.json is empty. Proceeding with global setup...');
            isLoginAuthEmpty = true;
        }
    }

    // If LoginAuth.json is empty, delete the lock file to force setup to run
    if (isLoginAuthEmpty && fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
        console.log('Deleted setup-completed.lock as LoginAuth.json was empty.');
    }
    // Check if the lock file exists
    if (!isLoginAuthEmpty && fs.existsSync(lockFilePath)) {
        console.log('Global setup already completed. Skipping...');
        return;
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await page.getByRole('button', { name: 'Allow Cookies' }).click();

    // Login steps
    await page.getByText('Login').nth(3).click();
    await page.getByRole('button', { name: 'Continue with Email' }).click();
    await page.locator('#email').click();
    const email = config.credentials[emailKey];
    console.log('Email:', email);

    if (!email) {
        throw new Error(`Email key "${emailKey}" not found in config.`);
    }

    await page.locator('#email').fill(email);

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000);

    // OTP inputs
    await page.locator("(//input[@placeholder='-'])[1]").fill('7');
    await page.locator('input:nth-child(2)').fill('2');
    // this.otp3Txt = page.locator('input.sc-351d33f8-1.dUdBjV').nth(2);

    await page.locator('input.sc-351d33f8-1.dUdBjV').nth(2).fill('7');
    await page.locator('input:nth-child(4)').fill('2');
    await page.locator('input:nth-child(5)').fill('7');
    await page.locator('input:nth-child(6)').fill('2');
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.waitForTimeout(5000);

    // Ensure login was successful
    // await page.waitForSelector('.sc-fad81cfc-2 > .sc-12f5973e-0 > .icon > path', { timeout: 10000 });
        await page.waitForSelector('.sc-93b4d862-2', { timeout: 10000 });


    // Check and rewrite URL if needed
    const currentUrl = page.url();
    const expectedUrl = 'https://base99.findit.id';
    if (!currentUrl.startsWith(expectedUrl)) {
        console.log(`URL mismatch detected. Current URL: ${currentUrl}`);
        console.log(`Navigating to expected URL: ${expectedUrl}`);
        await page.goto(expectedUrl);
    }

    // Save storage state to use for authenticated sessions
    await page.context().storageState({ path: './LoginAuth.json' });

    await browser.close();
    fs.writeFileSync(lockFilePath, 'Global setup completed');
}

module.exports = globalSetup;
