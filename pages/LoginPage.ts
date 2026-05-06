import {Page} from '@playwright/test'

export class LoginPage{
    readonly page:Page;

    constructor(page: Page){
        this.page = page;
    }

    emailInput='#user-name';
    passwordInput='#password';
    loginButton='#login-button';
    errorMessage = '[data-test="error"]';

    async navigate(){
        await this.page.goto('/');
    }

    async login(email: string, password: string){
        await this.page.fill(this.emailInput,email);
        await this.page.fill(this.passwordInput,password);
        await this.page.click(this.loginButton);
    }

    async verifyLoginError(){
        await this.page.waitForSelector(this.errorMessage);
    }
}