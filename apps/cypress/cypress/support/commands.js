// Auth
Cypress.Commands.add(
  "registerVendor",
  ({ firstName, lastName, email, password }) => {
    cy.visit("/vendor/auth/signup");
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirmation"]').type(password);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        expect(localStorage.getItem("vendorAccessToken")).to.be.a("string");
      });
    cy.url().should("contain", "/vendor");
  }
);

Cypress.Commands.add("loginVendor", ({ email, password }) => {
  cy.visit("/vendor/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]')
    .click()
    .should(() => {
      expect(localStorage.getItem("vendorAccessToken")).to.be.a("string");
    });
  cy.url().should("contain", "/vendor");
});

Cypress.Commands.add("loginAdmin", ({ email, password }) => {
  cy.visit("/admin/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]')
    .click()
    .should(() => {
      expect(localStorage.getItem("adminAccessToken")).to.be.a("string");
    });
  cy.url().should("contain", "/admin");
});

Cypress.Commands.add(
  "registerCustomer",
  ({ firstName, lastName, email, password }) => {
    cy.visit("/auth/signup");
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirmation"]').type(password);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        expect(localStorage.getItem("customerAccessToken")).to.be.a("string");
      });
  }
);

Cypress.Commands.add("loginCustomer", ({ email, password }) => {
  cy.visit("/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]')
    .click()
    .should(() => {
      expect(localStorage.getItem("customerAccessToken")).to.be.a("string");
    });
  cy.url().should("contain", "/");
});

Cypress.Commands.add("logout", ({ storageKey }) => {
  cy.get(".account-dropdown").click();
  cy.contains("Logout")
    .click()
    .should(() => {
      expect(localStorage.getItem(storageKey)).to.be.null;
    });
  cy.url().should("contain", "/");
});

// Stores
Cypress.Commands.add("createIndividualStore", () => {
  cy.url().should("contain", "/vendor/onboarding");
  cy.get('button[data-test="individual-store-button"]').click();
  cy.url().should("contain", "/vendor/dashboard");
});

Cypress.Commands.add(
  "createBusinessStore",
  ({ storeName, vatNumber, crNumber, ownerNationalId }) => {
    cy.visit("/vendor/onboarding");
    cy.get('a[data-test="business-store-button"]').click();
    cy.url().should("contain", "/vendor/stores/create");
    cy.get('input[name="name"]').type(storeName);
    cy.get('input[name="vatNumber"]').type(vatNumber);
    cy.get('input[name="crNumber"]').type(crNumber);
    cy.get('input[name="ownerNationalId"]').type(ownerNationalId);
    cy.get('button[type="submit"]').click();
    cy.url().should("contain", "/vendor/dashboard");
  }
);

Cypress.Commands.add("selectStore", (storeName) => {
  cy.visit("/vendor/dashboard");
  cy.get('button[data-test="mobile-nav-open"]').click();
  cy.get('button[data-test="option-switch"]').click();
  cy.contains(storeName).click();

  cy.url().should("contain", "/vendor/dashboard/stores/");
  cy.contains(storeName).should("exist");
});

Cypress.Commands.add("editStore", (newStoreName) => {
  cy.scrollTo("top");

  cy.get('a[data-test="edit-store-button"]').click();
  cy.url().should("contain", "/edit");

  cy.get('input[name="name"]').clear().type(newStoreName);
  cy.get('button[type="submit"]').click();
  cy.url().should("contain", "/vendor/dashboard");

  cy.contains(newStoreName);
});

Cypress.Commands.add("deleteStore", (storeName) => {
  cy.get('button[data-test="delete-store-button"]').click();
  cy.get('button[data-test="confirm-delete-store-button"]').click();
  cy.url().should("contain", "/vendor/dashboard");

  cy.get('button[data-test="mobile-nav-open"]').click();
  cy.get('button[data-test="option-switch"]').click();
  cy.contains(storeName).should("not.exist");
});

Cypress.Commands.add("checkStoreStatus", (status) => {
  cy.get('[data-test="store-status-pill"]').should("have.text", status);
});

Cypress.Commands.add("approveStore", (storeName) => {
  cy.visit("/admin/dashboard/stores");

  cy.get('button[data-test="multi-select-Status"]').click();
  cy.get('[data-test="multi-select-Status-PENDING"]').click();
  cy.get("body").click();

  cy.get(`button[data-test="store-toggle-${storeName}"]`).click();

  cy.get('[data-test="status-select"]').click();
  cy.get('[data-test="status-APPROVED"]').click();

  cy.get('button[type="submit"]').click();
});
