import { test } from "@playwright/test";
import { BASE_URL } from "../../constants/constants";
import { POManager } from "../../page_objects/POManager";
import { ProductCart } from "../../types/productCart";
import {
  registerUser,
  registerUserDeliveryData,
  registerUserPaymentData,
} from "../../data/registerUser.json";

test.describe.configure({ mode: "serial" });

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

test("Place order: register while checkout", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const signUpPage = poManager.getSignupPage();
  const accountCreatedPage = poManager.getAccountCreatedPage();
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const paymentPage = poManager.getPaymentPage();
  const deleteAccountPage = poManager.getDeleteAccountPage();
  const paymentDonePage = poManager.getPaymentDonePage();

  let productsCart: ProductCart[] = [];

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that products page is visible
  await productsPage.isAt(BASE_URL + "products");

  // Add one item to cart
  productsCart = await productsPage.addProductToCart(1, productsCart);

  // Navigate to Cart
  await productsPage.viewCartModal();

  // Assert that user is redirected to Cart page
  await cartPage.isAt(BASE_URL + "view_cart");

  // Proceed with checkout
  await cartPage.proceedToCheckout();

  // Click "Register / Login" button on modal
  await cartPage.goToLoginPageModal();

  // Assert user is redirected to login page
  await loginPage.isAt(BASE_URL + "login");

  // Register new user
  await loginPage.signUp(registerUser.email, registerUser.name);
  await signUpPage.fillSignUpForm(registerUser);

  // Assert that "Account Created" text is visible
  await accountCreatedPage.isAt();
  await accountCreatedPage.clickContinue();

  // Assert that correct logged user is visible on the menu
  await homePage.verifyUserIsLoggedIn(registerUser.name);

  // Navigate to cart
  await homePage.goToCartPage();
  await cartPage.isAt(BASE_URL + "view_cart");

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  // Assert that checkout page is visible
  await checkoutPage.isAt(BASE_URL + "checkout");

  // Assert that delivery data is correct and cart items matches
  await checkoutPage.verifyAddressDeliveryInfo(registerUserDeliveryData);
  await checkoutPage.verifyProductDetails(productsCart);

  // Fill text area with message
  await checkoutPage.fillTextArea("This is a test message");

  // Place order
  await checkoutPage.placeOrder();

  // Assert that user is redirected to payment page
  await paymentPage.isAt(BASE_URL + "payment");

  // Fill payment data and proceed
  await paymentPage.fillPaymentDetailsAndConfirm(registerUserPaymentData);

  // Assert that user is redirected to payment done page
  await paymentDonePage.isAt(BASE_URL + "payment_done/500");
  await paymentDonePage.verifyTextIsVisible(
    "Congratulations! Your order has been confirmed!"
  );

  // Delete user account
  await paymentDonePage.deleteAccount();

  // Assert that "ACCOUNT DELETED!" message is visible and click continue
  await deleteAccountPage.isAt();
  await deleteAccountPage.clickContinue();
});

test("Place order: Register before checkout", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const signUpPage = poManager.getSignupPage();
  const accountCreatedPage = poManager.getAccountCreatedPage();
  const homePage = poManager.getHomePage();
  const productsPage = poManager.getProductsPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const paymentPage = poManager.getPaymentPage();
  const deleteAccountPage = poManager.getDeleteAccountPage();
  const paymentDonePage = poManager.getPaymentDonePage();

  let productsCart: ProductCart[] = [];

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Navigate to login page
  await homePage.goToLoginPage();

  // Assert user is redirected to login page
  await loginPage.isAt(BASE_URL + "login");

  // Register new user
  await loginPage.signUp(registerUser.email, registerUser.name);
  await signUpPage.fillSignUpForm(registerUser);

  // Assert that "Account Created" text is visible
  await accountCreatedPage.isAt();
  await accountCreatedPage.clickContinue();

  // Assert that logged user is visible on the menu
  await homePage.verifyUserIsLoggedIn(registerUser.name);

  // Navigate to products page
  await homePage.goToProductsPage();

  // Assert that products page is visible
  await productsPage.isAt(BASE_URL + "products");

  // Add one item to cart
  productsCart = await productsPage.addProductToCart(1, productsCart);

  // Close modal window after adding product to cart
  await productsPage.continueShopping();

  // Navigate to Cart
  await productsPage.goToCartPage();

  // Assert that user is redirected to Cart page
  await cartPage.isAt(BASE_URL + "view_cart");

  // Proceed with checkout
  await cartPage.proceedToCheckout();

  // Assert that checkout page is visible
  await checkoutPage.isAt(BASE_URL + "checkout");

  // Assert that delivery data is correct and cart items matches
  await checkoutPage.verifyAddressDeliveryInfo(registerUserDeliveryData);
  await checkoutPage.verifyProductDetails(productsCart);

  // Fill text area with message
  await checkoutPage.fillTextArea("This is a test message");

  // Place order
  await checkoutPage.placeOrder();

  // Assert that user is redirected to payment page
  await paymentPage.isAt(BASE_URL + "payment");

  // Fill payment data and proceed
  await paymentPage.fillPaymentDetailsAndConfirm(registerUserPaymentData);

  // Assert that user is redirected to payment done page
  await paymentDonePage.isAt(BASE_URL + "payment_done/500");
  await paymentDonePage.verifyTextIsVisible(
    "Congratulations! Your order has been confirmed!"
  );

  // Delete user account
  await paymentDonePage.deleteAccount();

  // Assert that "ACCOUNT DELETED!" message is visible and click continue
  await deleteAccountPage.isAt();
  await deleteAccountPage.clickContinue();
});
