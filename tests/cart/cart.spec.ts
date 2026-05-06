import {test,expect} from '../../fixtures/baseTest';
import users from '../../test-data/users.json';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('verify cart and proceed to checkout', async ({page})=>{
    const loginPage= new LoginPage(page);
    const productPage= new ProductPage(page);
    const cartPage = new CartPage(page);
    const user = users.validUser;

    await loginPage.login(user.email,user.password);

    await productPage.verifyProductPageLoaded();
    await productPage.addFirstProductToCart();
    await productPage.openCart();

    await cartPage.verifyCartHasItems();
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
})
