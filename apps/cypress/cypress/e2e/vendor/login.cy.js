describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin/auth/login'); 
    });
    
    // Done Successfully 
    it('should have a form with email, password fields, and a submit button', () => {
      // Check if email input field exists
      cy.get('input[name="email"]').should('exist');
  
      // Check if password input field exists
      cy.get('input[name="password"]').should('exist');
  
      // Check if submit button exists
      cy.get('button[type="submit"]').should('exist');
    });
  
    // Error display error message 
    it('should display validation errors when submitting empty form', () => {
      // Submit the form without entering any data
        cy.get('button[type="submit"]').click();
      
      // Check if validation error messages are displayed for email and password fields
      cy.contains('Email is required').should('exist'); // Set a longer timeout if needed
      cy.contains('Password is required').should('exist');
    });
  
    // Error display error message 
    it('should display validation error when entering invalid email', () => {
      // Enter invalid email and submit the form
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();
  
      // Check if validation error message is displayed for invalid email
      cy.contains('Must be a valid email').should('exist', { timeout: 80000 });
    });
  
    // Done Successfully
    it('should submit the form with valid email and password', () => {
      // Enter valid email and password
      cy.get('input[name="email"]').type('validemail@example.com');
      cy.get('input[name="password"]').type('Password123!');
      
      // Submit the form
      cy.get('button[type="submit"]').click();
    });
  });
  