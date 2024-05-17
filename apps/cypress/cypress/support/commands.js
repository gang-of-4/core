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

// Orders
Cypress.Commands.add("viewOrderDetails", () => {
  cy.get("table tbody tr")
    .first()
    .find('a[data-test="view-order-details"]')
    .click();
  cy.url().should("contain", "/admin/dashboard/orders/");
  cy.intercept("GET", "/admin/api/orders/*", {
    statusCode: 200,
    body: {
      uuid: "7d8976e2-da11-4aff-b632-c0a5e3527683",
      id: 1,
      userId: "91404c38-df08-47aa-b12a-415cb77516e8",
      user: {
        id: "91404c38-df08-47aa-b12a-415cb77516e8",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
      total: 3000,
      subtotal: 3000,
      status: "INPROGRESS",
      createdAt: "2024-05-06T03:40:11.654Z",
      updatedAt: "2024-05-06T12:35:45.791Z",
      deletedAt: null,
      address: {
        id: "1b11f7d5-9bae-4c92-8d7b-383908a5e355",
        country: "Harum ipsum impedit",
        city: "Officia in id culpa ",
        state: "Ea magnam proident ",
        street: "Cupidatat nihil aspe",
        postalCode: "Saepe labore autem u",
        notes: "Sunt ea non ex sequi",
      },
      items: [
        {
          id: "d6523d8b-f228-4eaa-a541-417b63853daf",
          name: "BMW M4",
          sku: "asdaw",
          quantity: 3,
          price: 1000,
          storeId: "ae1a8963-438d-4d5d-a340-2786f5009b70",
          status: "INPROGRESS",
          isVariant: true,
          images: [
            {
              id: "30347b84-5bc2-49ff-b704-ca361f612578",
              name: "890d95ca-6941-48dd-ac58-6ef407a5d45c.jpg",
              extension: "jpg",
              url: "https://media.cars4sale.tech/48535cf3-af64-4aa0-85e4-80812c708b84/890d95ca-6941-48dd-ac58-6ef407a5d45c.jpg",
              size: 7270,
            },
            {
              id: "2731508c-96da-4c0a-b605-d5a63d16c765",
              name: "dd166bac-ce4f-4755-bec0-34af7ac3578f.jpg",
              extension: "jpg",
              url: "https://media.cars4sale.tech/48535cf3-af64-4aa0-85e4-80812c708b84/dd166bac-ce4f-4755-bec0-34af7ac3578f.jpg",
              size: 231896,
            },
          ],
          groups: [
            {
              id: "13df0159-aba2-45c3-81ad-2553c41b4492",
              title: "Color",
              type: "COLOR",
              options: [
                {
                  id: "73b56c1c-db5b-49ea-9b84-bd804b5e2605",
                  label: "Dark Blue",
                  value: "#050970",
                },
              ],
            },
            {
              id: "4daf5261-f9c6-4f64-bb6e-107a3eb710d5",
              title: "Windows",
              type: "TEXT",
              options: [
                {
                  id: "4c9de928-33e3-466a-858c-3e59b0675ea7",
                  label: "Semi-Tinted",
                  value: "semi-tinted",
                },
              ],
            },
          ],
        },
      ],
    },
  });
});
