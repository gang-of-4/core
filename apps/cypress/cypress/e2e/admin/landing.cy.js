describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin');
    });

    it('should navigate to login page from landing page"', () => {
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('eq', 'http://localhost:3000/auth/login');
    });
  });
  