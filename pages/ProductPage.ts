import { Page } from "@playwright/test";

interface Product{
    name: string;
    price: number;
}

export class ProductPage {
    constructor(readonly page: Page) {
        this.page = page;
    }

    inventoryContainer = '.inventory_list';
    inventoryItem = '.inventory_item';
    productName = '.inventory_item_name';
    AddToCartButton = 'button[data-test^="add-to-cart"]';
    cartIcon = '.shopping_cart_link';
    cartBadge = '.shopping_cart_badge';

    async verifyProductPageLoaded() {
        await this.page.waitForSelector(this.inventoryContainer);
    }

    async addFirstProductToCart() {
        await this.page.locator(this.AddToCartButton).first().click();
    }

    async openCart() {
        await this.page.click(this.cartIcon);
    }

    async getFirstProductName(): Promise<string> {
        return await this.page.locator(this.productName).first().innerText();
    }

    async addProductByName(productName: string) {
        const addToCart = this.page
            .locator(`#add-to-cart-${productName}`)

        await addToCart.click();
    }

    async addProductByName1(productName: string) {
        const product = this.page.locator(this.inventoryItem)
            .filter({ hasText: productName });
        await product.first().getByRole('button', { name: "Add to cart" }).click();

    }

    async addMultipleProducts(products: Product[]) {
        for (const prod of products) {
            const product = this.page.locator(this.inventoryItem)
                .filter({ hasText: prod.name });
            await product.first().getByRole('button', { name: "Add to cart" }).click();
        }

    }

    async addProductsByName(productName: string) {
        const products = this.page.locator(this.inventoryItem);
        const count = await products.count();

        for (let i = 0; i < count; i++) {
            const product = products.nth(i);
            const name = await product.locator(this.productName).innerText();

            if (name.trim() === productName.trim()) {
                await product.locator('button').click();
                return;
            }
        }

        throw new Error(`Product "${productName}" not found`);
    }

    async getCartCount(): Promise<number> {
        const countText = await this.page.locator(this.cartBadge).innerText();
        return parseInt(countText);
    }
}