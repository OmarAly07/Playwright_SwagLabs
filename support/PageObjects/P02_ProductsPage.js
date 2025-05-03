const { expect } = require('@playwright/test');
const P03_CartPage = require('./P03_CartPage');

class P02_ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async addProductsToCart(numberOfProducts) {
    const products = await this.page.locator('.inventory_item').all();
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, numberOfProducts);

    for (const product of selectedProducts) {
      await product.locator('.btn_inventory').click();
    }

    return selectedProducts.length;
  }

  async filterProducts(filterType) {
    await this.page.locator('.product_sort_container').selectOption(filterType);
  }

  async selectDesiredProducts(count) {
    const products = await this.page.locator('.inventory_item').all();
    const selected = products.slice(0, count);

    for (const product of selected) {
      const productName = await product.locator('.inventory_item_name').innerText();
      console.log(`Selected product: ${productName}`);
      await product.locator('.btn_inventory').click();
    }
  }

  async getCartCount() {
    return this.page.locator('.shopping_cart_badge');
  }

  async getToCartPage() {
    await this.page.locator('.shopping_cart_link').click();
    return new P03_CartPage(this.page);
  }
}

module.exports = P02_ProductsPage;