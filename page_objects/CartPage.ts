import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { ProductCart } from "../types/productCart";

export class CartPage extends BaseTestClass {
  private products: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator("tbody tr");
  }

  async verifyProductsCount(expectedCount: number) {
    const productsCount = await this.products.count();

    if (productsCount !== expectedCount) {
      throw new Error(
        `Expected ${expectedCount} products in the cart, but found ${productsCount}`
      );
    }
    expect(productsCount).toBe(expectedCount);
  }

  async verifyProductDetails(products: ProductCart[]) {
    const cartProducts = await this.products.all();

    for (let i = 0; i < cartProducts.length; i++) {
      const priceStr = await cartProducts[i]
        .locator(".cart_price")
        .textContent();
      const price = parseFloat(priceStr!.replace("Rs. ", "").trim());
      const quantityStr = await cartProducts[i]
        .locator(".cart_quantity")
        .textContent();
      const quantity = parseInt(quantityStr!.trim());
      const totalPriceStr = await cartProducts[i]
        .locator(".cart_total")
        .textContent();
      const totalPrice = parseFloat(totalPriceStr!.replace("Rs. ", "").trim());

      if (!priceStr || !quantityStr || !totalPriceStr) {
        throw new Error(
          "Price, quantity, or total price not found for the product"
        );
      }

      expect(price).toBe(products[i].price);
      expect(quantity).toBe(products[i].quantity);
      expect(totalPrice).toBe(products[i].totalPrice);
    }
  }
}
