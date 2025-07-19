import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private loginButton: Locator;
  private navBar: Locator;
  private deleteButton: Locator;
  private logoutButton: Locator;

  constructor(private page: Page) {
    this.loginButton = this.page.locator("a[href='/login']");
    this.navBar = this.page.locator(".navbar-nav");
    this.deleteButton = this.page.locator("a[href*='/delete_account']");
    this.logoutButton = this.page.locator("a[href*='/logout']");
  }

  async isAt() {
    const url = await this.page.url();
    await expect(url).toBe("https://automationexercise.com/");
  }

  async goToLoginPage() {
    await this.loginButton.click();
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
}
