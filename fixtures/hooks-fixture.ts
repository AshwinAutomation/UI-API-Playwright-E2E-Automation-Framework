import { test as baseTest } from "../fixtures/pom-fixture";

type hooksFixtureType = {
  navigateToUrl: any;
  logout: any;
};

export const test = baseTest.extend<hooksFixtureType>({
  navigateToUrl: async ({ loginPage }: { loginPage: any }, use: (loginPage: any) => Promise<void>) => {
    await loginPage.navigateToOrangeHRM();
    await use(loginPage);
  },
  logout: async ({ userPage }: { userPage: any }, use: (userPage: any) => Promise<void>) => {
    await use(userPage);
    await userPage.logout();
  },
});
