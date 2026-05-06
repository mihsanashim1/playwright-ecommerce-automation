import {test,expect} from "../../fixtures/baseTest"
import { LoginPage } from "../../pages/LoginPage"
import { ProductPage } from "../../pages/ProductPage"
import { CartPage } from "../../pages/CartPage"
import { CheckoutPage } from "../../pages/CheckoutPage"
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'
import addresses from '../../test-data/address.json'

test('Validate checkout totals', async ({page})=>{
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const user = users.validUser;
    const product = products.multipleProducts;
    const address = addresses.shippingAddress;

    await loginPage.login(user.email, user.password);

    await productPage.verifyProductPageLoaded();
    await productPage.addMultipleProducts(product);
    await productPage.openCart();

    await cartPage.verifyCartHasItems();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(address.firstName,address.lastName,address.postalCode);
    await checkoutPage.continueCheckout();

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    console.log(subtotal);
    const actualSubtotal = await product.reduce((sum,item)=>sum + item.price,0);
    console.log(actualSubtotal);
    expect(subtotal.toFixed(2)).toBe(actualSubtotal.toFixed(2));
    expect(total).toBe(subtotal + tax);

    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderSuccess();
    const successMessage = await checkoutPage.getSuccessMessage();

    expect(successMessage).toContain('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete/);

    await productPage.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(0);
})