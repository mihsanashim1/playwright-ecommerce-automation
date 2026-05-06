import { Page } from "@playwright/test";

export class CheckoutPage{
    readonly page:Page;

    constructor(page:Page){
        this.page=page;
    }

    firstNameInput='#first-name';
    lastNameInput='#last-name';
    postalCodeInput='#postal-code';
    continueButton='#continue';
    finishButton='#finish';
    successMessage='.complete-header';

    summarySubtotal = '.summary_subtotal_label';
    summaryTax = '.summary_tax_label';
    summaryTotal = '.summary_total_label';

    errorMessage = '[data-test="error"]'
    async fillCheckoutInformation(
        firstName:string,
        lastName:string,
        postalCode:string
    ){
        await this.page.fill(this.firstNameInput,firstName);
        await this.page.fill(this.lastNameInput,lastName);
        await this.page.fill(this.postalCodeInput,postalCode);
    }

    async continueCheckout(){
        await this.page.click(this.continueButton);
    }

    async finishOrder(){
        await this.page.click(this.finishButton)
    }

    async verifyOrderSuccess() {
        await this.page.waitForSelector(this.successMessage);
    }

    async getSubtotal() : Promise<number>{
        const text = await this.page.locator(this.summarySubtotal).innerText();
        return parseFloat(text.replace('Item total: $',' ').trim());
    }

    async getTax() : Promise<number>{
        const text = await this.page.locator(this.summaryTax).innerText();
        return parseFloat(text.replace("Tax: $"," ").trim());
    }

    async getTotal(): Promise<number>{
        const text = await this.page.locator(this.summaryTotal).innerText();
        return parseFloat(text.replace("Total: $"," ").trim());
    }

    async getSuccessMessage(): Promise <string> {
        return this.page.locator(this.successMessage).innerText();
    }

    async clickContinueWithoutInfo(){
        await this.page.click(this.continueButton);
    }

    async goBackToCart(){
        await this.page.goBack();
        // await this.page.click('[data-test="cancel"]');
    }
}