// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-test=email-input]').type(email)
  cy.get('[data-test=password-input]').type(password)
  cy.get('[data-test=login-button]').click()
})

//
// -- This is a child command --
Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-test=${selector}]`)
})

//
// -- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => {
  return cy.wrap(subject).click({ force: true })
})

//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })