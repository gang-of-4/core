import authData from "../../data/authData";

describe("auth works", () => {
  // customer auth
  it("should have a working customer account", () => {
    const STORAGE_KEY = "customerAccessToken";

    cy.registerCustomer(authData.user);

    cy.logout({ storageKey: STORAGE_KEY });

    cy.loginCustomer({
      email: authData.user.email,
      password: authData.user.password,
    });
  });

  // vendor auth
  it("should have a working vendor account", () => {
    const STORAGE_KEY = "vendorAccessToken";

    cy.registerVendor(authData.vendor);

    // Logout vendor
    cy.logout({ storageKey: STORAGE_KEY });

    // Login vendor
    cy.loginVendor({
      email: authData.vendor.email,
      password: authData.vendor.password,
    });
  });

  // admin auth
  it("should have a working admin account", () => {
    // Login admin
    cy.loginAdmin(authData.admin);
  });
});
