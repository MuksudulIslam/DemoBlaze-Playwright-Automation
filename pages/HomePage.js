import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
    constructor (page) {
        super(page);

        this.homeNavButton = ('a:has-text("Home")');
        this.productCard = ('.card-block');
        this.nextButton = ('#next2');
    }

    async openProductByName(name) {
        await this.page.click();(this.homeNavButton); 
    }
};