const { expect } = require('@playwright/test');
const P05_OverViewPage = require('./P05_OverViewPage');

class P04_CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async fillCheckOutData(firstName, lastName, postalCode) {
    await this.page.locator('#first-name').fill(firstName);
    await this.page.locator('#last-name').fill(lastName);
    await this.page.locator('#postal-code').fill(postalCode);
  }

  async confirmCheckOut() {
    await this.page.locator('#continue').click();
    return new P05_OverViewPage(this.page);
  }
}

module.exports = P04_CheckoutPage;