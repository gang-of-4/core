describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login');
  });

  // Error display error message 
  it('should have a message for Sign up, and Sign up button', () => {
    //  Check if email input field exists
    // cy.contains('Dont have an account?').should('exist');

    cy.get('link[type="Sign up"]').should('exist');
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

  // Done Successfully 
  it('should display validation errors when submitting empty form', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required').should('exist'); // Set a longer timeout if needed
    cy.contains('Password is required').should('exist');
  });

  // Done Successfully  
  it('should display validation error when entering invalid email', () => {
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.contains('Must be a valid email').should('exist', { timeout: 80000 });
  });

  // Done Successfully
  it('should submit the form with valid email and password', () => {
    cy.get('input[name="email"]').type('validemail@example.com');
    cy.get('input[name="password"]').type('Password123!');

    cy.get('button[type="submit"]').click();
  });
});
