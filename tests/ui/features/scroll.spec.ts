import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";

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

test("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();

  // Assert that Home page is visible
  await homePage.isAt(BASE_URL);

  // Scroll down to the bottom of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Verify 'SUBSCRIPTION' is visible
  await homePage.verifyTextIsVisible("Subscription");

  // Scroll up to the top of the page
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  // Verify "Full-Fledged practice website for Automation Engineers" is visible
  await homePage.verifyTextIsVisible(
    "Full-Fledged practice website for Automation Engineers"
  );
});
