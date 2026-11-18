# 1. dot env 
====================================
Install dot env = npm i dotenv

# 2. Cross env
=====================
npm i cross-env

# Exeute for Env file
=======================
Open git bash in terminal and use this command
ENV_NAME="dev" npx playwright test

# use of corss env
==========================================
To execuete script in automatically then you have to set code in package.json 
In this file a script section is there in this section you have to pass key value pairs to execute the enviroment.
Example:
Package.json :   
  "scripts": {
    "test_dev": "cross-env ENV_NAME=dev npx playwright test",
    "test_uat": "cross-env ENV_NAME=uat npx playwright test",
    "test_prod": "cross-env ENV_NAME=prod npx playwright test",
    "test_dev_cr_hl": "cross-env ENV_NAME=dev npx playwright test --project=chromium",
    "test_dev_fr_hl": "cross-env ENV_NAME=dev npx playwright test --project=firefox",
    "test_dev_safari_hl": "cross-env ENV_NAME=dev npx playwright test --project=safari",
    "test_dev_cr_hd": "cross-env ENV_NAME=dev npx playwright test --project=chromium --headed",
    "test_dev_fr_hd": "cross-env ENV_NAME=dev npx playwright test --project=firefox --headed",
    "test_dev_safari_hd": "cross-env ENV_NAME=dev npx playwright test --project=safari --headed"
  },

How to execute : npm run test_dev_cr_hd

# Encryt and decrypt data
============================
npm i crypto-js

Create a EncyptedData:

Execute below command for generate Encrypted Key:
SECRET_KEY which is comming from common utilis file

Example:
----------
SECRET_KEY=<anyname> npm run test_dev_cr_hd
SECRET_KEY=credential_dev npm run test_dev_cr_hl


