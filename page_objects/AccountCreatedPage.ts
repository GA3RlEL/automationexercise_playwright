import { expect, Locator, Page } from "@playwright/test";

export class AccountCreatedPage {
  private confirmationMessage: Locator;
  private continueButton: Locator;
  constructor(private page: Page) {
    this.confirmationMessage = this.page.getByRole("heading", {
      name: "ACCOUNT CREATED!",
    });
    this.continueButton = this.page.locator(".btn.btn.btn-primary");
  }

  async isAt() {
    const isVisible = await this.confirmationMessage.isVisible();
    await expect(isVisible).toBeTruthy();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
