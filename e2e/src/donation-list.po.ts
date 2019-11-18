import { browser, by, element, ElementFinder } from 'protractor';

export class DonationListPage {

  get donationListContainer() { return element(by.css('app-donation-list')); }
  get donationCards() { return element.all(by.css('app-donation-list app-donation-card')); }
  get makeADonationLink() { return element(by.css('app-donation-list .make-donation-link')); }

  navigateTo(): Promise<any> {
    return browser.get(`${browser.baseUrl}/donation-list`) as Promise<any>;
  }

  getDonationCardByFirstName(firstName: string): ElementFinder {
    return element(by.css(`app-donation-list app-donation-card .donation-card__${firstName}`));
  }
}
