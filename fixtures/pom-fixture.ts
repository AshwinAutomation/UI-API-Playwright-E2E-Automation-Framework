import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import { UserPage } from "../pages/UserPage";

type pomFixturesType = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userPage: UserPage;
};

export const test = baseTest.extend<pomFixturesType>({
  //key : loginPage
  loginPage: async ({ page }, use) => {
    //vaue : LoginPag
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  },
});
