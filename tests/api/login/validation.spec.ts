import test, { expect } from "@playwright/test";

// IMORTANT EVERY REQUEST HAS RESPONSE STATUS CODE 200

test("POST to verify login with valid credentials", async ({ request }) => {
  // Make POST request to verify login with valid credentials
  const response = await request.post("/api/verifyLogin", {
    form: {
      email: "test12321@test.com",
      password: "Test123!",
    },
  });

  // Assert that response status is equal to 200
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that responseCode is equal to 200
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(200);

  // Assert that message is equal to "User exists!"
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe("User exists!");
});

test("POST to verify login with invalid credentials", async ({ request }) => {
  // Make POST request to verify login with invalid credentials
  const response = await request.post("/api/verifyLogin", {
    form: {
      email: "test12321@test.com",
      password: "Test123",
    },
  });

  // Assert that response status is equal to 200
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that responseCode is equal to 404
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(404);

  // Assert that message is equal to "User exists!"
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe("User not found!");
});

test("POST to verify login without email parameter", async ({ request }) => {
  // Make a POST request to verify error message when email is missing
  const response = await request.post("/api/verifyLogin", {
    form: {
      password: "Test123!",
    },
  });

  // Assert that response status is equal to 200
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that responseCode is equal to 400
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(400);

  // Assert that message is equal to "Bad request, email or password parameter is missing in POST request."
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe(
    "Bad request, email or password parameter is missing in POST request."
  );
});

test("POST to verify login without password parameter", async ({ request }) => {
  // Make a POST request to verify error message when password is missing
  const response = await request.post("/api/verifyLogin", {
    form: {
      email: "test12321@test.com",
    },
  });

  // Assert that response status is equal to 200
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that responseCode is equal to 400
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(400);

  // Assert that message is equal to "Bad request, email or password parameter is missing in POST request."
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe(
    "Bad request, email or password parameter is missing in POST request."
  );
});
