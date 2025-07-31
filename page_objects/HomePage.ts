import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";

export class HomePage extends BaseTestClass {
  constructor(page: Page) {
    super(page);
  }
}
