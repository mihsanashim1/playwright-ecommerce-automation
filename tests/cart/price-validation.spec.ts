import { test, expect } from '../../fixtures/baseTest'
import { LoginPage } from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'

test('Validate product price and total', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const user = users.validUser;
    const product = products.multipleProducts;

    await loginPage.login(user.email, user.password);
    await page.waitForTimeout(3000);

    await productPage.verifyProductPageLoaded();
    await page.waitForTimeout(3000);
    await productPage.addMultipleProducts(product);
    await page.waitForTimeout(3000);
    await productPage.openCart();

    await page.waitForTimeout(3000);
    await cartPage.verifyCartHasItems();

    const cartPrices = await cartPage.getCartItemPrice();
    const expectedTotal = product.reduce((sum, item) => sum + item.price, 0);
    console.log(cartPrices);
    console.log(expectedTotal);
    const actualTotal = cartPrices.reduce((sum, price) => sum + price, 0);
    console.log(actualTotal);

    await page.waitForTimeout(3000);
    expect(actualTotal).toBe(expectedTotal);
})