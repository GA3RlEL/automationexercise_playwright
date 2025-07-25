import { test } from "@playwright/test";
import { POManager } from "../../page_objects/POManager";
import { BASE_URL } from "../../constants/constants";

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

test("Verify all products and product detail page", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const productDetailsPage = poManager.getProductsDetailsPage();

  const productIndex = 1;

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that user is redirected to ALL PRODUCTS page
  await productsPage.isAt(BASE_URL + "products");
  await productsPage.verifyTextIsVisible("All Products");

  // Assert that product list is visible
  await productsPage.checkProductsVisible();

  // Select first product
  await productsPage.selectProduct(productIndex);

  // Assert that user is redirected to productDetailsPage
  await productDetailsPage.isAt(BASE_URL + `product_details/${productIndex}`);

  // Assert that product details are visible
  await productDetailsPage.areProductDetailsVisible();
});

test("Search Product", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();

  const productName = "top";

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that user is redirected to ALL PRODUCTS page
  await productsPage.isAt(BASE_URL + "products");
  await productsPage.verifyTextIsVisible("All Products");

  // Search for a product "top"
  await productsPage.searchProduct(productName);

  // Assert that "SEARCHED PRODUCTS" is visible
  await productsPage.verifyTextIsVisible("Searched Products");

  // Assert that searched products are releated to the searched term
  await productsPage.checkSearchedProducts(productName);
});

test("Add products in cart", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const cartPage = poManager.getCartPage();

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Add first product to cart
  await productsPage.addProductToCart(1);

  // Continue shopping
  await productsPage.continueShopping();

  // Add second product to cart
  const products = await productsPage.addProductToCart(2);

  // Navigate to cart page
  await productsPage.viewCartModal();

  // Assert that count of products in the cart is correct
  await cartPage.verifyProductsCount(products.length);

  // Assert that product details are correct
  await cartPage.verifyProductDetails(products);
});
