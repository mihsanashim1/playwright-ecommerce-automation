import {test,expect} from '../../fixtures/baseTest'
import { LoginPage } from '../../pages/LoginPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import users from '../../test-data/users.json'
import products from '../../test-data/products.json'

test('Remove specific product from cart.', async({page})=>{
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const user=users.validUser;
    const product=products.multipleProducts;

    const productToRemove = product[0];
    const remainingProduct = product[1];

    await loginPage.login(user.email,user.password);

    await productPage.verifyProductPageLoaded();
    await productPage.addMultipleProducts(product);
    await productPage.openCart();

    await cartPage.verifyCartHasItems();
    await cartPage.removeProductsByName(product[0]);

    const cartItems = await cartPage.getCartItemNames();

    expect(cartItems).not.toContain(productToRemove);

    expect(cartItems).toContain(remainingProduct);

    expect(cartItems.length).toBe(product.length - 1);
})