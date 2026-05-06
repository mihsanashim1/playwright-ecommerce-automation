import {test,expect} from '../../fixtures/baseTest'
import { LoginPage} from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'


test('Cart should persist after navigating back from checkout', async ({page})=>{
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

    await checkoutPage.goBackToCart();

    const cartItems = await cartPage.getCartItemNames();
    console.log(cartItems);
    const productName = product.map(item=> item.name);
    console.log(productName);
    for (const item of productName){
        console.log(item);
        expect(cartItems).toContain(item);
    }

})