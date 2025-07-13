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

test.describe("User account management tests", () => {
  let isUserCreated: boolean = false;
  let isUserUpdated: boolean = false;

  const userData = {
    name: "Test User",
    email: "testuseremail@test.com",
    password: "Test123!",
    title: "Mr",
    birth_date: "19",
    birth_month: "January",
    birth_year: "1990",
    firstname: "Test",
    lastname: "User",
    company: "Test Company",
    address1: "123 Test St",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
    mobile_number: "1234567890",
  };

  const updateUserData = {
    email: "testuseremail@test.com",
    password: "Test123!",
    name: "Updated User",
  };

  const deleteUserData = {
    email: "testuseremail@test.com",
    password: "Test123!",
  };

  test.beforeAll(async ({ request }) => {
    // Make POST request to create a new user
    const response = await request.post("/api/createAccount", {
      form: userData,
    });

    // Assert that response status is equal to 200
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assert that response code is equal to 201
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(201);

    // Assert taht message is equal to "User created!"
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBe("User created!");

    console.log(responseBody);

    // Set flag to true if user is created
    isUserCreated = true;
  });

  test("GET user account details by email", async ({ request }) => {
    test.skip(!isUserCreated, "User is not created");

    // Make GET request to fetch user account details by email
    const response = await request.get("/api/getUserDetailByEmail", {
      params: { email: userData.email },
    });

    // Assert that response status is equal to 200
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    // Assert that responseCode is equal to 200
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(200);

    // Assert that user data matches the created user data
    expect(responseBody.user.email).toBe(userData.email);
    expect(responseBody.user.name).toBe(userData.name);
    expect(responseBody.user.first_name).toBe(userData.firstname);
    expect(responseBody.user.last_name).toBe(userData.lastname);
  });

  test("PUT method to update user", async ({ request }) => {
    test.skip(!isUserCreated, "User is not created");

    // Make PUT request to update the user
    const reponse = await request.put("/api/updateAccount", {
      form: updateUserData,
    });

    // Assert that response status is equal to 200
    expect(reponse.ok()).toBeTruthy();
    expect(reponse.status()).toBe(200);

    const responseBody = await reponse.json();

    console.log(responseBody);

    // Assert that responseCode is equal to 200
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(200);

    // Assert that message is equal to "User updated!"
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBe("User updated!");

    // Set flag to true if user is updated
    isUserUpdated = true;
  });

  test.afterAll(async ({ request }) => {
    if (isUserCreated) {
      test.skip(!isUserUpdated, "User is not updated");
    }

    // Make DELETE request to delete the user account
    const response = await request.delete("/api/deleteAccount", {
      form: deleteUserData,
    });

    // Assert that response status is equal to 200
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assert that responseCode is equal to 200
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(200);

    // Assert that message is equal to "Account deleted!"
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBe("Account deleted!");
  });
});
