import { expect, Locator, Page } from "@playwright/test";
import { BaseTestClass } from "./BaseTestClass";
import path from "path";

export class ContactUsPage extends BaseTestClass {
  private nameTextInput: Locator;
  private emailTextInput: Locator;
  private subjectTextInput: Locator;
  private messageTextInput: Locator;
  private fileInput: Locator;
  private submitButton: Locator;
  private homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameTextInput = this.page.locator("input[data-qa*='name']");
    this.emailTextInput = this.page.locator("input[data-qa*='email']");
    this.subjectTextInput = this.page.locator("input[data-qa*='subject']");
    this.messageTextInput = this.page.locator("textarea[data-qa*='message']");
    this.fileInput = this.page.locator("input[type='file']");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.homeButton = this.page.locator("#form-section a[href='/']");
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string,
    filePath: string
  ) {
    await this.nameTextInput.fill(name);
    await this.emailTextInput.fill(email);
    await this.subjectTextInput.fill(subject);
    await this.messageTextInput.fill(message);
    await this.fileInput.setInputFiles(filePath);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async goToHomePage() {
    await this.homeButton.click();
  }
}
