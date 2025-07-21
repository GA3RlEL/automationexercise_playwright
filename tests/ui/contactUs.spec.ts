import { test } from "@playwright/test";
import { POManager } from "../../page_objects/POManager";

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

test("Check Contact us form", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const contactUsPage = poManager.getContactUsPage();

  // Assert that Home page is visible
  await homePage.isAt();

  // Navigate to ContactUs Page
  await homePage.goToContactUsPage();

  // Assert that "Get In Touch" text is visible
  await contactUsPage.verifyIfGetInTouchTextIsVisible();

  // Fill in the contact form and submit
  await contactUsPage.fillForm(
    "John Doe",
    "test@test.com",
    "Test Subject",
    "This is a test message",
    "C:/Users/krusz/Desktop/git/automationexercise_playwright/data/testFile.txt"
  );

  // Wait for js to load
  await page.waitForTimeout(1000);

  // Wait for dialog to appear
  await page.on("dialog", async (dialog) => dialog.accept());

  // Submit the form
  await contactUsPage.submitForm();

  // Assert that success message is displayed
  await contactUsPage.confirmSuccessMessage();

  // Navigate back to Home page
  await contactUsPage.goToHomePage();

  // Assert that Home page is visible again
  await homePage.isAt();
});
