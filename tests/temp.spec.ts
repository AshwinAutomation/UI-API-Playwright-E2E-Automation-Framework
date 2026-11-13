import {test} from "../fixtures/pom-fixture";
import { LoginPage } from "../pages/LoginPage";


test.describe("Login Tests", () => {
  test("Successful login with valid credentials", async ({ loginPage }) => {
    await loginPage.navigateToOrangeHRM();
    await loginPage.login("Admin", "admin123");
  });
});