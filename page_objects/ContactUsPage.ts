import { expect, Locator, Page } from "@playwright/test";

export class ContactUsPage {
  private getInTouchText: Locator;
  private nameTextInput: Locator;
  private emailTextInput: Locator;
  private subjectTextInput: Locator;
  private messageTextInput: Locator;
  private fileInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;
  private homeButton: Locator;

  constructor(private page: Page) {
    this.getInTouchText = this.page.locator(".contact-form h2");
    this.nameTextInput = this.page.locator("input[data-qa*='name']");
    this.emailTextInput = this.page.locator("input[data-qa*='email']");
    this.subjectTextInput = this.page.locator("input[data-qa*='subject']");
    this.messageTextInput = this.page.locator("textarea[data-qa*='message']");
    this.fileInput = this.page.locator("input[type='file']");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.successMessage = this.page.locator(".alert-success").first();
    this.homeButton = this.page.locator("#form-section a[href='/']");
  }

  async verifyIfGetInTouchTextIsVisible() {
    const isVisible = await this.getInTouchText.isVisible();
    expect(isVisible).toBeTruthy();
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

  async confirmSuccessMessage() {
    const isVisible = await this.successMessage.isVisible();
    expect(isVisible).toBeTruthy();
    const messageText = await this.successMessage.textContent();
    expect(messageText).toContain(
      "Success! Your details have been submitted successfully."
    );
  }

  async goToHomePage() {
    await this.homeButton.click();
  }
}
