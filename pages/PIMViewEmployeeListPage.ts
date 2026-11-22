import { Page, Locator } from "@playwright/test";

export class PIMViewEmployeeListPage {
  readonly page: Page;
  readonly PimLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.PimLink = page.getByRole("link", { name: "PIM" });
  }

  async navigateToPIMViewEmployeeListPage() {
    await this.PimLink.click();
  }
}
