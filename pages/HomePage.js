import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
    constructor (page) {
        super(page);

        this.homeNavButton = page.locator('a:has-text("Home")');
        this.productCard = page.locator('.card-block');
        this.nextButton = page.locator('#next2');
    }

    async openProductByName(name) {
        await this.page.click();(this.homeNavButton); 
    }
};