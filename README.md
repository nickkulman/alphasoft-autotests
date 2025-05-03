# alphasoft-autotests
Автоматизированные тесты для сайта https://pwc.quettaspins.com, написанные с использованием Playwright и TypeScript.

## ⚙️ Установка и запуск

## Установка проекта

Склонируйте репозиторий к себе на компьютер:

git clone https://github.com/nickkulman/alphasoft-autotests.git

Перейдите в папку проекта:

cd alphasoft-autotests

Установите все зависимости:

npm install

Установите необходимые браузеры для Playwright:

npx playwright install

## Запуск теста (пример):

npx playwright test login-invalid-credentials.spec.ts

## Запуск теста в headed режиме (в браузере с интерфейсом, режим наблюдения):

npx playwright test login-invalid-credentials.spec.ts --headed

## Запуск всех тестов в проекте:

npm test
