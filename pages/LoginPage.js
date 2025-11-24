import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
    
    constructor(page) {
        super(page);
        
        this.loginNavButton = '#login2';
        this.usernameInput = '#loginusername';
        this.passwordInput = '#loginpassword';
        this.loginSubmitButton = 'button[onclick="logIn()"]';
        this.modalSelector = '#logInModal';
    }

    async ClickLoginNavButton() {

        await this.page.click(this.loginNavButton);
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.modalSelector, { state: 'visible' });
    };

    async fillCredentials(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);

    };

    async LoginSubmit() {
        await this.page.click(this.loginSubmitButton);
        await this.page.waitForTimeout(1000);
    };

    async isModalVisible() {
        return await this.page.locator(this.modalSelector).isVisible();
    }

    async isModalHidden() {
        return await this.page.locator(this.modalSelector).isHidden();
    }

};