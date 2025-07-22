import { expect, Page } from "@playwright/test";

export class TestCasePage {
  constructor(private page: Page) {}

  async isAt() {
    const url = this.page.url();
    expect(url).toBe("https://automationexercise.com/test_cases");
  }
}
