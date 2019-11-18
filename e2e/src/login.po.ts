import { browser, by, element } from 'protractor';

export class LoginPage {

  get email() { return element(by.css('#email')); }
  get password() { return element(by.css('#password')); }
  get login() { return element(by.css('.login-button')); }

  navigateTo(): Promise<any> {
    return browser.get(`${browser.baseUrl}/login`) as Promise<any>;
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
    this.email.sendKeys(email);
    this.password.sendKeys(password);
    await this.login.click();
  }
}
