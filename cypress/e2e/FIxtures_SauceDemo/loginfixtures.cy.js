/// <reference types="cypress" />

describe('the user logs in', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/', { timeout: 10000 });
      });
    it('verify website', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
    });

    it('success login', () => {
        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password

            cy.get('#user-name').clear()
            cy.get('#user-name').type(username)

            cy.get('#password').clear()
            cy.get('#password').type(password)
            
            cy.get('#login-button').click()

            cy.get('.title').should('have.text', 'Products')
        });
    });

    it('user inputs username and password incorrectly', () => {
        cy.fixture("user").then(user => {
           const failedusername = user.failedusername
           const failedpassword = user.failedpassword

           cy.get('#user-name').clear()
            cy.get('#user-name').type(failedusername)

            cy.get('#password').clear()
            cy.get('#password').type(failedpassword)
            
            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

        });
    });

    it('user inputs username and password empty', () => {
        cy.fixture("user").then(user => {
            const emptyusername = user.emptyusername
            const emptypassword = user.emptypassword

            cy.get('#user-name').clear()

            cy.get('#password').clear()

            cy.get('#login-button').click()
            
            cy.get('h3').should('have.text', 'Epic sadface: Username is required')
        });
    });
});
