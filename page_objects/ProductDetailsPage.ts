import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { ProductCart } from "../types/productCart";

export class ProductDetailsPage extends BaseTestClass {
  private productName: Locator;
  private productCategory: Locator;
  private productPrice: Locator;
  private productAvailability: Locator;
  private productCondition: Locator;
  private productBrand: Locator;
  private quantityInput: Locator;
  private addToCartButton: Locator;

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
    this.quantityInput = this.page.locator("#quantity");
    this.addToCartButton = this.page.getByRole("button", {
      name: "Add to cart",
    });
  }

  async addProductToCart(quantity: number, productsCart: ProductCart[]) {
    const name = await this.productName.textContent();
    const priceStr = await this.productPrice.textContent();
    const q = quantity || 1;
    if (!priceStr || !name) {
      throw new Error("Price OR name are not found for the product");
    }
    const price = parseFloat(priceStr!.replace("Rs. ", "").trim());
    const newProduct: ProductCart = {
      name: name,
      price: price,
      quantity: q,
      totalPrice: price * q,
    };

    productsCart = this.handleAddToCart(newProduct, productsCart);

    await this.quantityInput.fill(quantity.toString());
    await this.addToCartButton.click();

    return productsCart;
  }

  handleAddToCart(product: ProductCart, pc: ProductCart[]) {
    let productCart = pc;
    const existingProduct = productCart.find((p) => p.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice =
        existingProduct.price * existingProduct.quantity;
    } else {
      productCart.push(product);
    }
    return productCart;
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
