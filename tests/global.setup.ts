import { test } from "../fixtures/common-fixture";
import { expect } from "@playwright/test";

test("Global setup for Auto-login", async ({ page, loginPage,dashboardPage, commonUtils }) => {
  await loginPage.navigateToOrangeHRM();
  const decryptedUsername = commonUtils.decryptData(process.env.USER_NAME);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD);
  await loginPage.login(decryptedUsername, decryptedPassword);
  console.log(decryptedUsername + " " + decryptedPassword);
  await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
  await expect.soft(dashboardPage.dashboardTitleText).toHaveText("Dashboard");
  await page.context().storageState({ 
    path: "./playwright/.auth/auth.json" });
});
 