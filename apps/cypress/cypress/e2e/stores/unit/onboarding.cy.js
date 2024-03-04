

// describe('Onboarding Page', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/vendor/auth/login');

//         cy.get('input[name="email"]').type('aghaboon@gmail.com');
//         cy.get('input[name="password"]').type('12344321');
//         cy.get('button[type="submit"]').click();
//     });

//     beforeEach(() => {
//         cy.visit('http://localhost:3000/vendor/onboarding');
//     })

//     it('should display two buttons', () => {
//         cy.get('button[id="individualStoreButton"]').should('exist').should('be.visible').should('be.enabled');
//         cy.get('button[id="businessStoreButton"]').should('exist').should('be.visible').should('be.enabled');
//     });

//     it('should redirect to dashboard of Individual Store', () => {
//         cy.get('button[id="individualStoreButton"]').should('exist').click();

//         cy.url().should('contain', 'http://localhost:3000/vendor/dashboard', { timeout: 10000 });
//     });

//     it('should redirect to dashboard of Business Store', () => {
//         cy.get('button[id="businessStoreButton"]').should('exist').click();

//         cy.url().should('contain', 'http://localhost:3000/vendor/stores/create', { timeout: 10000 });
//     });
// });
