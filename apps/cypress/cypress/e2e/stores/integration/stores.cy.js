import testData from "../../../testData";

describe('Store features work', () => {

    before(() => {
        cy.vendorRegister(testData.vendor);
    });

    // beforeEach(() => {
    // });

    it('Creates individual store', () => {
        cy.createIndividualStore();
        cy.selectStore(`${testData.vendor.firstName} ${testData.vendor.lastName}'s Store`);
        cy.checkStoreStatus('PENDING');
    });

    it('Creates business store', () => {
        cy.vendorLogin({
            email: testData.vendor.email,
            password: testData.vendor.password
        });
        cy.createBusinessStore(testData.businessStore);
        cy.selectStore(testData.businessStore.storeName);
        cy.checkStoreStatus('PENDING');
    });

    it('Approves store by admin', () => {
        cy.adminLogin(testData.admin);
        cy.adminApproveStore(testData.businessStore.storeName);
        
        cy.vendorLogin({
            email: testData.vendor.email,
            password: testData.vendor.password
        });
        cy.selectStore(testData.businessStore.storeName);
        cy.checkStoreStatus('APPROVED');
    });

    it('Edits store', () => {
        cy.vendorLogin({
            email: testData.vendor.email,
            password: testData.vendor.password
        });
        cy.selectStore(testData.businessStore.storeName);
        cy.editStore('New Name');
    });

    it('Deletes store', () => {
        cy.vendorLogin({
            email: testData.vendor.email,
            password: testData.vendor.password
        });
        cy.selectStore('New Name');
        cy.deleteStore('New Name');
    });

});