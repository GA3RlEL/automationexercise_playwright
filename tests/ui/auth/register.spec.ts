import test from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { registerUser } from "../../../data/registerUser.json";

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

test("Register user", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  const signupPage = poManager.getSignupPage();
  const accountCreatedPage = poManager.getAccountCreatedPage();
  const deleteAccountPage = poManager.getDeleteAccountPage();

  // Assert that the page is loaded
  await homePage.isAt();

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert "New User Signup!" text is visible
  await loginPage.verifyNewUserSignUpTextIsVisible();

  // Fill sign-up form on login page
  await loginPage.signUp(registerUser.email, registerUser.name);

  // Assert that "ENTER ACCOUNT INFORMATION" text is visible
  await signupPage.isAt();

  // Fill sign-up form on signup page
  await signupPage.fillSignUpForm(registerUser);

  // Assert that "ACCOUNT CREATED!" text is visible
  await accountCreatedPage.isAt();

  // Click continue button
  await accountCreatedPage.clickContinue();

  // Assert that the user is redirected to the home page
  await homePage.isAt();

  // Assert that the user is logged in
  await homePage.verifyUserIsLoggedIn(registerUser.name);

  // Navigate to the delete account page
  await homePage.deleteAccount();

  // Assert that "ACCOUNT DELETED!" text is visible
  await deleteAccountPage.isAt();

  // Click continue button on delete account page
  await deleteAccountPage.clickContinue();
});
