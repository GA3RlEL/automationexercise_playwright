import { Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import { PaymentData } from "../types/paymentData";

export class PaymentPage extends BaseTestClass {
  private paymentForm: Locator;
  private nameOnCardInput: Locator;
  private cardNumberInput: Locator;
  private cvcInput: Locator;
  private expiryMonthInput: Locator;
  private expiryYearInput: Locator;
  private confirmOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentForm = this.page.locator("#payment-form");
    this.nameOnCardInput = this.paymentForm.locator(
      "input[name*='name_on_card']"
    );
    this.cardNumberInput = this.paymentForm.locator(
      "input[name*='card_number']"
    );
    this.cvcInput = this.paymentForm.locator("input[name*='cvc']");
    this.expiryMonthInput = this.paymentForm.locator(
      "input[name*='expiry_month']"
    );
    this.expiryYearInput = this.paymentForm.locator(
      "input[name*='expiry_year']"
    );
    this.confirmOrderButton = this.page.locator("#submit");
  }

  async fillPaymentDetailsAndConfirm(paymentDetails: PaymentData) {
    await this.nameOnCardInput.fill(paymentDetails.nameOnCard);
    await this.cardNumberInput.fill(paymentDetails.cardNumber);
    await this.cvcInput.fill(paymentDetails.cvc);
    await this.expiryMonthInput.fill(paymentDetails.expiryMonth);
    await this.expiryYearInput.fill(paymentDetails.expiryYear);
    await this.confirmOrderButton.click();
  }
}
