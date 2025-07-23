import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class ProductsPage extends BaseTestClass {
  private products: Locator;
  private searchInput: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator(".features_items .col-sm-4");
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
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

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async checkSearchedProducts(productName: string) {
    const searchedProducts = await this.products.all();

    if (searchedProducts.length === 0) {
      throw new Error("No products found for the searched term");
    }

    for (const product of searchedProducts) {
      const productName = await product.locator(".productinfo p").textContent();
      expect(productName).toContain(productName);
    }
  }
}
