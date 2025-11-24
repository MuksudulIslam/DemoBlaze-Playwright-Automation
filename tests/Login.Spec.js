import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { testData } from '../utils/testData.js';
import { TestStorage } from '../utils/storage.js';

test.describe("Login Tests", () => {
    let login;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await page.goto(testData.baseURL);

        await login.ClickLoginNavButton();
        await expect(page.locator("#logInModal")).toBeVisible();
    });

    test("Login a user using empty username and password", async ({ page }) => {

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Please fill out Username and Password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill blank credentials
        await login.fillCredentials("", "");

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting empty credentials
        await expect(page.locator("#logInModal")).toBeVisible();
    });

    test("Login a user using valid username and empty password", async ({ page }) => { 
        
        const storedUser = TestStorage.get('testUser');

        expect(storedUser).toBeTruthy();
        expect(storedUser.username).toBeTruthy();

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Please fill out Username and Password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill username and blank password
        await login.fillCredentials(storedUser.username, "");

        await page.waitForTimeout(500);

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting with empty password
        await expect(page.locator("#logInModal")).toBeVisible();
    });


    test("Login a user using empty username and valid password", async ({ page }) => { 
        
        const storedUser = TestStorage.get('testUser');

        expect(storedUser).toBeTruthy();
        expect(storedUser.password).toBeTruthy();

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Please fill out Username and Password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill blank username and password
        await login.fillCredentials("", storedUser.password);

        await page.waitForTimeout(500);

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting with empty username
        await expect(page.locator("#logInModal")).toBeVisible();
    });

    test("Login a user using invalid username and invalid password", async ({ page }) => { 
        

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Wrong password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill invalid credentials
        await login.fillCredentials("invalidUser", "invalidPass");

        await page.waitForTimeout(500);

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting invalid credentials
        await expect(page.locator("#logInModal")).toBeVisible();
    });

    test("Login a user using valid username and invalid password", async ({ page }) => { 
        

        const storedUser = TestStorage.get('testUser');

        expect(storedUser).toBeTruthy();
        expect(storedUser.username).toBeTruthy();

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Wrong password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill valid username and invalid password
        await login.fillCredentials(storedUser.username, "invalidPass");

        await page.waitForTimeout(500);

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting invalid password
        await expect(page.locator("#logInModal")).toBeVisible();
    });

    test("Login a user using invalid username and valid password", async ({ page }) => { 
        

        const storedUser = TestStorage.get('testUser');

        expect(storedUser).toBeTruthy();
        expect(storedUser.password).toBeTruthy();

        // Track whether dialog is handled
        let dialogHandled = false;

        // Dialog handler BEFORE triggering login
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Wrong password.");
            await dialog.accept();
            dialogHandled = true;
        });

        // Fill invalid username and valid password
        await login.fillCredentials("invalidUser", storedUser.password);

        await page.waitForTimeout(500);

        // Submit login
        await login.LoginSubmit();

        // Give a moment for dialog event to be fired
        await page.waitForTimeout(400);

        // Verify dialog was shown and accepted
        expect(dialogHandled).toBe(true);

        // Modal should remain visible after submitting invalid username
        await expect(page.locator("#logInModal")).toBeVisible();
    });


    test("Login a user using valid created credentials during signup", async ({ page }) => {
        

        // Retrieve stored credentials
        const storedUser = TestStorage.get('testUser');

        expect(storedUser).toBeTruthy();
        expect(storedUser.username).toBeTruthy();
        expect(storedUser.password).toBeTruthy();

        await login.fillCredentials(storedUser.username, storedUser.password);

        await page.waitForTimeout(500);
    
        await login.LoginSubmit();

        await page.waitForTimeout(500);

        await expect(page.locator('#nameofuser')).toContainText(storedUser.username);

    });

});
