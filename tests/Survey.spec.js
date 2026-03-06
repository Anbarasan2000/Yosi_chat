// import { test, expect } from '@playwright/test';
// import { login } from '../Pages/login';


// test('CMS Login', async ({ page }) => {

//     const loginPage = new login(page);

//     await loginPage.navigateToCMSPage(page, "https://preprodinternal.yosicare.com/page-cms/login");
//     await loginPage.CMSloginToApp('anbarasan.v@yosicare.com', 'Anbuv2000@');

//     await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the page has loaded

//     await loginPage.navigateToSurveyModule();

//     const checkedRadio = page.locator('input[name="reminder1"]:checked');

//     const dayValue = await checkedRadio.locator('xpath=following-sibling::input[1]').inputValue();
//     const hourValue = await checkedRadio.locator('xpath=following-sibling::input[2]').inputValue();
//     const periodValue = await checkedRadio.locator('xpath=following-sibling::select[1]').inputValue();

//     console.log(`${dayValue} Day after appointment, at ${hourValue} ${periodValue}`);


//     await page.waitForLoadState('networkidle');
//     await loginPage.locationSelection();


// });