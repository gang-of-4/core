import authData from "../../data/authData";
import catalogData from "../../data/catalogData";

describe("Add Item", () => {
  before(() => {
    cy.registerVendor(authData.vendor);
    cy.createIndividualStore();
    cy.logout({ storageKey: "vendorAccessToken" });
  });

  beforeEach(() => {
    cy.loginVendor(authData.vendor);
    cy.selectStore(
      `${authData.vendor.firstName} ${authData.vendor.lastName}'s Garage`
    );
    cy.url().then((url) => {
      cy.visit(`${url}/items`);
    });
    cy.contains("Add Car").click();
    cy.url().should("contain", "/add");
  });

  it("should display add item form elements", () => {
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="sku"]').should("exist");
    cy.get('textarea[name="description"]').should("exist");
    cy.get('input[name="price"]').should("exist");
    cy.get('input[name="quantity"]').should("exist");
    cy.get('input[name="categories"]').should("exist");
    cy.get('input[name="options"]').should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });

  it("should cancel adding an item", () => {
    cy.contains("Cancel").click();
    cy.url().should("not.contain", "/add");
  });

  it("should display user input correctly", () => {
    cy.get('input[name="name"]').type(catalogData.item.name);
    cy.get('input[name="sku"]').type(catalogData.item.sku);
    cy.get('textarea[name="description"]').type(catalogData.item.description);
    cy.get('input[name="price"]').clear().type(catalogData.item.price);
    cy.get('input[name="quantity"]').clear().type(catalogData.item.quantity);

    cy.get('input[name="name"]').should("have.value", catalogData.item.name);
    cy.get('input[name="sku"]').should("have.value", catalogData.item.sku);
    cy.get('textarea[name="description"]').should(
      "have.value",
      catalogData.item.description
    );
    cy.get('input[name="price"]').should("have.value", catalogData.item.price);
    cy.get('input[name="quantity"]').should(
      "have.value",
      catalogData.item.quantity
    );
  });
});
