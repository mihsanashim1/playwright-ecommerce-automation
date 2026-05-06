import {test,expect} from '../../fixtures/baseTest'
import users from '../../test-data/users.json'
import { LoginPage } from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import address from '../../test-data/address.json'

test('Complete checkout flow', async({page})=>{
    const loginPage=new LoginPage(page);
    const productPage=new ProductPage(page);
    const cartPage=new CartPage(page);
    const checkoutPage=new CheckoutPage(page);
    const user=users.validUser;
    const shippingAddress=address.shippingAddress;

    await loginPage.login(user.email, user.password);

    await productPage.verifyProductPageLoaded();
    await productPage.addFirstProductToCart();
    await productPage.openCart();

    await cartPage.verifyCartHasItems();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(
        shippingAddress.firstName,
        shippingAddress.lastName,
        shippingAddress.postalCode
    );

    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderSuccess();

    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
})