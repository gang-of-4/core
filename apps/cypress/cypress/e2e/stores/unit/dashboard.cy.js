// // cypress/integration/store.spec.js

// describe('Store Page', () => {
//     before(() => {
//         cy.visit('http://localhost:3000/vendor/auth/login');

//         cy.get('input[name="email"]').type('aghaboon@gmail.com');
//         cy.get('input[name="password"]').type('12344321');
//         cy.get('button[type="submit"]').click();

//     });

//     beforeEach(() => {
//         cy.visit('http://localhost:3000/vendor/dashboard');
//     });

//     it('should display dashboard', () => {
//         cy.get('button[id="individualStoreButton"]').should('exist').click();

//         cy.visit('http://localhost:3000/vendor/dashboard');
//         cy.contains('Welcome to the Vendor Dashboard').should('exist');
//         cy.contains('Select a store from the left to manage it.').should('exist');
//         cy.get('[type="button"]').should('exist').first().click();
//         // cy.contains('OverView').should('exist').should('be.visible').should('be.enabled');

//     });
// });
