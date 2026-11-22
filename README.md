# UI + API Playwright E2E Automation Framework

A TypeScript Playwright end-to-end automation framework for testing the OrangeHRM web application. The framework uses the Page Object Model (POM), reusable Playwright fixtures, environment-specific configuration, encrypted credentials, browser storage-state authentication, Reporting Labs HTML/PDF reports, and GitHub Actions CI.

> The current test suite primarily demonstrates UI automation. API testing support can be added through Playwright's `APIRequestContext` and fixtures.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [How the Framework Works](#how-the-framework-works)
- [Configuration](#configuration)
- [Installation](#installation)
- [Environment and Credentials](#environment-and-credentials)
- [Running Tests](#running-tests)
- [Authentication Storage State](#authentication-storage-state)
- [Reporting](#reporting)
- [CI/CD](#cicd)
- [Writing a New Test](#writing-a-new-test)
- [Folder and File Reference](#folder-and-file-reference)
- [Generated and Ignored Files](#generated-and-ignored-files)
- [Troubleshooting](#troubleshooting)

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| TypeScript | Test and framework source language |
| Playwright Test | Test runner, browser automation, assertions, traces, screenshots, and video |
| Chromium | Primary configured browser project |
| Firefox | Configured browser project |
| WebKit | Configured Safari-compatible browser project |
| dotenv | Loads environment variables from `env-files` |
| cross-env | Sets environment variables consistently on Windows, macOS, and Linux |
| crypto-js | AES encryption/decryption of credentials |
| Reporting Labs | Extended HTML/PDF test reports, metadata, trends, and JSON output |
| GitHub Actions | Automated CI execution and report upload |

## Repository Structure

```text
UI-API-Playwright-E2E-Automation-Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .vscode/
│   └── reporting-labs.code-snippets
├── data/
│   ├── login-module-data.json
│   └── pim-module-data.json
├── env-files/
│   ├── .env.dev
│   ├── .env.uat
│   └── .env.prod
├── fixtures/
│   ├── common-fixture.ts
│   ├── hooks-fixture.ts
│   └── pom-fixture.ts
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── UserPage.ts
│   ├── PIMViewEmployeeListPage.ts
│   └── PIMAddEmployeePage.ts
├── playwright/
│   └── .auth/
│       └── auth.json
├── reporting-labs/
│   ├── index.html
│   ├── report.json
│   └── report.pdf
├── test-results/
├── tests/
│   ├── global.setup.ts
│   ├── login-moodule.spec.ts
│   └── pim-module.spec.ts
├── utils/
│   └── commonUtils.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── reporting-labs.config.ts
├── reporting-labs.history.json
├── orangehrm.png
└── tsconfig.json
```

## How the Framework Works

1. Playwright reads `ENV_NAME` and loads the matching file from `env-files`.
2. `global.setup.ts` runs first for browser projects because each browser project declares setup as a dependency.
3. The setup project opens the OrangeHRM login page, decrypts the username and password, and signs in.
4. The authenticated browser context is saved to `playwright/.auth/auth.json`.
5. Chromium, Firefox, and WebKit projects reuse the saved storage state.
6. Login tests deliberately use an empty storage state so they can verify invalid login scenarios.
7. POM fixture definitions instantiate each page object and expose it to tests through dependency injection.
8. Common fixtures provide utilities such as `commonUtils`, while POM fixtures provide the page objects.
9. Playwright generates HTML and Reporting Labs reports after execution.

## Configuration

### `playwright.config.ts`

The central Playwright configuration defines:

- Test directory: `./tests`
- Default timeout: 60 seconds per test
- Assertion timeout: 30 seconds
- Action timeout: 30 seconds
- Navigation timeout: 30 seconds
- Global timeout: 3,000,000 milliseconds
- Parallel execution: disabled
- Retries: 2 on CI and 0 locally
- Workers: 1 on CI and 2 locally
- Screenshots: retained only on failure
- Videos: retained only on failure
- Traces: retained on the first retry
- HTML Playwright reporter
- Reporting Labs reporter
- Authentication storage state for browser projects

Environment selection defaults to `dev` when `ENV_NAME` is not supplied:

```text
ENV_NAME=dev  -> env-files/.env.dev
ENV_NAME=uat  -> env-files/.env.uat
ENV_NAME=prod -> env-files/.env.prod
```

The configured browser projects are:

| Project | Browser |
| --- | --- |
| `setup` | Runs `global.setup.ts` |
| `chromium` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari/WebKit |

### `tsconfig.json`

The TypeScript configuration includes test, utility, data, and Playwright configuration files. It uses:

- `ESNext` target
- `CommonJS` module
- JSON module resolution
- ES module interoperability
- Node.js types
- `strict: false`
- Exclusions for `node_modules` and `dist`

### `package.json`

The package file contains the npm scripts and project dependencies.

## Installation

### 1. Install Node.js

Use a recent LTS release of Node.js.

### 2. Install dependencies

```bash
npm ci
```

Use `npm install` instead if changing dependency versions or adding packages.

### 3. Install Playwright browsers

```bash
npx playwright install
```

For a Linux CI environment, including operating-system dependencies:

```bash
npx playwright install --with-deps
```

## Environment and Credentials

### Environment files

Files in `env-files/` contain environment values loaded by dotenv:

- `BASE_URL`: OrangeHRM application base URL
- `USER_NAME`: encrypted or plain username, depending on the environment file and execution mode
- `PASSWORD`: encrypted or plain password, depending on the environment file and execution mode

The development environment is configured for encrypted credentials. The setup decrypts `USER_NAME` and `PASSWORD` using `CommonUtils`.

The UAT and production files in this repository contain plain demo credentials. Do not commit real credentials. Use CI secrets or a secret manager for non-demo environments.

### Secret key

The `SECRET_KEY` environment variable is the password used by CryptoJS AES encryption/decryption. It is required by `CommonUtils`.

The key must match the key used when the values were encrypted. The CI workflow currently supplies:

```text
SECRET_KEY=credential_dev
```

For local execution:

```bash
SECRET_KEY=credential_dev npm run test_dev_cr_hl
```

On Windows Command Prompt, the syntax differs:

```cmd
set SECRET_KEY=credential_dev&& npm run test_dev_cr_hl
```

PowerShell:

```powershell
$env:SECRET_KEY="credential_dev"; npm run test_dev_cr_hl
```

### Encrypting or decrypting values

`utils/commonUtils.ts` provides:

```typescript
encryptData(data: string): string
decryptData(encryptedData: string): string
```

Encrypt values outside source control with the same secret key and store only the encrypted result in the development environment file. Never place the secret key or real production credentials in committed environment files.

## Running Tests

### Run all configured projects for an environment

```bash
npm run test_dev
npm run test_uat
npm run test_prod
```

These commands set `ENV_NAME` and run the Playwright test runner.

### Run Chromium headless

```bash
SECRET_KEY=credential_dev npm run test_dev_cr_hl
```

### Run Chromium headed

```bash
SECRET_KEY=credential_dev npm run test_dev_cr_hd
```

### Run Firefox or WebKit

Headless scripts:

```bash
npm run test_dev_fr_hl
npm run test_dev_safari_hl
```

Headed scripts:

```bash
npm run test_dev_fr_hd
npm run test_dev_safari_hd
```

### Run directly with Playwright

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test tests/login-moodule.spec.ts --project=chromium
npx playwright test -g "invalid username"
npx playwright test --headed
```

Select an environment when running directly:

```bash
ENV_NAME=uat npx playwright test --project=chromium
```

For a Windows environment, prefer `cross-env` or PowerShell variable syntax.

### Useful Playwright commands

```bash
npx playwright show-report
npx playwright test --ui
npx playwright test --debug
npx playwright test --trace on
```

## Authentication Storage State

`tests/global.setup.ts` is the setup test. It:

- Opens `BASE_URL` login page
- Decrypts the username and password
- Signs in
- Waits for the dashboard URL
- Verifies the Dashboard heading
- Writes the browser cookies and origin state to `playwright/.auth/auth.json`

The Chromium, Firefox, and WebKit projects use this file through `storageState`. This reduces repeated login operations for authenticated tests.

The login spec overrides storage state with an empty cookie/origin array because it tests unauthenticated invalid credentials. The file is ignored by Git and must be generated before browser tests run.

## Reporting

### Playwright HTML report

Playwright writes the standard HTML report to `playwright-report/`. Open it with:

```bash
npx playwright show-report
```

The report opens automatically according to the Playwright reporter behavior and is also available under `playwright-report/index.html`.

### Reporting Labs report

`reporting-labs.config.ts` configures:

- Report title
- OrangeHRM logo
- Metadata including environment
- Jira/issue-style links
- HTML and JSON output
- Optional PDF output
- Run history and trend data
- Test metadata such as priority, severity, feature, owner, story, and epic

Generated Reporting Labs files include:

- `reporting-labs/index.html`
- `reporting-labs/report.json`
- `reporting-labs/report.pdf`
- `reporting-labs.history.json`

The setup test uses Reporting Labs metadata:

```typescript
meta({
  priority: "P0",
  severity: "critical",
  story: "101",
  feature: "login for Auth session storage",
});
```

VS Code snippets in `.vscode/reporting-labs.code-snippets` provide shortcuts for Reporting Labs metadata and test declarations.

## CI/CD

`.github/workflows/playwright.yml` runs tests for pushes and pull requests targeting `main` or `master`.

The workflow:

1. Checks out the repository.
2. Installs Node.js LTS.
3. Runs `npm ci`.
4. Installs Playwright Chromium dependencies.
5. Sets `SECRET_KEY`, `BASE_URL`, `USER_NAME`, and `PASSWORD` environment variables.
6. Runs `npm run test_dev_cr_hl`.
7. Uploads `playwright-report/` as a GitHub Actions artifact for 30 days.

Configure the following repository secrets for CI:

- `USER_NAME`
- `PASSWORD`

If credentials are encrypted, they must be encrypted with `credential_dev`, matching the workflow's `SECRET_KEY`. For production security, replace these demo values with an environment-specific secret and key.

## Writing a New Test

### 1. Create page objects

Add locators and reusable actions to a class under `pages/`.

```typescript
export class ExamplePage {
  constructor(private page: Page) {}
}
```

### 2. Register the page object

Add the class type and fixture to `fixtures/pom-fixture.ts`.

```typescript
examplePage: ExamplePage;

examplePage: async ({ page }, use) => {
  await use(new ExamplePage(page));
};
```

### 3. Create test data

Store static values in `data/*.json` and import the JSON file into the spec.

### 4. Write the spec

Place test files in `tests/` and compose fixtures through `common-fixture.ts`.

```typescript
import { test } from "../fixtures/common-fixture";

test.describe("Example feature", () => {
  test("performs an example action", async ({ examplePage }) => {
    // Test implementation
  });
});
```

### 5. Run the focused test

```bash
npx playwright test tests/example.spec.ts --project=chromium
```

## Folder and File Reference

### `.github/`

Contains repository automation.

- `workflows/playwright.yml`: GitHub Actions workflow that installs dependencies and browsers, runs Chromium headless tests, and uploads the Playwright report.

### `.vscode/`

Contains editor-specific configuration.

- `reporting-labs.code-snippets`: VS Code snippets for Reporting Labs metadata and test declarations.

### `data/`

Contains JSON test data.

- `login-module-data.json`: Invalid username/password values used by login-negative tests.
- `pim-module-data.json`: Employee first, middle, and last names used by PIM tests.

### `env-files/`

Contains dotenv configuration for deployment environments.

- `.env.dev`: Development application URL and encrypted development credentials.
- `.env.uat`: UAT application URL and demo credentials.
- `.env.prod`: Production application URL and demo credentials.

Because UAT and production URLs currently point to the public demo application, adapt these files to real environment endpoints before production use.

### `fixtures/`

Contains Playwright fixture composition and dependency injection.

- `pom-fixture.ts`: Creates `LoginPage`, `DashboardPage`, `UserPage`, `PIMViewEmployeeListPage`, and `PIMAddEmployeePage` instances for tests.
- `common-fixture.ts`: Extends POM fixtures with `CommonUtils`.
- `hooks-fixture.ts`: Provides URL-navigation and logout fixtures. It is available but is not currently the base fixture imported by the specs.

### `pages/`

Contains POM classes and locators.

- `LoginPage.ts`: Username/password locators, login action, invalid credentials popup, and navigation to the login URL.
- `DashboardPage.ts`: Dashboard heading locator.
- `UserPage.ts`: User menu and logout locators/actions.
- `PIMViewEmployeeListPage.ts`: PIM navigation link and navigation action.
- `PIMAddEmployeePage.ts`: Add Employee link, employee form fields, save button, employee ID input, and employee creation action.

### `tests/`

Contains Playwright test specifications and setup.

- `global.setup.ts`: Performs and stores an authenticated login session.
- `login-moodule.spec.ts`: Tests invalid username, invalid password, and combined invalid credentials scenarios.
- `pim-module.spec.ts`: Navigates to PIM and creates an employee using PIM test data.

The login spec filename contains `moodule` rather than `module`; renaming it does not affect Playwright discovery unless references are added elsewhere.

### `utils/`

Contains shared framework utilities.

- `commonUtils.ts`: Requires `SECRET_KEY` and provides AES `encryptData` and `decryptData` methods.

### `node_modules/`

Installed third-party packages. It is reproducible from `package-lock.json` and should not be committed.

### `playwright/`

Contains Playwright runtime state.

- `.auth/auth.json`: Generated cookies and origin storage state for authenticated browser sessions.

### `test-results/`

Stores Playwright artifacts and the last-run status. Typical contents include screenshots, traces, videos, and `.last-run.json`.

### `playwright-report/`

Contains the generated standard Playwright HTML report and associated report data.

### `reporting-labs/`

Contains generated Reporting Labs outputs.

- `index.html`: Interactive Reporting Labs report.
- `report.json`: Machine-readable report data.
- `report.pdf`: Print-ready PDF report.

### Root files

- `package.json`: npm scripts and direct dependencies.
- `package-lock.json`: Locked dependency versions.
- `playwright.config.ts`: Main Playwright and browser configuration.
- `reporting-labs.config.ts`: Reporting Labs appearance, metadata, output, and link configuration.
- `reporting-labs.history.json`: Run trend/history data.
- `tsconfig.json`: TypeScript compiler options and included source areas.
- `.gitignore`: Excludes dependencies and generated Playwright artifacts.
- `orangehrm.png`: Logo used by the Reporting Labs report.
- `README.md`: Framework documentation.

## Generated and Ignored Files

The `.gitignore` file excludes:

```text
node_modules/
test-results/
playwright-report/
blob-report/
playwright/.cache/
playwright/.auth/
```

Do not commit generated reports, browsers, cached data, or authentication state. Commit source code, test data, configuration, the dependency lockfile, and the Reporting Labs configuration.

## Troubleshooting

### `Please provide a SECRET_KEY`

Set `SECRET_KEY` before running tests:

```bash
SECRET_KEY=credential_dev npm run test_dev_cr_hl
```

### Authentication setup does not finish

Verify that:

- `BASE_URL` is reachable
- `USER_NAME` and `PASSWORD` decrypt to valid credentials
- `SECRET_KEY` matches the key used for encryption
- The OrangeHRM login and dashboard selectors have not changed

### Browser is missing

Install the required Playwright browsers:

```bash
npx playwright install
```

### Browser project cannot use authentication state

Delete the stale generated storage state and run setup:

```bash
npx playwright test --project=setup
npx playwright test --project=chromium
```

`playwright/.auth/auth.json` is generated and ignored. It must not be shared because it can contain authenticated session cookies.

### Environment variables are not loading

Check `ENV_NAME` and the matching file:

```text
ENV_NAME=dev  -> env-files/.env.dev
ENV_NAME=uat  -> env-files/.env.uat
ENV_NAME=prod -> env-files/.env.prod
```

When `ENV_NAME` is omitted, Playwright loads `env-files/.env.dev`.
