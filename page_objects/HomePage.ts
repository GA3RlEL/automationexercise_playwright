import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { ProductCart } from "../types/productCart";

export class HomePage extends BaseTestClass {
  private categoryProducts: Locator;
  private recommendedSection: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryProducts = this.page.locator(".category-products");
    this.recommendedSection = this.page.locator(".recommended_items");
  }

  async checkCategoryProductsVisibility() {
    const isVisible = await this.categoryProducts.isVisible();
    if (!isVisible) {
      throw new Error("Category products are not visible on the home page");
    }
    expect(isVisible).toBe(true);
  }

  async addItemToCartFromRecommended(
    index: number,
    productsCart: ProductCart[]
  ) {
    const recommendedItems = await this.recommendedSection
      .locator(".active .single-products")
      .all();

    console.log(recommendedItems);
    console.log(recommendedItems.length);
    if (index > recommendedItems.length) {
      throw new Error("Given index of recommended item does not exist");
    }

    console.log(recommendedItems);
    console.log(recommendedItems.length);

    const item = recommendedItems[index - 1];
    const name = await item.locator("p").first().textContent();
    const priceStr = await item.locator("h2").textContent();
    if (!priceStr || !name) {
      throw new Error("Price OR name are not found for the recommended item");
    }
    const price = parseFloat(priceStr.replace("Rs. ", "").trim());
    const newProduct: ProductCart = {
      name: name,
      price: price,
      quantity: 1,
      totalPrice: price,
    };
    productsCart.push(newProduct);

    const addToCartButton = item.locator(".add-to-cart").first();
    await addToCartButton.click();

    await this.page.locator(".modal-body a[href='/view_cart']").click();

    return productsCart;
  }

  async selectCategory(
    categoryIndex: number,
    subCategory: string,
    categoryName: string
  ) {
    const categoryBoxLocator = this.categoryProducts
      .locator(".panel-default")
      .nth(categoryIndex);

    const categoryNameLocator = categoryBoxLocator.getByText(categoryName);
    const subCategoryLocator = categoryBoxLocator.getByText(subCategory);

    await categoryNameLocator.click();
    await this.page.waitForTimeout(1000);
    await expect(subCategoryLocator).toBeVisible();
    await subCategoryLocator.click();
  }
}
