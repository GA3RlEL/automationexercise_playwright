import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class HomePage extends BaseTestClass {
  private deleteButton: Locator;

  constructor(page: Page) {
    super(page);

    this.deleteButton = this.page.locator("a[href*='/delete_account']");
  }

  async deleteAccount() {
    await this.deleteButton.click();
  }
}
