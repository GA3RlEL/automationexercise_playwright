<h1 align="center" id="title">UI & API Testing with Playwright (TypeScript)</h1>

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/GA3RlEL/automationexercise_playwright/ci.yml?branch=main)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-green)
![Playwright](https://img.shields.io/badge/tested%20with-Playwright-blue)

</div>

Automated UI & API testing practice for https://www.automationexercise.com using <b>Playwright (TypeScript)</b> and <b>Allure</b>.  
This project is for learning purposes.

## Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-ef3b2d?style=for-the-badge&logo=allure&logoColor=white)

## Test Coverage

![API Tests](https://img.shields.io/badge/API%20Tests-444?style=for-the-badge) – REST API tests  
![UI Tests](https://img.shields.io/badge/UI%20Tests-444?style=for-the-badge) – Functional and end‑to‑end scenarios

## Supported Browsers

![Chromium](https://img.shields.io/badge/Chromium-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)

## Highlights

- TypeScript + Playwright test runner
- UI and API testing in one project
- Headed and headless browser execution
- Allure reporting
- Ready for CI/CD with GitHub Actions

## Prerequisites

- Node.js >= 16
- npm or yarn
- Playwright browsers installed

```bash
npm install
npx playwright install
# (optional) Allure CLI for local HTML reports
npm i -D allure-commandline
```

## How to run

- API tests:
```bash
# locally
npm run test:api
# CI/CD
npm run test:api:ci
```

- UI tests (Chromium):
```bash
# locally (headed)
npm run test:ui:chromium
# CI/CD
npm run test:ui:chromium:ci
```

## Allure reports

```bash
# Generate and open the Allure report
npm run report:open
```

## CI

This project uses GitHub Actions (see `.github/workflows/ci.yml`) for automated runs on push/PR.
