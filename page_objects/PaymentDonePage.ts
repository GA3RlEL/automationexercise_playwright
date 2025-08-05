import { Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class PaymentDonePage extends BaseTestClass {
  private downloadInvoiceButton: Locator;

  constructor(page: Page) {
    super(page);
    this.downloadInvoiceButton = page.locator("a[href*='download_invoice']");
  }

  async downloadInvoice() {
    await this.downloadInvoiceButton.click();
  }
}
