import { catalogItem as item } from "../../data/catalogData";
import authData from "../../data/authData";

describe("Add to Cart", () => {
  beforeEach(() => {
    cy.visit("/catalog/items");
    cy.intercept("GET", "/api/catalog/items?", {
      statusCode: 200,
      body: [item],
    });
    cy.get(`a[data-test="item-card-${item.id}"]`).click();
    cy.url().should("contain", `/catalog/items/${item.id}`);
  });

  it("should display add to cart button", () => {
    cy.get('button[data-test="add-to-cart"]').should("be.visible");
  });

  it("should login and redirect to item page", () => {
    cy.get('button[data-test="add-to-cart"]').click();
    cy.get('a[data-test="cart-dialog-login"]').click();
    cy.url().should("contain", "auth/login");

    cy.get('input[name="email"]').type(authData.user.email);
    cy.get('input[name="password"]').type(authData.user.password);
    cy.intercept("POST", "/api/auth/login*", {
      statusCode: 200,
      body: {
        accessToken: authData.customerToken,
      },
    });
    cy.get('button[type="submit"]').click();

    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/catalog/items/${item.id}`
    );
  });
});
