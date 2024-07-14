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

    it('Saucedemo testing functions', () => {
        cy.visit('https://www.saucedemo.com/v1/inventory.html'); //v1 dapat dari mana?
        
         //Select a product and add it to cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('exist');
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click();
        // cy.get('#add-to-cart-sauce-labs-bike-light').click()
         //Open the cart and verify if the product was added
        cy.get('.shopping_cart_link').click();
        cy.get('.item_pricebar > .btn_secondary').should('exist');

        //Verify if you can delete a product from cart
        cy.get('.item_pricebar > .btn_secondary').click();
        cy.get('.item_pricebar > .btn_secondary').should('not.exist');

        //Add a product to cart and check all the steps for ordering it
        cy.get('.btn_secondary').click(); //Return to shop and add a product to cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click();
        cy.get('.shopping_cart_link').click();
        cy.get('.btn_action').click(); //Click checkout button and verify the steps
       
        // faker
        const first_name_faker = faker.person.firstName()
        cy.get('#first-name').type(first_name_faker)
        cy.get('#first-name').should('have.value', first_name_faker)
        const last_name_faker = faker.person.lastName()
        cy.get('#last-name').type(last_name_faker)
        cy.get('#last-name').should('have.value', last_name_faker)
        const postal_code_faker = faker.number.int()
        cy.get('#postal-code').type(postal_code_faker)
        cy.get('#postal-code').should('have.value', postal_code_faker)

        // fixtures
        // cy.fixture("biodata").then(biodata => {
        //     const firstname = biodata.firstname
        //     const lastname = biodata.lastname
        //     const postalcode = biodata.postalcode
        //     cy.get('#first-name').type(firstname)
        //     cy.get('#first-name').should('have.value', firstname)
        //     cy.get('#last-name').type(lastname)
        //     cy.get('#last-name').should('have.value', lastname)
        //     cy.get('#postal-code').type(postalcode)
        //     cy.get('#postal-code').should('have.value', postalcode)
        // });

        // normal
        // cy.get('[data-test="firstName"]').type('nurul'); //Complete the firstname, the lastname and postal Code
        // cy.wait(500);
        // cy.get('[data-test="lastName"]').type('Fitri');
        // cy.wait(500);
        // cy.get('[data-test="postalCode"]').type('123456');
        // cy.wait(500);


        cy.get('.btn_primary').click();
        cy.get('.btn_action').should('exist');
        cy.get('.btn_action').click();
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get\n                there!\n            ');
        cy.wait(500);   
         
    });

});
