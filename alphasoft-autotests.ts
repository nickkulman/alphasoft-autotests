import { test, expect } from '@playwright/test';

test('Отображение ошибки при вводе неверных логина и пароля на pwc.quettaspins.com', async ({ page }) => {
  // 1. Открыть сайт
  await page.goto('https://pwc.quettaspins.com/');

  // 2. Нажать кнопку "Войти" в хедере
  await page.click('button#main_menu_login-btn');

  // 3. Дождаться появления модального окна
  await expect(page.getByText('Рады видеть вас снова в Quettaspins Turnkey Casino')).toBeVisible();

  // 4. Ввести невалидные данные
  await page.fill('input#login', 'invalid_user@example.com');
  await page.fill('input#password', 'wrongpassword');

  // 5. Нажать кнопку "Войти"
  await page.click('button#login_main_login-btn');

  // 6. Проверить, что появилось сообщение об ошибке
  const errorMessage = page.locator('div#modal_error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Неверный адрес электронной почты или пароль');
});
