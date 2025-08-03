import { test } from "@playwright/test";
import { BASE_URL } from "../../constants/constants";
import { POManager } from "../../page_objects/POManager";
import { categories } from "../../types/categories";

test.beforeEach(async ({ page }) => {
  // Navigate to the home page
  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle");
  // Automatically close window with consent to use your data
  try {
    await page.waitForSelector(".fc-cta-consent", { timeout: 5000 });
    await page.locator(".fc-cta-consent").click();
  } catch (error) {
    throw new Error(
      "Something went wrong while closing window with consent to use your data"
    );
  }
});

test("View category products", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Assert that category products are visible
  await homePage.checkCategoryProductsVisibility();

  // Click on "Women" category and "Dress" subcategory
  await homePage.selectCategory(
    categories.women.index,
    categories.women.subcategories.dress,
    categories.women.name
  );

  // Assert that "Women - Dress Products" text is visible
  await homePage.verifyTextIsVisible("Women - Dress Products");

  // Click on "Men" category and "Jeans" subcategory
  await homePage.selectCategory(
    categories.men.index,
    categories.men.subcategories.jeans,
    categories.men.name
  );

  // Assert that "Men - Tshirts Products" text is visible
  await homePage.verifyTextIsVisible("Men - Tshirts Products");
});
