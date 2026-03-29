describe('Authentication & Product Creation', () => {
    const baseUrl = 'http://localhost:8000/index.php'; // PHP dev server URL

    it('should show login form when not logged in', () => {
        cy.visit(baseUrl);
        cy.get('form').should('exist'); // login form exists
        cy.contains('Login').should('exist');
    });

    it('should allow login', () => {
        cy.visit(baseUrl);
        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button').contains('Login').click();
        cy.contains('Logged in as user ID').should('exist');
        cy.contains('Create a Product').should('exist');
    });

    it('should allow product creation', () => {
        cy.visit(baseUrl);
        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button').contains('Login').click();

        cy.get('input[name=product_name]').type('Test Product');
        cy.get('input[name=product_price]').type('99');
        cy.get('input[name=product_inventory]').type('10');
        cy.get('button').contains('Create Product').click();

        cy.contains('Product created with ID:').should('exist');
        cy.contains('Test Product').should('exist');
    });
});