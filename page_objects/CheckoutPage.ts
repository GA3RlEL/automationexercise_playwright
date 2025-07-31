import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { DeliveryData } from "../types/deliveryData";
import { ProductCart } from "../types/productCart";

export class CheckoutPage extends BaseTestClass {
  private addressDeliveryInfo: Locator;
  private products: Locator;
  private textArea: Locator;
  private placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator("tbody tr");
    this.addressDeliveryInfo = this.page.locator("#address_delivery");
    this.textArea = this.page.locator(".form-control");
    this.placeOrderButton = this.page.locator(".check_out");
  }

  async fillTextArea(message: string) {
    await this.textArea.fill(message);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async verifyAddressDeliveryInfo(deliveryData: DeliveryData) {
    const usernameWithTitle = await this.addressDeliveryInfo
      .locator(".address_firstname")
      .textContent();
    const company = await this.addressDeliveryInfo
      .locator(".address_address1")
      .first()
      .textContent();
    const address1 = await this.addressDeliveryInfo
      .locator(".address_address1")
      .nth(1)
      .textContent();
    const address2 = await this.addressDeliveryInfo
      .locator(".address_address1")
      .last()
      .textContent();
    const cityData = await this.addressDeliveryInfo
      .locator(".address_city")
      .textContent();
    const country = await this.addressDeliveryInfo
      .locator(".address_country_name")
      .textContent();
    const phoneNumber = await this.addressDeliveryInfo
      .locator(".address_phone")
      .textContent();

    expect(usernameWithTitle).toBe(
      deliveryData.title +
        " " +
        deliveryData.firstName +
        " " +
        deliveryData.lastName
    );

    expect(company).toBe(deliveryData.company);
    expect(address1).toBe(deliveryData.address1);
    expect(address2).toBe(deliveryData.address2);
    expect(cityData).toContain(deliveryData.city);
    expect(cityData).toContain(deliveryData.state);
    expect(cityData).toContain(deliveryData.zipCode);
    expect(country).toBe(deliveryData.country);
    expect(phoneNumber).toBe(deliveryData.mobileNumber);
  }

  async verifyProductDetails(products: ProductCart[]) {
    const cartProducts = await this.products.all();

    for (let i = 0; i < cartProducts.length - 1; i++) {
      const priceStr = await cartProducts[i]
        .locator(".cart_price")
        .textContent();
      const price = parseFloat(priceStr!.replace("Rs. ", "").trim());
      const quantityStr = await cartProducts[i]
        .locator(".cart_quantity")
        .textContent();
      const quantity = parseInt(quantityStr!.trim());
      const totalPriceStr = await cartProducts[i]
        .locator(".cart_total")
        .textContent();
      const totalPrice = parseFloat(totalPriceStr!.replace("Rs. ", "").trim());

      if (!priceStr || !quantityStr || !totalPriceStr) {
        throw new Error(
          "Price, quantity, or total price not found for the product"
        );
      }

      expect(price).toBe(products[i].price);
      expect(quantity).toBe(products[i].quantity);
      expect(totalPrice).toBe(products[i].totalPrice);
    }
  }
}
