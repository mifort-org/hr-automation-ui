# Cypress

* Test file name format should be in **\*.cy.js** - or Cypress will exclude them from execution.
* Examples that cover most of Cypress's functionality, which can help in development are in => **cypress/e2e/examples** folder.
* To select elements from the dom we want to use **data-cy='somevalue'** attribute on html tags. For example : 
```
<mat-card data-cy='candidate-card'>
  ...
</mat-card>

Select in the test with: 

cy.get('[data-cy=candidate.card]')
```
We can select elements with other query selectors just like JQuery, but this will ensure that we won't break the tests by changing class names or Id's.

---

Link to Cypress [Docs]('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn')

Happy coding 😊
