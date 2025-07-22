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
  await loginPage.verifyTextIsVisible("Login to your account");

  // Sign in with valid credentials
  await loginPage.signIn(loginUser.email, loginUser.password);

  // Assert that the user is logged in
  await homePage.verifyUserIsLoggedIn(loginUser.name);
});

test("Login user with invalid credentials", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  // Assert that the home page is displayed
  await homePage.isAt();

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert that "Login to your account" text is visible
  await loginPage.verifyTextIsVisible("Login to your account");

  // Sign in with invalid credentials
  await loginPage.signIn(loginUser.email, loginUser.password + "1");

  // Assert error message is visible
  await loginPage.verifyTextIsVisible("Your email or password is incorrect!");
});

test("Logout user", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  // Assert that home page is displayed
  await homePage.isAt();

  // Navigate to the login screen
  await homePage.goToLoginPage();

  // Assert that 'Login to your account' is visible
  await loginPage.verifyTextIsVisible("Login to your account");

  // Login with valid credentials
  await loginPage.signIn(loginUser.email, loginUser.password);

  // Assert that user is logged in
  await homePage.verifyUserIsLoggedIn(loginUser.name);

  // Logout user
  await homePage.logoutUser();

  // Assert that user is redirected to login page
  await loginPage.verifyTextIsVisible("Login to your account");
});

test("Register user with existing email", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  // Assert that home page is visible
  await homePage.isAt();

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert that 'New User Signup!' is visible
  await loginPage.verifyTextIsVisible("New User Signup!");

  // Fill the sign up form with existing email
  await loginPage.signUp(loginUser.email, loginUser.name);

  // Assert that 'Email Address already exist!' error message is visible
  await loginPage.verifyTextIsVisible("Email Address already exist!");
});
