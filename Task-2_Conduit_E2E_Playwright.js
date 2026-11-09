const { test, expect } = require('@playwright/test');

test.describe('Article Management E2E Flow', () => {

  const email = 'your-email@example.com';
  const password = 'your-password';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/login');

    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill(password);

    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Global Feed')).toBeVisible();
  });

  test('Create Verify Delete Article and Logout', async ({ page }) => {

    const articleTitle = `Playwright Article ${Date.now()}`;

    await page.getByText('New Article').click();

    await page.getByPlaceholder('Article Title').fill(articleTitle);
    await page.getByPlaceholder("What's this article about?").fill('Article created using Playwright automation');
    await page.locator('textarea').fill('This is an automated article body.');
    await page.getByPlaceholder('Enter tags').fill('playwright');

    await page.getByRole('button', { name: 'Publish Article' }).click();

    await expect(page.locator('h1')).toHaveText(articleTitle);

    await page.getByText('Home').click();

    await expect(page.locator('.article-preview')).toContainText(articleTitle);

    await page.getByText(articleTitle).first().click();

    await expect(page.locator('h1')).toHaveText(articleTitle);

    await page.getByRole('button', { name: 'Delete Article' }).click();

    await page.getByText('Home').click();

    await expect(page.locator('.article-preview')).not.toContainText(articleTitle);

    await page.getByText('Settings').click();
    await page.getByText('Or click here to logout.').click();

    await expect(page).toHaveURL(/login/);
  });
});
