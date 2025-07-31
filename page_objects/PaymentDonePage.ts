import { Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class PaymentDonePage extends BaseTestClass {
  constructor(page: Page) {
    super(page);
  }
}
