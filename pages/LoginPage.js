const { expect } = require('@playwright/test');

class LoginPage {
    usernameUserInput = '[name="username"] ';
    passwordInput = '[name="password"]';
    loginButton = '.orangehrm-login-button';
    mainHeader = 'header h6';

    async assertPageTitle(page) {
        await expect(page).toHaveTitle("OrangeHRM");
    }

    async login(page, username, password) {

        await page.locator(this.usernameUserInput).clear();
        await page.locator(this.passwordInput).clear();

        await page.locator(this.usernameUserInput).fill(username);
        await page.locator(this.passwordInput).fill(password);
        await page.locator(this.loginButton).click();
    }

    async assertLoginSuccess(page) {
        await page.locator(this.mainHeader).waitFor({ state: 'visible' });
        await expect(page.locator(this.mainHeader)).toHaveText('Dashboard');
    }

}

module.exports = new LoginPage();