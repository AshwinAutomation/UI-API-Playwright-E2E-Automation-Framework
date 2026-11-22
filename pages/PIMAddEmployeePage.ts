import { Page, Locator } from "@playwright/test";

export class PIMAddEmployeePage {
  readonly page: Page;
  readonly addEmployeeLink: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly emppoyeeIDInput: Locator;
  readonly newEmployeeeNameHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeLink = page.getByRole("link", { name: "Add Employee" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.middleNameInput = page.getByRole("textbox", { name: "Middle Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.emppoyeeIDInput = page.locator("//label[text()='Employee Id']//following::input[1]");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.newEmployeeeNameHeading = page.locator(`.orangehrm-edit-employee-name h6`);
  }

  async addEmployee(firstName: string, middleName: string, lastName: string, employeeID: string) {
    await this.addEmployeeLink.click();
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.emppoyeeIDInput.clear();
    await this.emppoyeeIDInput.fill(employeeID);
    await this.saveButton.click();
  }


}
