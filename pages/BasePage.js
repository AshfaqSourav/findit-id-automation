export async function clickUntilVisible(locator1,locator2,page,maxAttempts){
    for (let i = 0; i < maxAttempts; i++) {
    await locator1.click();
    const isVisible = await locator2.isVisible().catch(() => false);
    if (isVisible) break;
    await page.waitForTimeout(500);
  }
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
