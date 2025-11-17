import { BasePage } from "./BasePage.js";

export class LogoutPage extends BasePage {

    constructor(page) {
        super(page);
        this.logoutNavButton = page.locator('#logout2');
    }

    async logout() {
        await this.page.click(this.logoutNavButton);
        await this.page.waitForTimeout(1000);
    }
};