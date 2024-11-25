import { test } from "../../../lib/BaseTest.js";

test.describe("Login to Findit Ops Panel", () => {
    test("Successful login", async ({page ,loginOpsPage }) => {
    await loginOpsPage.visit();
    await page.waitForTimeout(3000);
    await loginOpsPage.login()
    await page.waitForTimeout(3000);
  })
})