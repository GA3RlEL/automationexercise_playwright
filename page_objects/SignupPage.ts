import { expect, Locator, Page } from "@playwright/test";
import { RegisterUser } from "../types/register-user";
import { BaseTestClass } from "./BaseTestClass";

export class SignupPage extends BaseTestClass {
  private titleRadio: Locator;
  private passwordInput: Locator;
  private newsletterCheckbox: Locator;
  private specialOffersCheckbox: Locator;
  private daySelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private address1Input: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipcodeInput: Locator;
  private mobileNumberInput: Locator;
  private createAccountButton: Locator;
  private enterAccountInformationText: Locator;

  constructor(page: Page) {
    super(page);
    this.titleRadio = this.page.locator(".clearfix");
    this.passwordInput = this.page.locator("#password");
    this.daySelect = this.page.locator("#days");
    this.monthSelect = this.page.locator("#months");
    this.yearSelect = this.page.locator("#years");
    this.newsletterCheckbox = this.page.locator("#newsletter");
    this.specialOffersCheckbox = this.page.locator("#optin");
    this.firstNameInput = this.page.locator("#first_name");
    this.lastNameInput = this.page.locator("#last_name");
    this.companyInput = this.page.locator("#company");
    this.address1Input = this.page.locator("#address1");
    this.address2Input = this.page.locator("#address2");
    this.countrySelect = this.page.locator("#country");
    this.stateInput = this.page.locator("#state");
    this.cityInput = this.page.locator("#city");
    this.zipcodeInput = this.page.locator("#zipcode");
    this.mobileNumberInput = this.page.locator("#mobile_number");
    this.createAccountButton = this.page.getByRole("button", {
      name: "Create Account",
    });
    this.enterAccountInformationText = this.page.getByRole("heading", {
      name: "ENTER ACCOUNT INFORMATION",
    });
  }

  async fillSignUpForm(registerUser: RegisterUser) {
    // Fill in the title
    await this.titleRadio.getByText(registerUser.title).click();

    // Fill in the password
    await this.passwordInput.fill(registerUser.password);

    // Select the day, month, and year
    await this.daySelect.selectOption(registerUser.day);
    await this.monthSelect.selectOption(registerUser.month);
    await this.yearSelect.selectOption(registerUser.year);

    // Check the newsletter and special offers checkboxes
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    // Fill in personal details
    await this.firstNameInput.fill(registerUser.firstName);
    await this.lastNameInput.fill(registerUser.lastName);
    if (registerUser.company) {
      await this.companyInput.fill(registerUser.company);
    }
    await this.address1Input.fill(registerUser.address1);
    if (registerUser.address2) {
      await this.address2Input.fill(registerUser.address2);

      // Select country
      await this.countrySelect.selectOption(registerUser.country);

      // Fill in state, city, zipcode, and mobile number
      await this.stateInput.fill(registerUser.state);
      await this.cityInput.fill(registerUser.city);
      await this.zipcodeInput.fill(registerUser.zipCode);
      await this.mobileNumberInput.fill(registerUser.mobileNumber);

      // Click the create account button
      await this.createAccountButton.click();
    }
  }
}
