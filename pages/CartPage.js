import { th } from "@faker-js/faker";
import { BasePage } from "./BasePage.js";

export class CartPage extends BasePage {

    constructor(page) {
        super(page);
        this.placeOrderButton = ('button:has-text("Place Order")');

        this.nameInput = ('#name');

        this.countryInput = ('#country');

        this.cityInput = ('#city');

        this.creditCardInput = ('#card');

        this.monthInput = ('#month');

        this.yearInput = ('#year');

        this.purchaseButton = ('button:has-text("Purchase")');


    }

    async checkout (data) {

        await this.page.click(this.placeOrderButton);
        await this.page.waitForSelector('#orderModal', { state: 'visible' });

        await this.page.fill(this.nameInput, data.name);
        await this.page.timeout(500);

        await this.page.fill(this.countryInput, data.country);
        await this.page.timeout(500);

        await this.page.fill(this.cityInput, data.city);
        await this.page.timeout(500);

        await this.page.fill(this.creditCardInput, data.creditCard);
        await this.page.timeout(500);

        await this.page.fill(this.monthInput, data.month);
        await this.page.timeout(500);

        await this.page.fill(this.yearInput, data.year);
        await this.page.timeout(500);

        await this.page.click(this.purchaseButton);
        await this.page.timeout(1000);
    }
};