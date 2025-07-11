import test, { expect } from "@playwright/test";

// IMORTANT EVERY REQUEST HAS RESPONSE STATUS CODE 200

test("GET all brands", async ({ request }) => {
  // Make GET request to get all brands
  const response = await request.get("/api/brandsList");

  // Assert that response status is 200
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  // Assert that response code is equal to 200
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(200);

  // Assert that brands are returned
  expect(responseBody).toHaveProperty("brands");
  expect(responseBody.brands.length).toBeGreaterThan(0);
});

test("PUT to ALL brands", async ({ request }) => {
  // Make PUT request to all brands
  const response = await request.put("/api/brandsList");

  // Assert that response status is equal to 200
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that responseCode is equal to 405
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(405);

  // Assert that message is "This request method is not supported."
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe("This request method is not supported.");
});
