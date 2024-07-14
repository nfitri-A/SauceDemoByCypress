/// <reference types="cypress" />

describe('the user logs in', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/', { timeout: 10000 });
      });
    it('verify website', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
    });

    it('Logout system', () => {
        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password

            cy.get('#user-name').clear()
            cy.get('#user-name').type(username)

            cy.get('#password').clear()
            cy.get('#password').type(password)
            
            cy.get('#login-button').click()

            cy.get('.title').should('have.text', 'Products')
            cy.get('.bm-burger-button').click()
            cy.get('#logout_sidebar_link').click()
        });
    });
   
});
