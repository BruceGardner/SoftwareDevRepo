/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Product Creation', () => {

  const generateFakeProduct = () => ({
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 1, max: 1000 }),
    inventory: faker.number.int({ min: 1, max: 100 })
  });

  beforeEach(() => {
    cy.visit('http://localhost:5273/');
  });

  it('should show the create product form', () => {
    cy.get('#create-product-form').should('exist');
    cy.get('#product-name').should('exist');
    cy.get('#product-price').should('exist');
    cy.get('#product-inventory').should('exist');
  });

  it('should submit the form and show confirmation', () => {
    const product = generateFakeProduct();

    cy.get('#product-name').type(product.name);
    cy.get('#product-price').type(product.price.toString());
    cy.get('#product-inventory').type(product.inventory.toString());

    cy.get('#create-product-form').submit();

    cy.get('#confirmation-message')
      .should('be.visible')
      .and('contain.text', 'Product Created');
  });

  it('should display the new product in the list', () => {
    const product = generateFakeProduct();

    cy.get('#product-name').type(product.name);
    cy.get('#product-price').type(product.price.toString());
    cy.get('#product-inventory').type(product.inventory.toString());

    cy.get('#create-product-form').submit();

    cy.get('#products-list li')
      .should('contain.text', product.name)
      .and('contain.text', `$${product.price}`)
      .and('contain.text', `Stock: ${product.inventory}`);
  });

});