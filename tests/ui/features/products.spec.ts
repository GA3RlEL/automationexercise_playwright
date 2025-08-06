import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";
import { ProductCart } from "../../../types/productCart";
import { loginUser } from "../../../data/loginUser.json";

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

  const productName = "Top";

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

  let products: ProductCart[] = [];

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Add first product to cart
  await productsPage.addProductToCart(1, products);

  // Continue shopping
  await productsPage.continueShopping();

  // Add second product to cart
  products = await productsPage.addProductToCart(2, products);

  // Navigate to cart page
  await productsPage.viewCartModal();

  // Assert that count of products in the cart is correct
  await cartPage.verifyProductsCount(products.length);

  // Assert that product details are correct
  await cartPage.verifyProductDetails(products);
});

test("Verify product quantity in cart", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const productDetailsPage = poManager.getProductsDetailsPage();
  const cartPage = poManager.getCartPage();

  const productIndex = 1;
  const quantity = 4;
  let products: ProductCart[] = [];

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Click 'View product' button for the first product
  await productsPage.selectProduct(productIndex);

  // Assert that product details page is displayed
  await productsPage.isAt(BASE_URL + "product_details/" + productIndex);

  // Inrease quantity to 4 and add the product to cart
  products = await productDetailsPage.addProductToCart(quantity, products);

  // Navigate to cart page
  await productDetailsPage.viewCartModal();

  // Assert that product details are correct
  await cartPage.verifyProductDetails(products);
});

test("View & Cart Brand products", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that products page is displayed
  await productsPage.isAt(BASE_URL + "products");

  // Click on "POLO" brand
  await productsPage.selectBrabd("Polo");

  // Assert that "Brand - Polo Products" text is visible
  await productsPage.verifyTextIsVisible("Brand - Polo Products");

  // Click on "H&M" brand
  await productsPage.selectBrabd("H&M");

  // Assert that "Brand - H&M Products" text is visible
  await productsPage.verifyTextIsVisible("Brand - H&M Products");
});

test("Search products and Verify cart after login", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const cartPage = poManager.getCartPage();
  const loginPage = poManager.getLoginPage();

  let productsCart: ProductCart[] = [];

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that user is redirected to ALL PRODUCTS page
  await productsPage.isAt(BASE_URL + "products");

  // Search for a product "top"
  await productsPage.searchProduct("Jeans");

  // Assert that "SEARCHED PRODUCTS" is visible
  await productsPage.verifyTextIsVisible("Searched Products");

  // Assert that searched products are releated to the searched term
  await productsPage.checkSearchedProducts("Jeans");

  // Add all searched products to cart
  productsCart = await productsPage.addAllSearchedProductsToCart(productsCart);

  // Go to cart page
  await productsPage.goToCartPage();

  // Assert that count of products in the cart is correct
  await cartPage.verifyProductsCount(productsCart.length);

  // Assert that product details are correct
  await cartPage.verifyProductDetails(productsCart);

  // Go to login page
  await cartPage.goToLoginPage();

  // Login with valid credentials
  await loginPage.signIn(loginUser.email, loginUser.password);

  // Assert that user is logged in
  await homePage.verifyUserIsLoggedIn(loginUser.name);

  // Go to cart page
  await homePage.goToCartPage();

  // Assert that count of products in the cart is correct
  await cartPage.verifyProductsCount(productsCart.length);

  // Assert that product details are correct
  await cartPage.verifyProductDetails(productsCart);
});

test("Add review to product", async ({ page }) => {
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

  // Select first product
  await productsPage.selectProduct(productIndex);

  // Assert that user is redirected to productDetailsPage
  await productDetailsPage.isAt(BASE_URL + "product_details/" + productIndex);

  // Assert that "Write Your Review" text is visible
  await productDetailsPage.verifyTextIsVisible("Write Your Review");

  // Add review to product
  await productDetailsPage.writeReview(
    "test",
    "test@test.com",
    "This is a test review"
  );

  // Assert that "Thank you for your review." text is visible
  await productDetailsPage.verifyTextIsVisible("Thank you for your review.");
});
