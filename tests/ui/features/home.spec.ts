import { test } from "@playwright/test";
import { BASE_URL } from "../../../constants/constants";
import { POManager } from "../../../page_objects/POManager";
import { categories } from "../../../types/categories";
import { ProductCart } from "../../../types/productCart";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
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
  await homePage.verifyTextIsVisible("Men - Jeans Products");
});

test("Add to cart from recommended items", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();

  let products: ProductCart[] = [];

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Assert that "recommended items" text is visible
  await homePage.verifyTextIsVisible("recommended items");

  // Add first recommended item to cart
  products = await homePage.addItemToCartFromRecommended(1, products);

  // Assert that cart page is visible
  await cartPage.isAt(BASE_URL + "view_cart");

  // Assert that the product is added to cart
  await cartPage.verifyProductsCount(products.length);
  await cartPage.verifyProductDetails(products);
});
