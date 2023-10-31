describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should navigate to login page from landing page"', () => {
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('contain', '/auth/login');
    });
  });
  