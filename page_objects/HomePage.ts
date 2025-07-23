import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class HomePage extends BaseTestClass {
  private loginButton: Locator;
  private navBar: Locator;
  private deleteButton: Locator;
  private logoutButton: Locator;
  private contactUsButton: Locator;
  private testCaseButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = this.page.locator("a[href='/login']");
    this.navBar = this.page.locator(".navbar-nav");
    this.deleteButton = this.page.locator("a[href*='/delete_account']");
    this.logoutButton = this.page.locator("a[href*='/logout']");
    this.contactUsButton = this.page.locator("a[href*='/contact_us']");
    this.testCaseButton = this.page.locator("header a[href='/test_cases']");
  }

  async goToLoginPage() {
    await this.loginButton.click();
  }

  async goToContactUsPage() {
    await this.contactUsButton.click();
  }

  async verifyUserIsLoggedIn(username: string) {
    const userLink = await this.navBar.locator("a").last();
    const isVisible = await userLink.isVisible();
    await expect(isVisible).toBeTruthy();
    const userName = await userLink.textContent();
    await expect(userName).toMatch("Logged in as " + username);
  }

  async deleteAccount() {
    await this.deleteButton.click();
  }

  async logoutUser() {
    await this.logoutButton.click();
  }

  async goToTestCasesPage() {
    await this.testCaseButton.click();
  }
}
