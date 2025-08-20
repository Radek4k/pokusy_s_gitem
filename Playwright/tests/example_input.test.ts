
import { test, expect } from '@playwright/test';

const config = {
  url: 'https://the-internet.herokuapp.com/inputs',
};

test('Input field accepts numbers', async ({ page }) => {
  await page.goto(config.url);
  const input = page.locator('input[type="number"]');
  await input.fill('12345');
  await expect(input).toHaveValue('12345');
});

test('Input field accepts zero', async ({ page }) => {
  await page.goto(config.url);
  const input = page.locator('input[type="number"]');
  await input.fill('0');
  await expect(input).toHaveValue('0');
});

test('Input field accepts negative number', async ({ page }) => {
  await page.goto(config.url);
  const input = page.locator('input[type="number"]');
  await input.fill('-99999');
  await expect(input).toHaveValue('-99999');
});

test('Input field accepts large number', async ({ page }) => {
  await page.goto(config.url);
  const input = page.locator('input[type="number"]');
  await input.fill('999999999');
  await expect(input).toHaveValue('999999999');
});

test('Input field accepts decimal number', async ({ page }) => {
  await page.goto(config.url);
  const input = page.locator('input[type="number"]');
  await input.fill('3.14159');
  await expect(input).toHaveValue('3.14159');
});