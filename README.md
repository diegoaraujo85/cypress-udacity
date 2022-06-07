https://udemy.com/course/testes-cypress

https://github.com/cypress-io/cypress-xpath


# Command line
## Cypress Open
```
yarn cyo
```

## Cypress Run
```
yarn cyr
```

## Cypress Run with Browser
```
yarn cyr --browser chrome --headless
```


## Cypress Run with Browser
```
yarn cyr --browser chrome --headless
```

## Cypress Run specific test (don't forget to write the complete path to file)
```
yarn cyr -- --spec "cypress/integration/test.spec.js"
```

## Cypress Run specific test showing cypress test runner (don't forget to write the complete path to file)
```
yarn cyr -- --spec "cypress/integration/test.spec.js" --headed --no-exit
```

## Cypress Run specific test inside a folder
```
yarn cyr -- --spec "cypress/integration/any_folder/**/*"
```

## Cypress Run using complete path to cypress
```
./node_modules/.bin/cypress run --spec "cypress/integration/test.spec.js" --browser chrome --headed --no-exit
```
