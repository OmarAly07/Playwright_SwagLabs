const { expect } = require('@playwright/test');
const P04_CheckoutPage = require('./P04_CheckoutPage');

class P03_CartPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async removeThelastProduct() {
    await this.page.locator('.cart_item').last().locator('.btn_secondary').click();
  }

  async getPageTitle() {
    return this.page.locator('.title');
  }

  async getCartCount() {
    return this.page.locator('.shopping_cart_badge');
  }

  async getToCheckOutPage() {
    await this.page.locator('.checkout_button').click();
    return new P04_CheckoutPage(this.page);
  }
}

module.exports = P03_CartPage;