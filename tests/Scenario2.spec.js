const { test, expect } = require('@playwright/test');
const P01_LoginPage = require('../support/PageObjects/P01_LoginPage');
const testData = require('../test-data');

test.describe('End To End Scenario 2 SwagLabs E-commerce', () => {
  let page;
  let loginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new P01_LoginPage(page);
  });

  test('Successful Login > Filter Products > Select First Two Products > Get To Cart > Remove Second Product From Cart > Complete Checkout', async () => {
    // Login
    await page.goto(testData.urls.base_url);
    await loginPage.userLogin(testData.credentials.userName, testData.credentials.password);
    const productsPage = await loginPage.confirmLogin();

    // Filter and select products
    await expect(page).toHaveURL(testData.urls.products_url);
    await productsPage.filterProducts('Price (low to high)');
    await productsPage.selectDesiredProducts(2);
    await expect(await productsPage.getCartCount()).toHaveText('2');

    // Go to cart and remove product
    const cartPage = await productsPage.getToCartPage();
    await expect(page).toHaveURL(testData.urls.cart_url);
    await expect(await cartPage.getPageTitle()).toHaveText('Your Cart');
    await cartPage.removeThelastProduct();
    await expect(await cartPage.getCartCount()).toHaveText('1');

    // Checkout
    const checkoutPage = await cartPage.getToCheckOutPage();
    await expect(page).toHaveURL(testData.urls.checkout_url);
    await checkoutPage.fillCheckOutData(
      testData.checkoutData.FirstName,
      testData.checkoutData.LastName,
      testData.checkoutData.zipCode
    );

    const overviewPage = await checkoutPage.confirmCheckOut();
    await expect(page).toHaveURL(testData.urls.overview_url);
    await overviewPage.validateProductsPrice();

    const orderConfirmationPage = await overviewPage.getToFinishCheckOutPage();
    await expect(page).toHaveURL(testData.urls.checkout_complete_url);
    await expect(await orderConfirmationPage.getOrderConfirmationMessage()).toHaveText('Thank you for your order!');
    await orderConfirmationPage.getBackToHome();
    await orderConfirmationPage.logout();
  });
});