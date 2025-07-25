import { expect, Locator, Page } from "@playwright/test";

export class BaseTestClass {
  private subscriptionInptut: Locator;
  private subscriptionButton: Locator;
  constructor(protected page: Page) {
    this.subscriptionInptut = this.page.locator("#susbscribe_email");
    this.subscriptionButton = this.page.locator("#subscribe");
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
}
