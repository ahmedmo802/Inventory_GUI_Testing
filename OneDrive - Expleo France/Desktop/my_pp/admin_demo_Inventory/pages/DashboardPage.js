const { expect } = require('@playwright/test');

class DashboardPage {
    PIMButtom = 'a[href="/web/index.php/pim/viewPimModule"]';
    mainHeader = 'header h6';



    async openPIMPage(page) {
        await page.locator(this.PIMButtom).click();
    }

    async assertPIMPageOpened(page) {
        await page.locator(this.mainHeader).waitFor({ state: 'visible' });
        await expect(page.locator(this.mainHeader)).toHaveText('PIM');
    }

}

module.exports = new DashboardPage();