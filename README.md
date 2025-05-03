# 🎭🚀 Playwright Automation Framework for SwagLabs

[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-45ba63?logo=playwright)](https://playwright.dev/)
[![Allure Report](https://img.shields.io/badge/report-Allure-1f75cb?logo=allure)](https://docs.qameta.io/allure/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node->=18.0.0-brightgreen)](https://nodejs.org/)

This project is a robust end-to-end testing framework built using **[Microsoft Playwright](https://playwright.dev/)**. It includes:

- ✅ Modern cross-browser test automation (Chromium, Edge)
- 📸 Automatic screenshots on failure
- 🎥 Video recording of test runs
- 📊 Allure reports for beautiful test analytics

A robust end-to-end testing framework for SwagLabs using Playwright with Page Object Model design, Allure reporting, and CI/CD readiness.

## 📋 Table of Contents
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Setup](#-setup)
- [Running Tests](#-running-tests)
- [Reports](#-reports)
- [Test Scenarios](#-test-scenarios)
- [Configuration](#-configuration)
- [CI/CD](#-cicd)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Page Object Model** implementation
- **Allure** and **Playwright HTML** reporting
- **Parallel test execution**
- **Screenshot** and **video** capture on failure
- **CI/CD** ready configuration
- **Test data** management

---
## 📂 Project Structure
<pre>
Playwright_SwagLabs/
├── .allure/ # Allure config
├── allure-report/ # Allure reports
├── allure-results/ # Allure raw data
├── node_modules/
├── playwright-report/ # Playwright HTML reports
├── support/
│ └── PageObjects/ # POM classes
│ ├── P01_LoginPage.js
│ ├── P02_ProductsPage.js
│ ├── P03_CartPage.js
│ ├── P04_CheckoutPage.js
│ ├── P05_OverViewPage.js
│ └── P06_OrderConfirmationPage.js
├── test-results/ # Execution artifacts
├── tests/
│ ├── Scenario1.spec.js # Full purchase flow
│ └── Scenario2.spec.js # Login validation
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js # Test config
└── test-data.js # Test data
</pre>
---
## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/OmarAly07/Playwright_SwagLabs.git
cd swaglabs-playwright
