import { test, expect } from '@playwright/test';

test('dummy test', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('nav').innerText()).toContain('Users');
});
