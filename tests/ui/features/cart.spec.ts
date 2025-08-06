import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";
import { ProductCart } from "../../../types/productCart";

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

test("Remove products from cart", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const cartPage = poManager.getCartPage();

  let products: ProductCart[] = [];

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Go to products page
  await homePage.goToProductsPage();

  // Assert that products page is visible
  await productsPage.isAt(BASE_URL + "products");

  // Add products to cart
  products = await productsPage.addProductToCart(1, products);
  await productsPage.continueShopping();
  products = await productsPage.addProductToCart(2, products);
  await productsPage.continueShopping();

  // Go to cart page
  await productsPage.goToCartPage();

  // Assert that cart page
  await cartPage.isAt(BASE_URL + "view_cart");
  await page.waitForLoadState("networkidle");

  // Delete item from cart
  products = await cartPage.removeProductFromCart("Blue Top", products);
  await page.waitForTimeout(2000);
  await cartPage.verifyProductRemovedFromCart("Blue Top");
});
