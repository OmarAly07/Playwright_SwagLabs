const { test, expect } = require('@playwright/test');
const P01_LoginPage = require('../support/PageObjects/P01_LoginPage');
const testData = require('../test-data');


test.describe('End To End Scenario 1 SwagLabs E-commerce', () => {
  let page;
  let loginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new P01_LoginPage(page);
  });

  test('Successful Login > Select Products > Go To Cart > Complete Checkout', async () => {
    // Login
    await page.goto(testData.urls.base_url);
    await loginPage.userLogin(testData.credentials.userName, testData.credentials.password);
    const productsPage = await loginPage.confirmLogin();

    // Select products
    await expect(page).toHaveURL(testData.urls.products_url);
    const count = await productsPage.addProductsToCart(5);
    const cartCount = await productsPage.getCartCount();
    await expect(cartCount).toHaveText(count.toString());

    // Go to cart
    const cartPage = await productsPage.getToCartPage();
    await expect(page).toHaveURL(testData.urls.cart_url);
    await expect(await cartPage.getPageTitle()).toHaveText('Your Cart');

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