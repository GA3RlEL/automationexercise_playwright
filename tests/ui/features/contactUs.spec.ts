import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";
import path from "path";
test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
});

test("Check Contact us form", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const contactUsPage = poManager.getContactUsPage();

  // Assert that Home page is visible
  await homePage.isAt(BASE_URL);

  // Navigate to ContactUs Page
  await homePage.goToContactUsPage();

  // Assert that "Get In Touch" text is visible
  await contactUsPage.verifyTextIsVisible("Get In Touch");

  // Fill in the contact form and submit
  const filePath = path.resolve(__dirname, "../../../data/testFile.txt");
  await contactUsPage.fillForm(
    "John Doe",
    "test@test.com",
    "Test Subject",
    "This is a test message",
    filePath
  );

  // Wait for js to load
  await page.waitForTimeout(1000);

  await Promise.all([
    // Wait for dialog to appear
    await page.on("dialog", async (dialog) => dialog.accept()),
    // Submit the form
    await contactUsPage.submitForm(),
  ]);

  // Assert that success message is displayed
  await contactUsPage.verifyTextIsVisible(
    "Success! Your details have been submitted successfully."
  );

  // Navigate back to Home page
  await contactUsPage.goToHomePage();

  // Assert that Home page is visible again
  await homePage.isAt(BASE_URL);
});
