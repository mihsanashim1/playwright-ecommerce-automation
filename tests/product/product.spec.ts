import { test, expect } from '../../fixtures/baseTest'
import users from '../../test-data/users.json'
import { LoginPage } from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import products from '../../test-data/products.json'

test('add product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const user = users.validUser;
  const product = products.sampleProduct;
  const allProduct = products.multipleProducts;

  await loginPage.login(user.email, user.password);

  await productPage.verifyProductPageLoaded();
  // await productPage.addFirstProductToCart();
  // await productPage.addProductByName(product.sku);
  await productPage.addMultipleProducts(allProduct);
  // await productPage.addProductsByName(product.name);
  await productPage.openCart();

  await expect(page.locator('.inventory_item_name').first()).toContainText(product.name);
})