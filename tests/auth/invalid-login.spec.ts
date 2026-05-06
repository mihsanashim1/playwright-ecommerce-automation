import { test, expect } from '../../fixtures/baseTest';
import users from '../../test-data/users.json';
import { LoginPage } from '../../pages/LoginPage';

test('login with invalid user', async({page})=>{
  const loginPage = new LoginPage(page);
  const user= users.invalidUser;

  await loginPage.login(user.email, user.password);

  await expect(page.locator(loginPage.errorMessage)).toContainText('Username and password do not match');
//   await expect(page.locator(loginPage.errorMessage)).toBeVisible();
})