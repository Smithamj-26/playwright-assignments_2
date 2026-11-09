const { test, expect } = require('@playwright/test');

test.describe('Form Layouts Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('Grid Form - Fill details and click Sign In', async ({ page }) => {
    const gridForm = page.locator('nb-card').filter({ hasText: 'Using the Grid' });

    await gridForm.getByRole('textbox', { name: 'Email' }).fill('griduser@test.com');
    await gridForm.getByRole('textbox', { name: 'Password' }).fill('Password123');

    await gridForm.getByRole('radio').first().check();

    await gridForm.getByRole('button', { name: 'Sign in' }).click();
  });

  test('Horizontal Form - Fill details and click Sign In', async ({ page }) => {
    const horizontalForm = page.locator('nb-card').filter({ hasText: 'Horizontal form' });

    await horizontalForm.getByRole('textbox', { name: 'Email' }).fill('horizontal@test.com');
    await horizontalForm.getByRole('textbox', { name: 'Password' }).fill('Password123');

    await horizontalForm.getByRole('checkbox').check();

    await horizontalForm.getByRole('button', { name: 'Sign in' }).click();
  });
});
