const { expect } = require('@playwright/test');
const P06_OrderConfirmationPage = require('./P06_OrderConfirmationPage');

class P05_OverViewPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async validateProductsPrice() {
    let totalSum = 0;
    const priceElements = await this.page.locator('.inventory_item_price').all();
    
    for (const element of priceElements) {
      const priceText = await element.innerText();
      const price = parseFloat(priceText.replace('$', '').trim());
      totalSum += price;
    }

    const subtotalText = await this.page.locator('.summary_subtotal_label').innerText();
    const subtotal = parseFloat(subtotalText.replace('Item total: $', '').trim());
    expect(subtotal).toBeCloseTo(totalSum, 2);

    const taxText = await this.page.locator('.summary_tax_label').innerText();
    const tax = parseFloat(taxText.replace('Tax: $', '').trim());

    const totalText = await this.page.locator('.summary_total_label').innerText();
    const total = parseFloat(totalText.replace('Total: $', '').trim());
    const expectedTotal = totalSum + tax;
    expect(total).toBeCloseTo(expectedTotal, 2);
  }

  async getToFinishCheckOutPage() {
    await this.page.locator('#finish').click();
    return new P06_OrderConfirmationPage(this.page);
  }
}

module.exports = P05_OverViewPage;