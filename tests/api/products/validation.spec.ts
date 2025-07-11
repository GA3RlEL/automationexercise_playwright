import test, { expect } from "@playwright/test";

// IMORTANT EVERY REQUEST HAS RESPONSE STATUS CODE 200

test("Get all products", async ({ request }) => {
  // Make a GET request to get all products
  const response = await request.get("/api/productsList");

  // Assert that response status is 200
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  // Assert that response body contains products
  expect(responseBody).toHaveProperty("products");
  expect(Array.isArray(responseBody.products)).toBeTruthy();
  expect(responseBody.products.length).toBeGreaterThan(0);

  // Assert each product has expected properties
  responseBody.products.forEach((product) => {
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("brand");
  });
});

test("POST to All product list", async ({ request }) => {
  // Make a POST request
  const response = await request.post("/api/productsList");

  // Assert that response status is equal to 200
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  // Assert that responseCode is equal to 405
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(405);

  // Assert that response contains following message "This request method is not supported."
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBe("This request method is not supported.");
});

test("POST to Search Product without body", async ({ request }) => {
  {
    // Make a POST request to search for products without body
    const response = await request.post("/api/searchProduct");

    // Assert that response status is equal to 200
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Assert that request was rejected by set responseCode equal to 400
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(400);

    // Assert that request was rejected by set errorMessage to "Bad request, search_product parameter is missing in POST request."
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBe(
      "Bad request, search_product parameter is missing in POST request."
    );
  }
});

test("POST to search product with valid body (products expected)", async ({
  request,
}) => {
  // Make a POST request with valid body
  const response = await request.post("/api/searchProduct", {
    form: { search_product: "top" },
  });

  // Assert that response status is equal to 200
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  // Assert that response code is equal to 200
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(200);

  // Assert that products are returned
  expect(responseBody).toHaveProperty("products");
  expect(responseBody.products.length).toBeGreaterThan(0);
});

test("POST to search product with valid body (products should be empty)", async ({
  request,
}) => {
  // Make a POST request with valid body
  const response = await request.post("/api/searchProduct", {
    form: { search_product: "xxx" },
  });

  // Assert that response status is equal to 200
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  // Assert that response code is equal to 200
  expect(responseBody).toHaveProperty("responseCode");
  expect(responseBody.responseCode).toBe(200);

  // Assert that products are returned
  expect(responseBody).toHaveProperty("products");
  expect(responseBody.products.length).toBe(0);
});
