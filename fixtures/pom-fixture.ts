import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type pomFixturesType = {
  loginPage: LoginPage;
};

  export const test = baseTest.extend<pomFixturesType>({
  //key : loginPage
  loginPage: async ({ page }, use) => {
    //vaue : LoginPag
    const loginPageObject = new LoginPage(page);
    await use(loginPageObject);
  },
});
