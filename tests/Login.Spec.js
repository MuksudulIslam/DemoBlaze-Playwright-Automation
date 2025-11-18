import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { testData } from '../utils/testData.js';
import { TestStorage } from '../utils/storage.js';


test.describe("Login Tests", () => {
    let login;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await page.goto(testData.baseURL);

        await login.ClickLoginNavButton();
        await page.waitForTimeout(1000);
    });

    test("Login a user using empty username and password", async ({ page }) => {
    
    
    // Wait for modal to be visible
    await expect(page.locator("#loginInModal")).toBeVisible();
    
    // Set up dialog handler
    let dialogHandled = false;
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain("Please fill out Username and Password.");
        await dialog.accept();
        dialogHandled = true;
    });
    
    // Fill with empty credentials and click signup
    await login.fillCredentials("", "");
    await login.loginSubmit();
    
    // Wait a bit to ensure dialog is handled
    await page.waitForTimeout(500);
    expect(dialogHandled).toBe(true);

    // The modal should remain visible after accepting the dialog for empty credentials
    await expect(page.locator("#loginInModal")).toBeVisible();
    
    )};
)};
