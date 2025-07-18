import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  private signUpForm: Locator;
  private signInForm: Locator;
  private usernameRegisterInput: Locator;
  private emailRegisterInput: Locator;
  private newUserSignUpText: Locator;
  private signUpButton: Locator;
  private loginToYourAccountText: Locator;
  private emailLoginInput: Locator;
  private passwordLoginInput: Locator;
  private signInButton: Locator;

  private errorMessage: Locator;

  constructor(private page: Page) {
    // Sign up form locators
    this.signUpForm = this.page.locator(".signup-form");
    this.usernameRegisterInput = this.signUpForm.getByPlaceholder("Name");
    this.emailRegisterInput = this.signUpForm.getByPlaceholder("Email Address");
    this.newUserSignUpText = this.signUpForm.locator("h2");
    this.signUpButton = this.signUpForm.getByRole("button");

    // Sign in form locators
    this.signInForm = this.page.locator(".login-form");
    this.loginToYourAccountText = this.signInForm.locator("h2");
    this.emailLoginInput = this.signInForm.locator("input[type*='email']");
    this.passwordLoginInput = this.signInForm.locator("input[type='password']");
    this.signInButton = this.signInForm.getByRole("button", { name: "Login" });

    this.errorMessage = this.page.locator(".login-form p");
  }

  async verifyNewUserSignUpTextIsVisible() {
    const isVisible = await this.newUserSignUpText.isVisible();
    expect(isVisible).toBeTruthy();
  }

  async verifyLoginToYourAccountTextIsVisible() {
    const isVisible = await this.loginToYourAccountText.isVisible();
    expect(isVisible).toBeTruthy();
  }

  async signIn(email: string, password: string) {
    await this.emailLoginInput.fill(email);
    await this.passwordLoginInput.fill(password);
    await this.signInButton.click();
  }

  async signUp(email: string, name: string) {
    await this.emailRegisterInput.fill(email);
    await this.usernameRegisterInput.fill(name);
    await this.signUpButton.click();
  }

  async verifyErrorMessageIsVisible(message: string) {
    const isVisible = await this.errorMessage.isVisible();
    expect(isVisible).toBeTruthy();
    const errorText = await this.errorMessage.textContent();
    expect(errorText).toContain(message);
  }
}
