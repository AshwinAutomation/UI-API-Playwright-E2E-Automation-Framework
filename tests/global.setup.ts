import { meta } from "reporting-labs";
import { test } from "../fixtures/common-fixture";
import { expect } from "@playwright/test";

test("Global setup for Auto-login", async ({ page, loginPage,dashboardPage, commonUtils }) => {
  meta({priority:'P0',severity:'critical',story: '101',feature:'login for Auth session storage'})
  await loginPage.navigateToOrangeHRM();
  const decryptedUsername = commonUtils.decryptData(process.env.USER_NAME);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD);
  await loginPage.login(decryptedUsername, decryptedPassword);
  await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
  await expect.soft(dashboardPage.dashboardTitleText).toHaveText("Dashboard");
  await page.context().storageState({ 
    path: "./playwright/.auth/auth.json" });
});
 