import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { ProductCart } from "../types/productCart";

export class ProductsPage extends BaseTestClass {
  private products: Locator;
  private searchInput: Locator;
  private searchButton: Locator;
  private continueShoppingButton: Locator;
  private viewCartModalButton: Locator;

  private productCart: ProductCart[] = [];

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator(".features_items .col-sm-4");
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
    this.continueShoppingButton = this.page.locator(".btn-success");
    this.viewCartModalButton = this.page.locator(
      ".modal-content a[href='/view_cart']"
    );
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

  async addProductToCart(index: number) {
    const products = await this.products.all();
    if (index > products.length) {
      throw new Error("Given index of product does not exist in the list");
    }
    const product = products[index - 1];

    const name = await product.locator("p").first().textContent();
    const priceStr = await product.locator("h2").first().textContent();

    if (!priceStr || !name) {
      throw new Error("Price OR name are not found for the product");
    }

    const price = parseFloat(priceStr!.split("Rs.")[1].trim());

    const newProduct: ProductCart = {
      name: name,
      price: price,
      quantity: 1,
      totalPrice: price,
    };

    this.handleAddToCart(newProduct);

    const addToCartButton = product.locator(".add-to-cart").first();
    await addToCartButton.click();

    return this.productCart;
  }

  handleAddToCart(product: ProductCart) {
    const existingProduct = this.productCart.find(
      (p) => p.name === product.name
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice =
        existingProduct.price * existingProduct.quantity;
    } else {
      this.productCart.push(product);
    }
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
      const prodName = await product.locator(".productinfo p").textContent();
      expect(prodName).toContain(productName);
    }
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async viewCartModal() {
    await this.viewCartModalButton.click();
  }
}
