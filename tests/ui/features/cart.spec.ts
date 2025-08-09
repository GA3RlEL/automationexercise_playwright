import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";
import { ProductCart } from "../../../types/productCart";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
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
