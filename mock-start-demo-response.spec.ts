import { test, expect, Page, Route, Request } from '@playwright/test';

const demoStartUrl = '**/api/public/startGameInDemoMode';

test.describe('Мокаем ответ от сервера при запуске игры в демо-режиме', () => {

  async function navigateToTestGame(page: Page) {
    await page.goto('https://pwc.quettaspins.com/');

    // Клик по кнопке "Egaming"
    await page.getByRole('button', { name: 'Egaming' }).click();

    // Наводим на "Test Game 2"
    const gameCard = page.locator('span[data-name="game-gallery-game_label"]', { hasText: 'Test Game 2' });
    await gameCard.hover();

    // Ждём появления кнопки "Играть для удовольствия!"
    await expect(page.getByRole('button', { name: 'Играть для удовольствия!' })).toBeVisible();
  }

  test('Ответ 200 и кастомный errorMessage', async ({ page }) => {
    await page.route(demoStartUrl, async (route: Route, request: Request) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errorMessage: 'Test error message',
          errorCode: 'INTERNAL_ERROR',
          data: null
        }),
      });
    });

    await navigateToTestGame(page);

    // Клик на "Играть для удовольствия!"
    await page.getByRole('button', { name: 'Играть для удовольствия!' }).click();

    // Проверка модального окна с ошибкой
    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog).toContainText('Ошибка при запуске игры');
    await expect(errorDialog).toContainText('Сервер сообщает: Test error message');
  });

  test('Ответ 500 Internal Server Error', async ({ page }) => {
    await page.route(demoStartUrl, async (route: Route, request: Request) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errorMessage: 'Internal server error',
          errorCode: 'INTERNAL_ERROR',
          data: null
        }),
      });
    });

    await navigateToTestGame(page);

    // Клик на "Играть для удовольствия!"
    await page.getByRole('button', { name: 'Играть для удовольствия!' }).click();

    // Проверка модального окна с ошибкой
    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog).toContainText('Ошибка при запуске игры');
    await expect(errorDialog).toContainText('Сервер сообщает: Internal server error');
  });
});
