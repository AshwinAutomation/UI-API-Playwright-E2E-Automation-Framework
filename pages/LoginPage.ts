import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsErrorPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.invalidCredentialsErrorPopup = page.locator(`p:has-text("Invalid credentials")`);
  }

  /* Navigate to the OrangeHRM login page */
  async navigateToOrangeHRM() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
  }

  /* Perform login with provided username and password
  @param username - The username to be used for login
  @param password - The password to be used for login
  */
  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
