import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class ProductsPage extends BaseTestClass {
  private products: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator(".features_items .col-sm-4");
  }

  async checkProductsVisible() {
    const products = await this.products.all();
    if (products) {
      const products_count = products.length;
      expect(products_count).toBeGreaterThan(0);
    }
  }

  async selectProduct(index: number) {
    const products = await this.products.all();
    if (index > products.length) {
      throw new Error("Given index of product does not exist in the list");
    }
    const product = products[index - 1];

    const viewProductButton = product.locator("a[href*='/product_details']");
    await viewProductButton.click();
  }
}
