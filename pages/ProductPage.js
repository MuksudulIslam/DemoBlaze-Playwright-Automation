import { BasePage } from "./BasePage.js";

export class productPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = page.locator('a:has-text("Add to cart")');

    }

    async addToCart() {
        await this.page.click(this.addToCartButton);
        await this.page.waitForTimeout(1000);
    }

};