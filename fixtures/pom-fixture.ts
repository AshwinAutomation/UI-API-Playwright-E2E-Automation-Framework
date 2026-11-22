import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import { UserPage } from "../pages/UserPage";
import { PIMViewEmployeeListPage } from "../pages/PIMViewEmployeeListPage";
import { PIMAddEmployeePage } from "../pages/PIMAddEmployeePage";

type pomFixturesType = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userPage: UserPage;
  pimViewEmployeeListPage: PIMViewEmployeeListPage;
  pimAddEmployeePage: PIMAddEmployeePage;
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
  pimViewEmployeeListPage: async ({ page }, use) => {
    await use(new PIMViewEmployeeListPage(page));
  },
  pimAddEmployeePage: async ({ page }, use) => {
    await use(new PIMAddEmployeePage(page));
  }
});
