import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { ProductCart } from "../types/productCart";

export class CartPage extends BaseTestClass {
  private products: Locator;
  private proceedToCheckoutButton: Locator;
  private modalRegisterLoginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator("tbody tr");
    this.proceedToCheckoutButton = this.page.locator(".check_out");
    this.modalRegisterLoginButton = this.page.locator(
      ".modal-dialog a[href*='/login']"
    );
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

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async goToLoginPageModal() {
    await this.modalRegisterLoginButton.click();
  }

  async removeProductFromCart(productName: string, products: ProductCart[]) {
    const allProducts = await this.products.all();
    let productToRemove: Locator | undefined;

    for (const p of allProducts) {
      const name = await p.locator("h4").textContent();
      if (name === productName) {
        productToRemove = p;
        break;
      }
    }

    if (!productToRemove) {
      throw new Error(
        "Product with following name " +
          productName +
          " was not found in the cart"
      );
    }

    const updatedProducts = products.filter((p) => p.name !== productName);
    await productToRemove.locator(".cart_quantity_delete").click();

    return updatedProducts;
  }

  async verifyProductRemovedFromCart(productName: string) {
    const allProducts = await this.products.all();
    let found = false;

    for (const p of allProducts) {
      const name = await p.locator("h4").textContent();
      if (name === productName) {
        found = true;
        break;
      }
    }

    if (found) {
      throw new Error(
        "Product with name " + productName + " was not removed from the cart"
      );
    }
  }

  async clearCart() {
    await this.page.waitForLoadState("networkidle");
    const allProducts = await this.products.all();

    if (allProducts.length === 0) {
      return; // No products to remove
    }

    for (const p of allProducts) {
      await p.locator(".cart_quantity_delete").click();
    }
  }
}
