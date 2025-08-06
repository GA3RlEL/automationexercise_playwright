import test from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";
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

test("Verify subscription on Home Page", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Assert that "SUBSCRIPTION" text is visible
  await homePage.verifyTextIsVisible("Subscription");

  // Proceed with subscription
  await homePage.proceedSubscription(loginUser.email);

  // Assert that success message is displayed
  await homePage.verifyTextIsVisible("You have been successfully subscribed!");
});

test("Verify subscription in Cart Page", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const cartPage = poManager.getCartPage();

  // Assert that home page is displayed
  await homePage.isAt(BASE_URL);

  // Navigate to Cart Page
  await homePage.goToCartPage();

  // Assert that Cart Page is displayed
  await cartPage.isAt(BASE_URL + "view_cart");

  // Assert that "SUBSCRIPTION" text is visible
  await cartPage.verifyTextIsVisible("Subscription");

  // Proceed with subscription
  await cartPage.proceedSubscription(loginUser.email);

  // Assert that success message is displayed
  await cartPage.verifyTextIsVisible("You have been successfully subscribed!");
});
