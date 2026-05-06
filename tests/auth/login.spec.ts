import { test, expect } from '../../fixtures/baseTest';
import users from '../../test-data/users.json';
import { generateRandomEmail } from '../../utils/helpers';
import { LoginPage } from '../../pages/LoginPage';

test('login with valid user', async({page})=>{
  const loginPage = new LoginPage(page);
  const user= users.validUser;

  await loginPage.login(user.email, user.password);

  await expect(page).toHaveURL('/inventory.html');
})