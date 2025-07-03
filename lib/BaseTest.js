import { test as baseTest } from "@playwright/test";
import { BuyItNow } from "../pages/BuyItNowPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NewUserLoginPage } from "../pages/newUserLoginPage.js";
import { AddProductPage } from "../pages/AddProductPage.js";
import { LoginOpsPage } from "../pages/LoginOpsPage.js";
import { ActionOpsPage } from "../pages/ActionOpsPage.js";


export const test = baseTest.extend({
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  loginOpsPage: async ({ page, context  }, use) => {
    await use(new LoginOpsPage(page, context));
  },
  newUserLoginPage: async ({ page, context  }, use) => {
    await use(new NewUserLoginPage(page, context));
  },
  addProductPage: async ({ page, context }, use) => {
    await use(new AddProductPage(page, context));
  },
  buyItNow: async ({ page, context }, use) => {
    await use(new BuyItNow(page ,context));
  },
    actionOpsPage: async ({ page, context }, use) => {
    await use(new ActionOpsPage(page ,context));
  },
});
