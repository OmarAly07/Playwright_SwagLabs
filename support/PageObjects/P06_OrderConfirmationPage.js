const { expect } = require('@playwright/test');

class P06_OrderConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async getOrderConfirmationMessage() {
    return this.page.locator('.complete-header');
  }

  async getBackToHome() {
    await this.page.locator('#back-to-products').click();
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
  }
}

module.exports = P06_OrderConfirmationPage;