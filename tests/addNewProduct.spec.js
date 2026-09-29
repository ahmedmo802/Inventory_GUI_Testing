import { test, expect } from '@playwright/test';
const loginPage = require('../pages/LoginPage.js');
const DashboardPage = require('../pages/DashboardPage.js');
const PIMPage = require('../pages/PIMPage.js');
import testData from '../fixtures/testData.json';


test('Store Admin can add product', async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;

  await page.goto(baseUrl);


  await loginPage.assertPageTitle(page);

  await loginPage.login(page, username, password );
  await loginPage.assertLoginSuccess(page);

  await DashboardPage.openPIMPage(page);
  await DashboardPage.assertPIMPageOpened(page);

  await PIMPage.deleteEmployeeIfExists(page, testData.employeeId);
  await PIMPage.clickAddButton(page);
  await PIMPage.assertAddEmployeePageOpened(page);
  await PIMPage.enterEmployeeDetails(page, testData.firstName, testData.middleName, testData.lastName, testData.employeeId);
  await PIMPage.clickSaveButton(page);
  await PIMPage.assertSuccessMessage(page);
});

