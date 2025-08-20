import { test, expect } from '@playwright/test';


const config = {
  url: 'https://practicesoftwaretesting.com/auth/login',
  validEmail: 'customer@practicesoftwaretesting.com',
  validPassword: 'welcome01',
};

async function login(page, email: string, password: string, expectSuccess: boolean) {
  await page.goto(config.url);
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
  
  if (expectSuccess) {
    await expect(page).toHaveURL(/.*account/);
    await expect(page.locator('h1')).toHaveText('My account');
  } else {
  await expect(page.locator('div.help-block')).toHaveText('Invalid email or password');
  }
}


test('Successful login with valid credentials', async ({ page }) => {
  await login(page, config.validEmail, config.validPassword, true);
});

test('Login fails with invalid credentials', async ({ page }) => {
  await login(page, 'invalid@example.com', 'wrongpassword', false);
});