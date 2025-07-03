import { test } from "../../../lib/BaseTest.js";

test.describe("Login to Findit Ops/medusa Panel", () => {
    test("@regression Successful login", async ({ loginOpsPage }) => {
    await loginOpsPage.visit();
    await loginOpsPage.login();
  })
})