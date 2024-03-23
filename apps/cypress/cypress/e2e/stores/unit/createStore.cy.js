
// describe('Vendor Onboarding Page', () => {

//     beforeEach(() => {
//         cy.visit('http://localhost:3000/vendor/auth/login');

//         cy.get('input[name="email"]').type('aghaboon@gmail.com');
//         cy.get('input[name="password"]').type('12344321');
//         cy.get('button[type="submit"]').click();

//         cy.visit('http://localhost:3000/vendor/stores/create');
//     });

//     // Done
//     it('should find the input fields in the form', () => {
//         cy.get('input[name="name"]').should('exist');
//         cy.get('input[name="vatNumber"]').should('exist');
//         cy.get('input[name="crNumber"]').should('exist');
//         cy.get('input[name="ownerNationalId"]').should('exist');

//         cy.get('input[type="file"]').should('exist');

//         cy.get('button[type="submit"]').click();
//     });

//     // Done
//     it('should write the correct input in the form and submin', () => {
//         cy.get('input[name="name"]').type('Test Store');
//         cy.get('input[name="vatNumber"]').type('VAT12345');
//         cy.get('input[name="crNumber"]').type('CR12345');
//         cy.get('input[name="ownerNationalId"]').type('1234567890');

//         cy.fixture('test2.jpg').then((fileContent) => {
//             const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
//             const file = new File([blob], 'test2.jpg', { type: 'image/jpeg' });
//             cy.get('input[type="file"]').then((input) => {
//                 const dataTransfer = new DataTransfer();
//                 dataTransfer.items.add(file);
//                 input[0].files = dataTransfer.files;
//                 cy.wrap(input).trigger('change', { force: true });
//             });
//         });        

//         cy.get('button[type="submit"]').click();
//         cy.url().should('contain', 'http://localhost:3000/vendor/dashboard');
//     });

//     // Done
//     it('should display validation errors for empty form submission', () => {
//         cy.get('button[type="submit"]').click();

//         cy.contains('Name is required').should('exist');
//         cy.contains('Vat Number is required').should('exist');
//         cy.contains('CR Number is required').should('exist');
//         cy.contains('Owner National ID is required').should('exist');
//     });

//     // Done
//     it('should display validation error for file larger than 2MB', () => {
//         cy.fixture('test1.jpg').then((fileContent) => {
//             const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
//             const file = new File([blob], 'test1.jpg', { type: 'image/jpeg' });
//             cy.get('input[type="file"]').then((input) => {
//                 const dataTransfer = new DataTransfer();
//                 dataTransfer.items.add(file);
//                 input[0].files = dataTransfer.files;
//                 cy.wrap(input).trigger('change', { force: true });
//             });
//         });
//         cy.get('button[type="submit"]').click();

//         cy.contains('File size is too large. Maximum size is 2MB.').should('exist');

//     });
// });
