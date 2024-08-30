import { test, expect } from '@playwright/test';

test('Dummy test', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('nav').innerText()).toContain('Users');
});
