import { test as baseTest } from "@playwright/test";
// import { EngagementPage } from "../pages/EngagementPage.js";
// import { TemplatesPage } from "../pages/TemplatesPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NewUserLoginPage } from "../pages/newUserLoginPage.js";
import { AddProductPage } from "../pages/AddProductPage.js";


export const test = baseTest.extend({
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  newUserLoginPage: async ({ page, context }, use) => {
    await use(new NewUserLoginPage(page, context));
  },
  addProductPage: async ({ page, context }, use) => {
    await use(new AddProductPage(page, context));
  },
  productDetailsPage: async ({ page, context }, use) => {
    await use(new ProductDetailsPage(page, context));
  },
  // addTemplatePage: async ({ page, context }, use) => {
  //   await use(new TemplatesPage(page, context));
  // },
});
