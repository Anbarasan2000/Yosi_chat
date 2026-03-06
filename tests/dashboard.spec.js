
import { test, expect } from '@playwright/test';
import { login } from '../Pages/login';
import { yosiChat } from '../Pages/yosichat';

test('Dashboard Login', async ({ page }) => {




  //1.Dashboard Login
  const loginPage = new login(page);

  await loginPage.navigateToDashboardPage(page, "https://preprodportal.yosicare.com/index");

  await page.screenshot({ path: 'failure.png' });
  console.log(await page.content());

  await loginPage.loginToApp('500500qa@yopmail.com', 'Yosi2026$');
  await page.waitForLoadState('networkidle');
  await loginPage.locationSelection();

  //1.YosiChat Module Chat conversation with patient search by name and number
  const chatModule = new yosiChat(page);

  await chatModule.yosiChatModule_StartConversation_Patient_Search_By_Name_And_Number();

  // await chatModule.send_Message();



  await page.pause();

});



