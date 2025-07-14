import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  private signUpForm: Locator;
  private usernameRegisterInput: Locator;
  private emailRegisterInput: Locator;
  private newUserSignUpText: Locator;
  private signUpButton: Locator;

  constructor(private page: Page) {
    // Sign up form locators
    this.signUpForm = this.page.locator(".signup-form");
    this.usernameRegisterInput = this.signUpForm.getByPlaceholder("Name");
    this.emailRegisterInput = this.signUpForm.getByPlaceholder("Email Address");
    this.newUserSignUpText = this.signUpForm.locator("h2");
    this.signUpButton = this.signUpForm.getByRole("button");

    // Sign in form locators
  }

  async verifyNewUserSignUpTextIsVisible() {
    const isVisible = await this.newUserSignUpText.isVisible();
    expect(isVisible).toBeTruthy();
  }

  async signUp(email: string, name: string) {
    await this.emailRegisterInput.fill(email);
    await this.usernameRegisterInput.fill(name);
    await this.signUpButton.click();
  }
}
