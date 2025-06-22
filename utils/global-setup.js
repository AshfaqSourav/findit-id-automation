const { chromium } = require('@playwright/test');
const { config } = require('../config/testConfig.js');
const fs = require('fs');
const path = require('path');
const { LoginPage } = require('../pages/LoginPage.js');

async function globalSetup() {
  const ENV = process.env.ENV || 'FI_QA';
  const BASE_URL = config[ENV];

  if (!BASE_URL) {
    console.error(`❌ Invalid ENV: ${ENV}. Please check testConfig.js`);
    process.exit(1);
  }

  console.log(`${ENV} -------------------------`);

  const browser = await chromium.launch({ headless: false });
  const usersToLogin = ['email1', 'email2'];

  for (const emailKey of usersToLogin) {
    const email = config.credentials[emailKey];
    const loginAuthPath = path.resolve(__dirname, `../LoginAuth_${emailKey}.json`);
    const lockFilePath = path.resolve(__dirname, `../locks/setup-${emailKey}.lock`);

    if (fs.existsSync(loginAuthPath) && fs.existsSync(lockFilePath)) {
      console.log(`✅ ${emailKey}: Login session already exists. Skipping.`);
      continue;
    }

    console.log(`🔐 Logging in as ${emailKey}: ${email}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Allow Cookies' }).click();
    await loginPage.loginEmail(email);
    await page.waitForTimeout(1000);
    await loginPage.loginEmailOtp(config.credentials.otp);

    // Confirm login worked (via localStorage user.email)
    await page.waitForFunction(() => {
      try {
        const root = JSON.parse(localStorage.getItem('persist:root') || '{}');
        const user = JSON.parse(root.user || '{}');
        return user?.user?.email;
      } catch {
        return false;
      }
    }, { timeout: 10000 });

    await context.storageState({ path: loginAuthPath });
    fs.mkdirSync(path.dirname(lockFilePath), { recursive: true });
    fs.writeFileSync(lockFilePath, 'done');
    await context.close();
  }

  await browser.close();
}

module.exports = globalSetup;
