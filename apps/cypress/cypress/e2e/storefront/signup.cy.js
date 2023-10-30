describe('Sign Up Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/auth/signup'); // Replace with the actual path to your sign-up page
    });

    // Done Successfully 
    it('should display sign-up form elements', () => {
        cy.contains('Sign up').should('exist');

        cy.get('input[name="firstName"]').should('exist');
        cy.get('input[name="lastName"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="phone"]').should('exist');
        cy.get('input[name="password"]').should('exist');

        cy.get('button[type="submit"]').should('exist');
    });

    // Done Successfully 
    it('should display validation errors for empty form submission', () => {
        // Attempt to submit the form without entering any data
        cy.get('button[type="submit"]').click();

        // Check if validation error messages are displayed for all fields
        cy.contains('First name is required').should('exist');
        cy.contains('Last name is required').should('exist');
        cy.contains('Email is required').should('exist');
        cy.contains('Phone number is required').should('exist');
        cy.contains('Password is required').should('exist');
    });

    // Done Successfully 
    it('should navigate to login page when "Already have an account?"', () => {
        cy.contains('Already have an account?').should('exist');
        cy.contains('Login').click();
        cy.url().should('eq', 'http://localhost:3000/auth/login');
    });

    // Done Successfully 
    it('should submit the form with valid data', () => {
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('johndoe@example.com');
        cy.get('input[name="phone"]').type('1234567890');
        cy.get('input[name="password"]').type('Password123!');

        cy.contains('Sign up').click();
        // cy.url().should('eq', 'http://localhost:3000/');
    });
});
