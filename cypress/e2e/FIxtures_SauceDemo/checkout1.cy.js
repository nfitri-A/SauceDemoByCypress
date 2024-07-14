/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('the user logs in', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/', { timeout: 10000 });
      });
    it('verify website', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'saucedemo.com')
    });

    it('process checkout items', () => {
        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password
            cy.Login(username, password)
         });
         cy.get('.title').should('have.text', 'Products')
         cy.get('#add-to-cart-sauce-labs-bike-light').click() // click add to chart Sauce labs bike light
         cy.get('#add-to-cart-sauce-labs-backpack').click() // click add to chart sauce labs backpack
         cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click() // click add to chart sauce labs bolt t-shirt
         cy.get('#remove-sauce-labs-backpack').click() // click remove sauce labs backpack

       // tombol filter masih error
         cy.get('.product_sort_container').select('Price (low to high)')
         
        cy.get('#shopping_cart_container').click()  //go to the shopping cart page
        cy.get('.title').should('have.text', 'Your Cart')
        cy.get('.app_logo').should('have.text', "Swag Labs")
        cy.get('#remove-sauce-labs-bolt-t-shirt').click()
        cy.get('#continue-shopping').click()
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#shopping_cart_container').click()  //go to the shopping cart page
        cy.get('#checkout').click()
        cy.get('#cancel').click()
        cy.get('#checkout').click()

        //go to the Checkout: Your Information page
        cy.get('.title').should('have.text', 'Checkout: Your Information')
        cy.get('.app_logo').should('have.text', "Swag Labs")
        cy.fixture("biodata").then(biodata => {
            const firstname = biodata.firstname
            const lastname = biodata.lastname
            const postalcode = biodata.postalcode
            cy.Data(firstname, lastname, postalcode)
            });
       //go to the Checkout: Overview page
       cy.get('.title').should('have.text', 'Checkout: Overview')
       cy.get('.app_logo').should('have.text', "Swag Labs")
       cy.get('.cart_quantity_label').should('have.text', 'QTY')
       cy.get('.cart_desc_label').should('have.text', 'Description')
       cy.get('#item_0_title_link').should('have.text', 'Sauce Labs Bike Light')

       cy.get('.summary_info').should('have.text', 'Payment Information:')
    //    cy.get('.summary_info_label').should('have.text', 'Payment Information:') 
    //    cy.get('.summary_value_label').should('have.text', 'SauceCard #31337')

    //    cy.get('.summary_info_label').should('have.text', 'Shipping Information:')
    //    cy.get('.summary_value_label').should('have.text', 'Free Pony Express Delivery!')
       cy.get('.summary_info_label').should('have.text', 'Price Total')
       cy.get('.summary_subtotal_label').should('have.text', 'Item total: $', '39.98')
       cy.get('.summary_tax_label').should('have.text', 'Tax: $', '3.20')
       cy.get('.summary_total_label').should('have.text', 'Total: $', '43.18')

        cy.get('#finish').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
        cy.get('.app_logo').should('have.text', "Swag Labs")
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        cy.get('#back-to-products').click()

});
}); 

