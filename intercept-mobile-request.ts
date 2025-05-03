import { test, expect, devices, Route, Request, Page } from '@playwright/test';

// Используем предустановленное устройство Pixel 5 (эмуляция Android)
const pixel = devices['Pixel 5'];

test.use({ ...pixel });

test('Intercept request from mobile device to pwc.quettaspins.com', async ({ page }: { page: Page }) => {
  // Перехватываем все запросы к сайту
  await page.route('**pwc.quettaspins.com/**', async (route: Route, request: Request) => {
    const method: string = request.method();
    const url: string = request.url();
    console.log(`📡 Intercepted: ${method} ${url}`);
    
    // Продолжаем выполнение запроса
    await route.continue();
  });

  // Открываем сайт
  await page.goto('https://pwc.quettaspins.com/');

  // Проверяем заголовок страницы
  await expect(page).toHaveTitle('Casino homepage');
});
