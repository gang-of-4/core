describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/admin');
    });

    it('should navigate to login page from landing page"', () => {
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('contain', '/admin/auth/login');
    });
  });
  