const { expect } = require('@playwright/test');

class PIMPage {
    addButton = '.orangehrm-header-container button:has-text("Add")'
    mainTitle = ".orangehrm-main-title"
    firstNameInput = '[name="firstName"]'
    middleNameInput = '[name="middleName"]'
    lastNameInput = '[name="lastName"]'
    employeeIdInput = '[class*="label-wrapper"]:has-text("Employee Id") + div input'
    saveButton = 'button[type="submit"]:has-text("Save")'
    successMessage = '.oxd-toast-content--success'
    searchButton = 'button[type="submit"]:has-text("Search")'
    employeeId = '.oxd-table-body .oxd-table-row:has-text("employeeId")'




    clickAddButton(page) {
        page.locator(this.addButton).click();
    }

    async assertAddEmployeePageOpened(page) {
        await page.locator(this.mainTitle).waitFor({ state: 'visible' });
        await expect(page.locator(this.mainTitle)).toHaveText('Add Employee');
    }

    async enterEmployeeDetails(page, firstName, middleName, lastName, employeeId) {
        await page.locator(this.firstNameInput).fill(firstName);
        await page.locator(this.middleNameInput).fill(middleName);
        await page.locator(this.lastNameInput).fill(lastName);
        await page.locator(this.employeeIdInput).clear();
        await page.locator(this.employeeIdInput).fill(employeeId);
    }

    async clickSaveButton(page) {
        await page.locator(this.saveButton).click();
    }

    async assertSuccessMessage(page) {
        await page.locator(this.successMessage).waitFor({ state: 'visible' });
        await expect(page.locator(this.successMessage)).toContainText('Successfully Saved');
    }

    async deleteEmployeeIfExists(page, employeeId) {
        await page.locator(this.employeeIdInput).fill(employeeId);
        await page.locator(this.searchButton).click();

        const employeeRow = await page.locator(this.employeeId.replace('employeeId', employeeId));
        try {
            await employeeRow.waitFor({ state: 'visible', timeout: 5000 });
            console.log(`Employee ${employeeId} found.`);

            await employeeRow.locator('.bi-trash').click();

            await page.locator('button:has-text("Yes, Delete")').click();

            await expect(page.locator(this.successMessage))
                .toContainText('Successfully Deleted');
            console.log(`Employee with ID ${employeeId} has been deleted.`);
            
        } catch (error) {
            console.log(`Employee ${employeeId} does not exist. Skipping deletion.`);
        }
       
        
    }
}



module.exports = new PIMPage();
