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

    it('Checkout', () => {
        cy.visit('https://www.saucedemo.com/v1/inventory.html');
        it("select 2 products", () => {
            cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
                .invoke('val').as('inventoryItemName0');
            cy.get(':nth-child(1) > .pricebar > .btn_secondary')
                .should("contain","REMOVE")
            cy.get(':nth-child(4) > .pricebar > .btn_primary').click()
                .invoke('val').as('inventoryItemName1');
            cy.get(':nth-child(4) > .pricebar > .btn_secondary')
                .should("contain","REMOVE")
            cy.get('.fa-layers-counter')
                .should("contain","2")
        });
        
        it.only("check cart", () => {
            cy.get('path').click();
            cy.get('.subheader').should("contain","Your Cart");
            cy.get('.inventory_item_name').should("have.length", 2).each((element, index) => {
                cy.get("@inventoryItemName" + index).then(name => {
                     cy.wrap(element).should("include.text", name);
                });
            });
            cy.get('.inventory_item_price').should("have.length",2) 
                .should('contain',"49.99")
        });
    });
    
});