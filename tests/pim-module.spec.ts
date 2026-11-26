import { test } from "../fixtures/common-fixture";
import PIMModuleData from "../data/pim-module-data.json";

test.describe("PIM Module Test for OranageHRM ", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToOrangeHRM();
  });
  test(
    "[PIM]-verify that the user can navigate to PIM page and add new employee details.",
    { tag: "@UI", annotation: { type: "Test Case Link", description: "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee" } },
    async ({ pimViewEmployeeListPage, pimAddEmployeePage }) => {
      await test.step("Navigate to PIM module list page for Add employee", async () => {
        await pimViewEmployeeListPage.navigateToPIMViewEmployeeListPage();
      });

      await test.step("New employeee details filled", async () => {
        await pimAddEmployeePage.addEmployee(PIMModuleData["first_name"], PIMModuleData["middle_name"], PIMModuleData["last_name"], "1234577555");
      });
    },
  );
});
