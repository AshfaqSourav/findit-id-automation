
import { test } from "../../../lib/BaseTest.js";
import { config  } from "../../../config/testConfig.js";
import { LoginOpsPage } from "../../../pages/LoginOpsPage.js";



test.describe("Login to Findit Ops Panel", () => {
    test("Successful login", async ({page ,loginOpsPage }) => {
    await loginOpsPage.visit();
    await loginOpsPage.login()
    await page.waitForTimeout(3000);
  })
})