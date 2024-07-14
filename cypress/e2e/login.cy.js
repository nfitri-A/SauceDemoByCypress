/// <reference types="cypress" />

require('cypress-xpath');

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(3000);
  })

  it('Login as Valid Username', () => {
    cy.xpath("//input[@id='user-name']").type("standard_user");
    cy.wait(3000);
    cy.xpath("//input[@id='password']").type("secret_sauce");
    cy.wait(3000);
    cy.xpath("//input[@id='login-button']").click();
    cy.contains("Products").should('be.visible');
    cy.screenshot();
    cy.wait(5000);
  })

  it('Login as Invalid Username', () => {
    cy.xpath("//input[@id='user-name']").type("standard_user1");
    cy.wait(3000);
    cy.xpath("//input[@id='password']").type("secret_sauce");
    cy.wait(3000);
    cy.xpath("//input[@id='login-button']").click();
    cy.xpath("//h3[contains(text(),'Epic sadface: Username and password do not match a')]").should('have.text', "Epic sadface: Username and password do not match any user in this service");
    cy.screenshot();
    cy.wait(5000);
  })
});