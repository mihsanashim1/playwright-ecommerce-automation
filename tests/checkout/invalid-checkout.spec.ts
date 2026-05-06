import {test,expect} from '../../fixtures/baseTest'
import { LoginPage} from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'


test('Checkout should fail with empty fields', async ({page})=>{
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = users.validUser;
    const product = products.multipleProducts;

    await loginPage.login(user.email, user.password);
    
    await productPage.verifyProductPageLoaded();
    await productPage.addMultipleProducts(product);
    await productPage.openCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.clickContinueWithoutInfo();

    await expect(page.locator(checkoutPage.errorMessage)).toBeVisible();

    await expect(page.locator(checkoutPage.errorMessage)).toContainText('First Name is required')
})