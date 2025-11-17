import { th } from "@faker-js/faker";
import { BasePage } from "./BasePage";

export class SignupPage extends BasePage {

    constructor(page) {
        super(page);

        this.signupNavButton = page.locator('#signin2');

        this.usernameInput = page.locator('#sign-username');

        this.passwordInput = page.locator('#sign-password');

        this.signupButton = page.locator('button:has-text("Sign up")');
    }

    async signup(username, password) {

        await this.page.click(this.signupNavButton);
        await this.page.waitForSelector('#signInModal', { state: 'visible' });

        await this.page.fill(this.usernameInput, username);
        await this.page.timeout(500);

        await this.page.fill(this.passwordInput, password);
        await this.page.timeout(500);

        await this.page.click(this.signupButton);
        aw
    
    }
}