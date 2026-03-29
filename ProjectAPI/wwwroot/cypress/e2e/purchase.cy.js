/// <reference types="cypress" />

describe('Purchase Flow', () => {
  const baseUrl = 'http://localhost:8000/index.php';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(baseUrl);
  });

  it('shows login form if not logged in', () => {
    cy.get('form').contains('Login').should('exist');
    cy.contains('Create a Product').should('not.exist');
  });

  it('logs in successfully', () => {
    cy.get('form').contains('Login').parent('form').within(() => {
      cy.get('input[name=email]').type('test@example.com');
      cy.get('input[name=password]').type('password123');
      cy.get('button[type=submit]').click();
    });

    cy.contains('Logged in as user ID').should('exist');
    cy.contains('Create a Product').should('be.visible');
  });

  it('prevents purchasing more than stock', () => {
    // Login first
    cy.get('form').contains('Login').parent('form').within(() => {
      cy.get('input[name=email]').type('test@example.com');
      cy.get('input[name=password]').type('password123');
      cy.get('button[type=submit]').click();
    });

    // After login, grab the first product
    cy.get('#products-list li').first().then(($li) => {
      const stockText = $li.text().match(/Stock: (\d+)/)[1];
      const stock = parseInt(stockText);

      // Attempt to purchase more than stock
      const purchaseQty = stock + 1;

      // Fill in the purchase form (adjust your IDs/names in index.php)
      cy.get('#purchase-form input[name=quantity]').clear().type(purchaseQty);

      // Submit
      cy.get('#purchase-form button[type=submit]').click();

      // Assert that the system prevents it
      cy.contains('Invalid quantity').should('exist');
    });
  });
});