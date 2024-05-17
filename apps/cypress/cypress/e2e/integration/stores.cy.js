import authData from "../../data/authData";
import storesData from "../../data/storesData";

describe("Store features work", () => {
  before(() => {
    cy.registerVendor(authData.vendor);
  });

  const storeName = `${authData.vendor.firstName} ${authData.vendor.lastName}'s Garage`;

  it("Creates individual store", () => {
    cy.createIndividualStore();
    cy.selectStore(storeName);
    cy.checkStoreStatus("PENDING");
  });

  it("Creates business store", () => {
    cy.loginVendor({
      email: authData.vendor.email,
      password: authData.vendor.password,
    });
    cy.createBusinessStore(storesData.businessStore);
    cy.selectStore(storesData.businessStore.storeName);
    cy.checkStoreStatus("PENDING");
  });

  it("Approves store by admin", () => {
    cy.loginAdmin(authData.admin);
    cy.approveStore(storesData.businessStore.storeName);

    cy.loginVendor({
      email: authData.vendor.email,
      password: authData.vendor.password,
    });
    cy.selectStore(storesData.businessStore.storeName);
    cy.checkStoreStatus("APPROVED");
  });

  // it("Edits store", () => {
  //   cy.loginVendor({
  //     email: authData.vendor.email,
  //     password: authData.vendor.password,
  //   });
  //   cy.selectStore(storesData.businessStore.storeName);
  //   cy.editStore("New Name");
  // });

  it("Deletes store", () => {
    cy.loginVendor({
      email: authData.vendor.email,
      password: authData.vendor.password,
    });
    cy.selectStore(storeName);
    cy.deleteStore(storeName);
  });
});
