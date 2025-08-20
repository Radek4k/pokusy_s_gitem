import { test, expect } from '@playwright/test';

const config = {
  url: 'https://practicesoftwaretesting.com/auth/login',
  validEmail: 'customer@practicesoftwaretesting.com',
  validPassword: 'welcome01',
};

test('Successful login with valid credentials', async ({ page }) => {
  await page.goto(config.url);
  await page.locator('[data-test="email"]').fill(config.validEmail);
  await page.locator('[data-test="password"]').fill(config.validPassword);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL(/.*account/);
  await expect(page.locator('h1')).toHaveText('My account');
});

test('Login fails with invalid credentials', async ({ page }) => {
  await page.goto(config.url);
  await page.locator('input[name="email"]').fill('invalid@example.com');
  await page.locator('input[name="password"]').fill('wrongpassword');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('text=Invalid email or password.')).toBeVisible();
});