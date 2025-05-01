# alphasoft-autotests
Автоматизированные тесты для проверки авторизации на сайте https://pwc.quettaspins.com, написанные с использованием Playwright и TypeScript.

## 📋 Что делает сценарий этого автотеста?

Сценарий проверяет отображение ошибки при попытке входа с несуществующим адресом электронной почты и неверным паролем:

- Открывает сайт
- Кликает кнопку **"Войти"** в хедере
- Вводит невалидные данные в форму
- Проверяет появление сообщения об ошибке

## ⚙️ Установка и запуск

Установка проекта
Склонируйте репозиторий к себе на компьютер:
git clone https://github.com/nickkulman/alphasoft-autotests.git

Перейдите в папку проекта:
cd alphasoft-autotests

Установите все зависимости:
npm install

Установите необходимые браузеры для Playwright:
npx playwright install

Запуск тестов:
npx playwright test alphasoft-autotests.ts

Запуск в headed режиме (в браузере с интерфейсом, режим наблюдения):
npx playwright test alphasoft-autotests.ts --headed
