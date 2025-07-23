import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class ProductDetailsPage extends BaseTestClass {
  private productName: Locator;
  private productCategory: Locator;
  private productPrice: Locator;
  private productAvailability: Locator;
  private productCondition: Locator;
  private productBrand: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = this.page.locator(".product-information h2");
    this.productCategory = this.page.locator(".product-information p").first();
    this.productPrice = this.page.locator(".product-information span").first();
    this.productAvailability = this.page
      .locator(".product-information p")
      .nth(1);
    this.productCondition = this.page.locator(".product-information p").nth(2);
    this.productBrand = this.page.locator(".product-information p").nth(3);
  }

  async areProductDetailsVisible() {
    expect(this.productName).toBeVisible();
    expect(this.productCategory).toBeVisible();
    expect(this.productPrice).toBeVisible();
    expect(this.productAvailability).toBeVisible();
    expect(this.productCondition).toBeVisible();
    expect(this.productBrand).toBeVisible();
  }
}
