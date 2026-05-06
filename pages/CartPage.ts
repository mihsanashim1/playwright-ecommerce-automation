import { Page } from "@playwright/test";

interface Product{
    name: string;
    price: number;
}

export class CartPage{
    readonly page: Page;

    constructor(page:Page){
        this.page=page;
    }

    cartItemName = '.inventory_item_name';
    cartItemPrice = '.inventory_item_price';
    cartItem = '.cart_item';
    removeButton = 'button[data-test^="remove"]';
    checkoutButton = '#checkout';

    errorMessage = 'data-test="error"';

    async verifyCartHasItems() {
        await this.page.waitForSelector(this.cartItem);
    }

    async removeFirstItem() {
        await this.page.locator(this.removeButton).first().click();
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async getCartItemName(): Promise<string> {
        return await this.page.locator(this.cartItemName).first().innerText();
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.page.locator(this.cartItemName).allTextContents();
    }

    async removeProductsByName(productName: Product){
        const items = this.page.locator(this.cartItem);
        const count = await items.count();

        for (let i=0; i<count;i++){
            const cart=items.nth(i);
            const name = await cart.locator(this.cartItemName).innerText();

            if(name.trim() === productName.name.trim()){
                await cart.getByRole('button',{name:"Remove"}).click();
                return;
            }
        }

        throw new Error(`Product "${productName}" not found in cart.`)
    }

    async getCartItemPrice(): Promise<number[]> {
        const priceTexts = await this.page.locator(this.cartItemPrice).allTextContents();

        return priceTexts.map(price=>{
            return parseFloat(price.replace("$"," ").trim());
        });
    }
}