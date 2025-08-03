import { expect, Locator, Page } from "@playwright/test";

export class BaseTestClass {
  private subscriptionInptut: Locator;
  private subscriptionButton: Locator;
  private loginButton: Locator;
  private navBar: Locator;
  private logoutButton: Locator;
  private contactUsButton: Locator;
  private testCaseButton: Locator;
  private productsButton: Locator;
  private cartButton: Locator;
  private continueShoppingButton: Locator;
  private viewCartModalButton: Locator;
  private deleteButton: Locator;

  constructor(protected page: Page) {
    this.subscriptionInptut = this.page.locator("#susbscribe_email");
    this.subscriptionButton = this.page.locator("#subscribe");
    this.loginButton = this.page.locator("a[href='/login']").first();
    this.navBar = this.page.locator(".navbar-nav");
    this.logoutButton = this.page.locator("a[href*='/logout']");
    this.contactUsButton = this.page.locator("a[href*='/contact_us']");
    this.testCaseButton = this.page.locator("header a[href='/test_cases']");
    this.productsButton = this.page.locator("a[href*='/products']");
    this.cartButton = this.page.locator("header a[href*='/view_cart']");
    this.continueShoppingButton = this.page.locator(".btn-success");
    this.viewCartModalButton = this.page.locator(
      ".modal-content a[href='/view_cart']"
    );
    this.deleteButton = this.page.locator("a[href*='/delete_account']");
  }

  async verifyTextIsVisible(text: string) {
    const locator = this.page.getByText(text, { exact: true }).first();
    const isVisible = await locator.isVisible();
    expect(isVisible).toBeTruthy();
  }

  async isAt(expectedUrl: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(expectedUrl);
  }

  async proceedSubscription(email: string) {
    await this.subscriptionInptut.fill(email);
    await this.subscriptionButton.click();
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

  async logoutUser() {
    await this.logoutButton.click();
  }

  async goToTestCasesPage() {
    await this.testCaseButton.click();
  }

  async goToProductsPage() {
    await this.productsButton.click();
  }

  async goToCartPage() {
    await this.cartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async viewCartModal() {
    await this.viewCartModalButton.click();
  }

  async deleteAccount() {
    await this.deleteButton.click();
  }
}
