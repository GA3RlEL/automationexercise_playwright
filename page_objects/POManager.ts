import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { AccountCreatedPage } from "./AccountCreatedPage";
import { DeleteAccountPage } from "./DeleteAccountPage";
import { ContactUsPage } from "./ContactUsPage";
import { TestCasePage } from "./TestCasesPage";
import { ProductsPage } from "./ProductsPage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";

export class POManager {
  public homePage: HomePage;
  public loginPage: LoginPage;
  public signupPage: SignupPage;
  public accountCreatedPage: AccountCreatedPage;
  public deleteAccountPage: DeleteAccountPage;
  public contactUsPage: ContactUsPage;
  public testCasesPage: TestCasePage;
  public productsPage: ProductsPage;
  public productDetailsPage: ProductDetailsPage;
  public cartPage: CartPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.signupPage = new SignupPage(this.page);
    this.accountCreatedPage = new AccountCreatedPage(this.page);
    this.deleteAccountPage = new DeleteAccountPage(this.page);
    this.contactUsPage = new ContactUsPage(this.page);
    this.testCasesPage = new TestCasePage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.cartPage = new CartPage(this.page);
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

  getContactUsPage(): ContactUsPage {
    return this.contactUsPage;
  }

  getTestCasesPage(): TestCasePage {
    return this.testCasesPage;
  }

  getProductsPage(): ProductsPage {
    return this.productsPage;
  }

  getProductsDetailsPage(): ProductDetailsPage {
    return this.productDetailsPage;
  }

  getCartPage(): CartPage {
    return this.cartPage;
  }
}
