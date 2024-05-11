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
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTQwNGMzOC1kZjA4LTQ3YWEtYjEyYS00MTVjYjc3NTE2ZTgiLCJ1c2VyIjp7ImlkIjoiOTE0MDRjMzgtZGYwOC00N2FhLWIxMmEtNDE1Y2I3NzUxNmU4IiwiZmlyc3ROYW1lIjoiSmFzb24iLCJsYXN0TmFtZSI6IkdhcnJldHQiLCJlbWFpbCI6ImRpYnlAbWFpbGluYXRvci5jb20iLCJwaG9uZSI6bnVsbCwiZW1haWxWZXJpZmllZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTA1LTA1VDE3OjEzOjE0LjI5NVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA1LTA1VDE3OjEzOjE0LjI5NVoiLCJyb2xlIjp7ImlkIjoiMGUzNzQ0NjgtNzlmMS00MWU5LTlkOTEtMmNjMTczNTZhNTI5IiwibmFtZSI6ImN1c3RvbWVyIn19LCJpYXQiOjE3MTQ5MjkxOTUsImV4cCI6MTcxNTEwMTk5NX0.-JrzQQLk3CpEwPV-RwAMwj-PFIHBx7JR8AHNOa3_494",
      },
    });
    cy.get('button[type="submit"]').click();

    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/catalog/items/${item.id}`
    );
  });
});
