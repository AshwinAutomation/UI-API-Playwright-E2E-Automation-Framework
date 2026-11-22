import { test } from "../fixtures/common-fixture";
import PIMModuleData from "../data/pim-module-data.json"

test.describe("PIM Module Test for OranageHRM ", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToOrangeHRM();
  });
  test("[PIM]-verify that the user can navigate to PIM page and add new employee details.", async ({ pimViewEmployeeListPage,pimAddEmployeePage}) => {
    await pimViewEmployeeListPage.navigateToPIMViewEmployeeListPage();
    await pimAddEmployeePage.addEmployee(PIMModuleData["first_name"], PIMModuleData["middle_name"], PIMModuleData['last_name'], "1234577");
  });
});
