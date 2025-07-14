import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { AccountCreatedPage } from "./AccountCreatedPage";
import { DeleteAccountPage } from "./DeleteAccountPage";

export class POManager {
  public homePage: HomePage;
  public loginPage: LoginPage;
  public signupPage: SignupPage;
  public accountCreatedPage: AccountCreatedPage;
  public deleteAccountPage: DeleteAccountPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.signupPage = new SignupPage(this.page);
    this.accountCreatedPage = new AccountCreatedPage(this.page);
    this.deleteAccountPage = new DeleteAccountPage(this.page);
  }

  getHomePage(): HomePage {
    return this.homePage;
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getSignupPage(): SignupPage {
    return this.signupPage;
  }

  getAccountCreatedPage(): AccountCreatedPage {
    return this.accountCreatedPage;
  }

  getDeleteAccountPage(): DeleteAccountPage {
    return this.deleteAccountPage;
  }
}
