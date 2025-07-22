import { expect, Page } from "@playwright/test";

export class BaseTestClass {
  constructor(protected page: Page) {}

  async verifyTextIsVisible(text: string) {
    const locator = this.page.getByText(text, { exact: true }).first();
    const isVisible = await locator.isVisible();
    expect(isVisible).toBeTruthy();
  }
}
