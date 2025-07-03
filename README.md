## ✅ Project Highlights

### 🚀 Environment-Specific Test Execution
- Supported execution across **Dev**, **Staging**, and **Production** environments.

### 🧩 Scalable Test Design
- Followed the **Page Object Model (POM)** for maintainable and modular test architecture.
- Enabled **tag-based test execution** using annotations like `@Smoke`, `@Sanity`, and `@Regression`.
- Implemented **priority-based execution** for test control.

### 🛠️ Test Enhancements
- Efficient **session handling** for login/auth workflows.
- Added **retry logic** and **soft assertions** to manage flaky tests and ensure test continuity.

### 📸 Reporting & Debugging
- Integrated with **Allure Reports**:
  - Captures **video recordings** and **screenshots** on test failures.
  - Provides interactive, visual reports for easier debugging.

### ⚙️ CI/CD Integration with GitHub Actions
- Configured CI/CD pipelines for **Dev**, **Staging**, and **Production** environments.
- Enabled **dependency caching** for faster pipeline runs.
- Sends **automated email reports** with allure and playwright report:
  - Test summaries
  - Failure details
  - Attached videos and screenshots for failed tests

## Code-Coverage
```
npm run test:coverage
npm run coverage:report
```

# Testcase-Automation-plan-you-can-find-here
```
https://docs.google.com/spreadsheets/d/1H58w0gzAoFkI-ybDDAlz6aJaEh5Ygorhzie265uGTXU/edit?pli=1&gid=0#gid=0
```

## Pre-requisites

* Playwright requires Node.js version 14 or above. If you are using node version less than 14 then you can download Node.js version 14 or above from nvm (nvm allows you to easily switch between node versions depending on the project)

  * If you are not using nvm already, you can download it and install Node.js from [here](https://catalins.tech/node-version-manager-macos/)

## Setup

* Clone e2e-tests repository 
* `cd` into `tests/functional` and run the below commmands:
```
npm ci
npx playwright install
```

## Playwright Commands

* To run all tests use `npx cross-env ENV=FI_QA playwright test` This would run all tests on FINDIT staging environment
* To run all tests use `npx cross-env ENV=FI_PROD playwright test` This would run all tests on FINDIT production environment

* You can change environment as per the requirement. Following are the configured environment values:

  * `FI_PROD`, `FI_QA`, `OPS_PROD`, `OPS_QA`, `FI_DEV`
  * `FI_PROD`, `FI_QA` point to one domain and `OPS_PROD`, `OPS_QA`, `FI_DEV` point to different domain


* To run a single test spec file use `npx cross-env ENV=FI_PROD playwright test 1_Login/login.spec.js`

* To run multiple test spec files use `npx cross-env ENV=FI_PROD playwright test 1_Login/login.spec.js addTemplate.spec.js`

* To run a single test inside spec file use test title `npx cross-env ENV=FI_PROD playwright test -g "Unsuccessful login"`

* By default tests run in headless mode if you want to run in headed browser add `--headed` at the end on your command
  * For example use `npx cross-env ENV=FI_PROD playwright test --headed`

* To run a specific test file with a tag filter (e.g., `@smoke`) in a headed browser, use:  
  `npx cross-env ENV=FI_QA playwright test 2_addProduct.spec.js --grep="@smoke" --headed`

* To debug a specific test file with a tag filter  in a headed browser, use:  
  `npx cross-env ENV=FI_QA playwright test 2_addProduct.spec.js --headed --debug`


#### Allure Reports

* npx allure generate ./allure-results --clean -o ./allure-report
* npx allure open ./allure-report


## Key Findings

* **Speed Comparison:** Playwright took ~28s, ~31s, ~33s  to run all 3 tests and averaged ~31 seconds. It was even more faster with paralell execution

* **Test Framework:** Playwright is more flexible and gives you more control over the test runner framework you choose

* **Additional Downloads:** Playwright has a native API for handling iframes or mobile device emulations without requiring any additional downloads or plugins.   

* **Test Recording:** Playwright uses codegen command to run the test generator followed by the URL of the website you want to generate tests for.
```npx playwright codegen```

* **Navigating to new Domain:** Playwright provides built-in support for cross-domain testing, making it easier to test scenarios that involve interactions between different domains or origins.

## Why Using Playwright in this Project

 Playwright has proven to be the most suitable choice. The selection between Playwright and Cypress depends on the system's requirements, considering factors such as browser support and the complexity of testing scenarios. Playwright's versatility and comprehensive browser compatibility make it ideal for diverse testing needs, while Cypress offers simplicity and ease of use for straightforward scenarios. It is crucial to evaluate these frameworks in relation to your project's unique demands to make an informed decision.

 Based on the specific scope of my web application, my application opens multipletab instance so playwright can handle that seamlessly.


 ### Creator of this Project

 * **Name:**-Ashfaq Ahmed

 * **Email:**ashfaq.ahmed@vivasoftltd.com
