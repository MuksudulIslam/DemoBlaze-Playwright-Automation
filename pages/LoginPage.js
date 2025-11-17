import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
    
    constructor(page) {
        super(page);
        this.loginNavButton = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('button:has-text("Log in")');
    }

};