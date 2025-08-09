import { test } from "@playwright/test";
import { POManager } from "../../../page_objects/POManager";
import { BASE_URL } from "../../../constants/constants";

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.navigateToHomeAndDismissConsent();
});

test("Verify navigate to test case page", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const testCasesPage = poManager.getTestCasesPage();

  // Assert that home page is visible
  await homePage.isAt(BASE_URL);

  // Navigate to test cases page
  await homePage.goToTestCasesPage();

  // Assert that test cases page is displayed
  await testCasesPage.isAt(BASE_URL + "test_cases");
});
