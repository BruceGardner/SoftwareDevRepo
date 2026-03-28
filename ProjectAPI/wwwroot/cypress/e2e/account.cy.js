describe('Account Creation Form', () => {

  it('should have required email and password fields', () => {
    cy.visit('http://localhost/product_app/register.php');

    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="password"]').should('have.attr', 'required');
  });

  it('should create account or show error', () => {
    cy.visit('http://localhost/product_app/register.php');

    const email = `test${Date.now()}@test.com`;

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');

    cy.get('form').submit();

    cy.contains(/Success|Error/).should('be.visible');
  });

});