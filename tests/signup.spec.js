import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage.js";
import { testData } from "../utils/testData.js";
import { TestStorage } from "../utils/storage.js";

test.describe("Signup Tests", () => {
    let signup;

    test.beforeEach(async ({ page }) => {
        signup = new SignupPage(page);
        await page.goto(testData.baseURL);
    });

    test("Register a new user using empty username and password", async ({ page }) => {
    await signup.clickSignupButton();
    
    // Wait for modal to be visible
    await expect(page.locator("#signInModal")).toBeVisible();
    
    // Set up dialog handler
    let dialogHandled = false;
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain("Please fill out Username and Password.");
        await dialog.accept();
        dialogHandled = true;
    });
    
    // Fill with empty credentials and click signup
    await signup.fillCredentials("", "");
    await signup.clickSignup();
    
    // Wait a bit to ensure dialog is handled
    await page.waitForTimeout(500);
    expect(dialogHandled).toBe(true);

    // The modal should remain visible after accepting the dialog for empty credentials
    await expect(page.locator("#signInModal")).toBeVisible();
});


    test("Register a new user using valid information", async ({ page }) => {
        const username = testData.newUser.username;
        const password = testData.newUser.password;

        // Store credentials in file for reuse
        TestStorage.set('testUser', { username, password });

        const alertPromise = page.waitForEvent("dialog");
        await signup.signup(username, password);

        const dialog = await alertPromise;
        expect(dialog.message()).toContain("Sign up successful");
        await dialog.accept();

        await expect(page.locator("#signInModal")).not.toBeVisible();
    });

    test("Register with existing username should fail", async ({ page }) => {
        // Retrieve stored credentials
        const storedUser = TestStorage.get('testUser');
        
        const alertPromise = page.waitForEvent("dialog");
        await signup.signup(storedUser.username, storedUser.password);

        const dialog = await alertPromise;
        expect(dialog.message()).toContain("This user already exist");
        await dialog.accept();

        await expect(page.locator("#signInModal")).toBeVisible();
    });
});