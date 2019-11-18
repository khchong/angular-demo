import { browser, by, element } from 'protractor';
import * as faker from 'faker';
import * as uuid from 'uuid/v4';

export class DonationPage {

  get firstName() { return element(by.css('app-donation #firstName')); }
  get lastName() { return element(by.css('app-donation #lastName')); }
  get email() { return element(by.css('app-donation #email')); }
  get address() { return element(by.css('app-donation #address')); }
  get address2() { return element(by.css('app-donation #address2')); }
  get city() { return element(by.css('app-donation #city')); }
  get zipcode() { return element(by.css('app-donation #zipcode')); }
  get amount() { return element(by.css('app-donation #amount')); }

  get donationForm() { return element(by.css('app-donation > .donation-form > form')); }

  navigateTo(): Promise<any> {
    return browser.get(`${browser.baseUrl}/donation`) as Promise<any>;
  }

  async fillOutDonationForm(): Promise<string> {
    const firstName = uuid();

    // we will use the first name as the identifier since it will be a random UID
    await Promise.all([
      this.firstName.sendKeys(firstName),
      this.lastName.sendKeys(faker.name.lastName()),
      this.email.sendKeys(faker.internet.email()),
      this.address.sendKeys(faker.address.streetAddress()),
      this.address2.sendKeys(faker.address.secondaryAddress()),
      this.city.sendKeys(faker.address.city()),
      this.zipcode.sendKeys(faker.address.zipCode()),
      this.amount.sendKeys(100)
    ]);

    return firstName;
  }

  async submitDonationForm(): Promise<void> {
    await this.donationForm.submit();
  }
}

