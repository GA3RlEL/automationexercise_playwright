import test from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { registerUser } from "../../../data/registerUser.json";
import { BASE_URL } from "../../../constants/constants";

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
});

test("Register user", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  const signupPage = poManager.getSignupPage();
  const accountCreatedPage = poManager.getAccountCreatedPage();
  const deleteAccountPage = poManager.getDeleteAccountPage();

  // Assert that the page is loaded
  await homePage.isAt(BASE_URL);

  // Navigate to the login page
  await homePage.goToLoginPage();

  // Assert "New User Signup!" text is visible
  await loginPage.verifyTextIsVisible("New User Signup!");

  // Fill sign-up form on login page
  await loginPage.signUp(registerUser.email, registerUser.name);

  // Assert that "ENTER ACCOUNT INFORMATION" text is visible
  await signupPage.verifyTextIsVisible("Enter Account Information");

  // Fill sign-up form on signup page
  await signupPage.fillSignUpForm(registerUser);

  // Assert that "ACCOUNT CREATED!" text is visible
  await accountCreatedPage.isAt();

  // Click continue button
  await accountCreatedPage.clickContinue();

  // Assert that the user is redirected to the home page
  await homePage.isAt(BASE_URL);

  // Assert that the user is logged in
  await homePage.verifyUserIsLoggedIn(registerUser.name);

  // Navigate to the delete account page
  await homePage.deleteAccount();

  // Assert that "ACCOUNT DELETED!" text is visible
  await deleteAccountPage.isAt();

  // Click continue button on delete account page
  await deleteAccountPage.clickContinue();
});
