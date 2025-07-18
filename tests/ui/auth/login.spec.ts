import { test } from "@playwright/test";
import loginUser from "../../../data/loginUser.json";
import { POManager } from "../../../page_objects/POManager";

test.beforeEach(async ({ page }) => {
  // Navigate to the home page
  await page.goto("http://automationexercise.com/");
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

// In this test, deleting account is omitted
test("Login user with valid credentials", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  // Assert that the home page is displayed
  await homePage.isAt();

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert that "Login to your account" text is visible
  await loginPage.verifyLoginToYourAccountTextIsVisible();

  // Sign in with valid credentials
  await loginPage.signIn(loginUser.email, loginUser.password);

  // Assert that the user is logged in
  await homePage.verifyUserIsLoggedIn(loginUser.name);
});

test.only("Login user with invalid credentials", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  // Assert that the home page is displayed
  await homePage.isAt();

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert that "Login to your account" text is visible
  await loginPage.verifyLoginToYourAccountTextIsVisible();

  // Sign in with invalid credentials
  await loginPage.signIn(loginUser.email, loginUser.password + "1");

  // Assert error message is visible
  await loginPage.verifyErrorMessageIsVisible(
    "Your email or password is incorrect!"
  );
});
