import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
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
