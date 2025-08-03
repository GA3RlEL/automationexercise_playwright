import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class HomePage extends BaseTestClass {
  private categoryProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryProducts = this.page.locator(".category-products");
  }

  async checkCategoryProductsVisibility() {
    const isVisible = await this.categoryProducts.isVisible();
    if (!isVisible) {
      throw new Error("Category products are not visible on the home page");
    }
    expect(isVisible).toBe(true);
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
