import { test } from "../fixtures/common-fixture";
import loginModuleData from "../data/login-module-data.json";
import { expect } from "@playwright/test";
test.describe("Login Test for OranageHRM ", () => {
  test.use({ storageState: {
    cookies: [],
    origins: []
  } });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToOrangeHRM();
  });

  // test.afterEach(async ({ userPage }) => {
  //   await userPage.logout();
  // });

    test("[Login]-verify that the user can not login with invalid username.", async ({ page, loginPage, commonUtils }) => {
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD);
    await loginPage.login(loginModuleData["wrong-username"], decryptedPassword);
    await expect(loginPage.invalidCredentialsErrorPopup).toBeVisible();
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText("Invalid credentials");
  });

  test("[Login]-verify that the user can not login with invalid Password.", async ({ page, loginPage, commonUtils }) => {
    const decryptedUsername = commonUtils.decryptData(process.env.USER_NAME);
    await loginPage.login(decryptedUsername, loginModuleData["wrong-password"]);
    await expect(loginPage.invalidCredentialsErrorPopup).toBeVisible();
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText("Invalid credentials");
  });

    test("[Login]-verify that the user can not login with invalid username and password.", async ({ page, loginPage, commonUtils }) => {
    const decryptedUsername = commonUtils.decryptData(process.env.USER_NAME);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD);
    await loginPage.login(loginModuleData["wrong-username"], loginModuleData["wrong-password"]);
    await expect(loginPage.invalidCredentialsErrorPopup).toBeVisible();
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText("Invalid credentials");
  });

});
