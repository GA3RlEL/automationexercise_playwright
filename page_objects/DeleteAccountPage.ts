import { expect, Locator, Page } from "@playwright/test";

export class DeleteAccountPage {
  private continueButton: Locator;
  private confirmationMessage: Locator;

  constructor(private page: Page) {
    this.continueButton = this.page.locator(".btn.btn.btn-primary");
    this.confirmationMessage = this.page.getByRole("heading", {
      name: "ACCOUNT DELETED!",
    });
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async isAt() {
    const isVisible = await this.confirmationMessage.isVisible();
    expect(isVisible).toBeTruthy();
  }
}
