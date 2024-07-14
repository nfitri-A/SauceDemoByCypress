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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Login', (username, password) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('#user-name').clear()
    cy.get('#user-name').type(username)

    cy.get('#password').clear()
    cy.get('#password').type(password)
    
    cy.get('#login-button').click()

})
Cypress.Commands.add('Data', (firstname, lastname, postalcode) => {
    cy.get('#first-name').type(firstname)
    cy.get('#first-name').should('have.value', firstname)
    cy.get('#last-name').type(lastname)
    cy.get('#last-name').should('have.value', lastname)
    cy.get('#postal-code').type(postalcode)
    cy.get('#postal-code').should('have.value', postalcode)
    cy.get('#continue').click()
    
})