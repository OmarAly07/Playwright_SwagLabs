const { expect } = require('@playwright/test');
const P02_ProductsPage = require('./P02_ProductsPage');

class P01_LoginPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async userLogin(username, password) {
    await this.page.locator('#user-name').fill(username);
    await this.page.locator('#password').fill(password);
  }

  async confirmLogin() {
    await this.page.locator('#login-button').click();
    return new P02_ProductsPage(this.page);
  }
}

module.exports = P01_LoginPage;