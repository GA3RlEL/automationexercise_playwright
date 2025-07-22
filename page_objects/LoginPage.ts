import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class LoginPage extends BaseTestClass {
  private signUpForm: Locator;
  private signInForm: Locator;
  private usernameRegisterInput: Locator;
  private emailRegisterInput: Locator;
  private signUpButton: Locator;
  private emailLoginInput: Locator;
  private passwordLoginInput: Locator;
  private signInButton: Locator;

  constructor(page: Page) {
    super(page);
    // Sign up form locators
    this.signUpForm = this.page.locator(".signup-form");
    this.usernameRegisterInput = this.signUpForm.getByPlaceholder("Name");
    this.emailRegisterInput = this.signUpForm.getByPlaceholder("Email Address");
    this.signUpButton = this.signUpForm.getByRole("button");

    // Sign in form locators
    this.signInForm = this.page.locator(".login-form");
    this.emailLoginInput = this.signInForm.locator("input[type*='email']");
    this.passwordLoginInput = this.signInForm.locator("input[type='password']");
    this.signInButton = this.signInForm.getByRole("button", { name: "Login" });
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
}
