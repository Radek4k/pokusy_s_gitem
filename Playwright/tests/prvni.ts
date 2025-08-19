// Tento kód vznikl naklikáním přes Codegen, příkaz:
//    playwright codegen demo.playwright.dev/todomvc -o CV14_todolist.test.ts --target=playwright-test
import { test, expect } from '@playwright/test';

test('example', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('uklidit');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('sepsat plán pro dnešní den');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'uklidit' }).getByLabel('Toggle Todo').check();

  // kontrola zda je položka „uklidit“ odškrtnutá
  await expect(
    page.getByRole('listitem').filter({ hasText: 'uklidit' }).getByLabel('Toggle Todo')
  ).toBeChecked();

  // kontrola zda je v seznamu položka „sepsat plán pro dnešní den“
  await expect(page.locator('body')).toContainText('sepsat plán pro dnešní den');
  // alternativně:
  // await expect(page.locator('.todoapp')).toContainText('sepsat plán pro dnešní den');
});