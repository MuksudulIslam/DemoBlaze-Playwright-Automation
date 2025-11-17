import  {test, expect} from "@playwright/test";
import { SignupPage } from '../pages/SignupPage.js';
import { testData } from '../utils/testData.js';


test("Register a new user with empty username and password", async ({ page }) => {

    const signup = new SignupPage(page);

    await page.goto(testData.baseURL);

    page.once("dialog", async dialog => {
        console.log("Signup Alert:", dialog.message());
        dialog.accept();
    });

    await signup.signup("", "");

    await page.waitForTimeout(2000);

    await page.keyboard.press('Enter');

    await expect(page.locator("#signInModal")).toBeHidden();
}),

test("Register with existing username should be fail", async ({ page }) => {

    const signup = new SignupPage(page);

    await page.goto(testData.baseURL);

    page.once("dialog", dialog => {
    expect(dialog.message()).toContain("This user already exist");
    dialog.accept();
  });

  await signup.signup("testuser", "anypassword");
  
  
  await page.waitForTimeout(2000);

  await page.keyboard.press('Enter');

  await expect(page.locator("#signInModal")).toBeHidden();
}),


test("Register a new user using valid information", async ({ page }) => {

    const signup = new SignupPage(page);

    await page.goto(testData.baseURL);

    const{username, password} = testData.newUser;

    page.once("dialog", async dialog => {
        console.log("Signup Alert:", dialog.message());
        dialog.accept();
    });

    await signup.signup(username, password);

    await page.waitForTimeout(2000);

    await page.keyboard.press('Enter');

    await expect(page.locator("#signInModal")).toBeHidden();
});

