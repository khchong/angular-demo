import { LoginPage } from './login.po';
import { browser, by, logging, protractor } from 'protractor';
import { DonationPage } from './donation.po';
import { DonationListPage } from './donation-list.po';

describe('App', () => {
  let loginPage: LoginPage;
  let donationPage: DonationPage;
  let donationListPage: DonationListPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    donationListPage = new DonationListPage();
    donationPage = new DonationPage();
  });

  describe('auth workflow', () => {

    it('should not be able to go to donation list without logging in ', async () => {
      await loginPage.navigateTo();

      try {
        await browser.get(`${browser.baseUrl}/admin`); // adminPage.navigateTo()
        fail('No window alert when there should be');
      } catch (e) {
        const alert = await browser.switchTo().alert();
        expect(alert.getText()).toEqual('Not Authorized');
        alert.dismiss();
      }
    });
  });

  describe('donation workflow', () => {

    it('should be able to donate, see in list, mark it as seen, and delete it', async () => {
      await loginPage.navigateTo();

      await loginPage.loginWithCredentials('kchong@classy.org', '12345678');

      expect(await donationListPage.donationListContainer.isPresent()).toBeTruthy();
      expect(await donationListPage.donationCards.count()).toEqual(0);

      await donationListPage.makeADonationLink.click();

      const firstNameId = await donationPage.fillOutDonationForm();

      await donationPage.submitDonationForm();

      expect(await donationListPage.donationCards.count()).toEqual(1);

      const donationCard = donationListPage.getDonationCardByFirstName(firstNameId);
      expect(donationCard.isPresent()).toBeTruthy();

      expect(await donationCard.getAttribute('class')).not.toMatch('seen');
      await donationCard.element(by.css('.seen-button')).click();
      expect(await donationCard.getAttribute('class')).toMatch('seen');

      await donationCard.element(by.css('.delete-button')).click();
      expect(donationCard.isPresent()).toBeFalsy();
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
