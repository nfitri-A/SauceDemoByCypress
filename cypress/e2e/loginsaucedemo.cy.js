/// <reference types="cypress" />

describe('Login with inputs', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/', { timeout: 10000 });
      });
    it('success login', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').clear()
        cy.get('#user-name').type('standard_user').should('have.value', 'standard_user')
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('secret_sauce').should('have.value', 'secret_sauce')
        cy.get('.btn_action').click()
        cy.get('.title').should('contain', 'Products')
    });
});
