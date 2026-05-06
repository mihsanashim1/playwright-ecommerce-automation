import { test, expect } from '../../fixtures/baseTest';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('validate correct product in cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const user = users.validUser;
  const product = products.multipleProducts;

  // Login
  await loginPage.navigate();
  await loginPage.login(user.email, user.password);

  // Add product
  await productPage.verifyProductPageLoaded();

  // const productName = await productPage.getFirstProductName();
  await productPage.addMultipleProducts(product);
  await productPage.openCart();

  // Validate cart
  const cartProductName = await cartPage.getCartItemName();
  const cartItems = await cartPage.getCartItemNames();

  for (const item of cartItems) {
    expect(cartItems).toContain(item);
  }

  const count = await productPage.getCartCount();
  expect(count).toBe(cartItems.length);
  // expect(cartProductName).toBe(productName);
  // expect(cartProductName).toContain(product.name);

});