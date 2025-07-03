const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
export async function clickUntilVisible(locator1,locator2,page,maxAttempts){
    for (let i = 0; i < maxAttempts; i++) {
    await locator1.click();
    const isVisible = await locator2.isVisible().catch(() => false);
    if (isVisible) break;
    await page.waitForTimeout(500);
  }
}
export async function clickUntilVisible2(clickLocator, targetLocator, page, maxAttempts = 5, delay = 500) {
  for (let i = 0; i < maxAttempts; i++) {
    const alreadyVisible = await targetLocator.isVisible().catch(() => false);
    if (alreadyVisible) return true;

    // Wait until clickable element is attached & visible
    await clickLocator.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    
    // ⚠️ force click avoids overlay errors but use only when safe
    await clickLocator.click({ force: true }).catch(() => {});
    await page.waitForTimeout(delay);

    const visible = await targetLocator.isVisible().catch(() => false);
    if (visible) return true;
  }

  throw new Error(`❌ Failed to make target locator visible after ${maxAttempts} clicks`);
}

//  await this.assert({locator: this.allowCookiesBtn,state: 'visible'});
export async function assert(options = {}) {
  const {
    locator,
    selector,
    state,
    toHaveText,
    toContainText,
    toHaveURL,
    count,
    toHaveValue,
    toHaveAttribute
  } = options;

  const target = locator || (selector && this.page.locator(selector));
  if (!target && !toHaveURL) {
    throw new Error('You must provide either a locator or a selector');
  }

  if (target && state) {
    await expect(target).toBeVisible({ timeout: 5000 }); // or other state check
  }

  if (target && toHaveText) {
    await expect(target).toHaveText(toHaveText);
  }

  if (target && toContainText) {
    await expect(target).toContainText(toContainText);
  }

  if (target && typeof count === 'number') {
    await expect(target).toHaveCount(count);
  }

  if (target && toHaveValue) {
    await expect(target).toHaveValue(toHaveValue);
  }

  if (target && toHaveAttribute) {
    const [attr, value] = Object.entries(toHaveAttribute)[0];
    await expect(target).toHaveAttribute(attr, value);
  }

  if (toHaveURL) {
    await expect(this.page).toHaveURL(toHaveURL);
  }
}

export async function captureAndSaveText(locator, fileName = null) {
  await expect(locator).toBeVisible({ timeout: 10000 });
  const text = await locator.innerText();

  if (fileName) {
    const baseDir = path.resolve(__dirname, '../storedValue'); // set your desired folder
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    const filePath = path.join(baseDir, fileName); // always writes to storeValue folder
    fs.writeFileSync(filePath, text.trim(), 'utf-8');
  }

  return text.trim();
}

export async function compareTextFiles(file1, file2) {
  try {
    const baseDir = path.resolve(__dirname, '../storedValue'); // 👈 Default folder

    const filePath1 = path.join(baseDir, file1);
    const filePath2 = path.join(baseDir, file2);

    const text1 = fs.readFileSync(filePath1, 'utf-8').trim();
    const text2 = fs.readFileSync(filePath2, 'utf-8').trim();

    if (text1 === text2) {
      console.log('✅ Matched');
      return true;
    } else {
      console.warn('❌ Do NOT match.');
      console.warn(`${file1}: ${text1}`);
      console.warn(`${file2}: ${text2}`);
      return false;
    }
  } catch (error) {
    console.error('⚠️ Error reading files:', error.message);
    return false;
  }
}

export async function captureAndSavePrice(locator, fileName) {
  await expect(locator).toBeVisible({ timeout: 10000 });
  const text = await locator.innerText();
  const match = text.match(/[\d.,]+/);

  if (match && fileName) {
    const baseDir = path.resolve(__dirname, '../storedValue'); // default storage folder
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    const filePath = path.join(baseDir, fileName);
    fs.writeFileSync(filePath, match[0].trim(), 'utf-8');
  }

  return match ? match[0].trim() : null;
}
