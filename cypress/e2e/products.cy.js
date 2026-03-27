describe("Products Page", () => {
  it("shows the products list with seeded data", () => {
    cy.visit("index.html");
    cy.contains("h1", "Products:");
    cy.get("#products-list").should("exist");
    cy.get("#products-list li").should("have.length.at.least", 2);
    cy.get("#products-list").should("contain", "Testing Dummy");
    cy.get("#products-list").should("contain", "70");
    cy.get("#products-list").should("contain", "1");
    cy.get("#products-list").should("contain", "Laser Gun");
    cy.get("#products-list").should("contain", "500");
    cy.get("#products-list").should("contain", "4");
  });
});