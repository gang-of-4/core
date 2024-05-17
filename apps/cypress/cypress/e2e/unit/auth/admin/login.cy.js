describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/admin/auth/login");
  });

  // Done Successfully
  it("should have a form with email, password fields, and a submit button", () => {
    cy.get('input[name="email"]').should("exist");

    cy.get('input[name="password"]').should("exist");

    cy.get('button[type="submit"]').should("exist");
  });

  // Error display error message
  it("should display validation errors when submitting empty form", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Email is required").should("exist"); // Set a longer timeout if needed
    cy.contains("Password is required").should("exist");
  });

  // Error display error message
  it("should display validation error when entering invalid email", () => {
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('button[type="submit"]').click();

    cy.contains("Must be a valid email").should("exist", { timeout: 80000 });
  });

  // Done Successfully
  it("should submit the form with valid email and password", () => {
    cy.get('input[name="email"]').type("validemail@example.com");
    cy.get('input[name="password"]').type("Password123!");

    cy.get('button[type="submit"]').click();
  });
});
