import { Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class CartPage extends BaseTestClass {
  constructor(page: Page) {
    super(page);
  }
}
