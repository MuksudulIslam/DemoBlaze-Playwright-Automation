import { BasePage } from "./BasePage";

export class SignupPage extends BasePage {
    constructor(page) {
        super(page);

        this.signupNavButton = '#signin2';
        this.usernameInput = '#sign-username';
        this.passwordInput = '#sign-password';
        this.signupButton = 'button:has-text("Sign up")';
        this.modalSelector = '#signInModal';
    }

    async clickSignupButton() {
        await this.page.click(this.signupNavButton);
        await this.page.waitForSelector(this.modalSelector, { state: 'visible' });
    }

    async fillCredentials(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
    }

    async clickSignup() {
        await this.page.click(this.signupButton);
    }

    async signup(username, password) {
        await this.clickSignupButton();
        await this.fillCredentials(username, password);
        await this.clickSignup();
    }

    async isModalVisible() {
        return await this.page.locator(this.modalSelector).isVisible();
    }

    async isModalHidden() {
        return await this.page.locator(this.modalSelector).isHidden();
    }
};