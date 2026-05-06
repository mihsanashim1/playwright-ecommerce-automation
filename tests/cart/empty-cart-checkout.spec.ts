import {test,expect} from '../../fixtures/baseTest'
import { LoginPage} from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import users from '../../test-data/users.json'



test('Should not allow checkout with empty cart.', async ({page})=>{
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const user = users.validUser;

    await loginPage.login(user.email, user.password);
    
    await productPage.verifyProductPageLoaded();
    await productPage.openCart();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(page.locator('.cart_item')).toHaveCount(0);
})