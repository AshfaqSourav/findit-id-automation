export async function clickUntilVisible(locator1,locator2,page,maxAttempts){
    for (let i = 0; i < maxAttempts; i++) {
    await locator1.click();
    const isVisible = await locator2.isVisible().catch(() => false);
    if (isVisible) break;
    await page.waitForTimeout(500); // small wait between tries
  }
}