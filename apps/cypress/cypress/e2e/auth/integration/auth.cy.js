describe('auth works', () => {

    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: `${Date.now()}@example.com`,
        password: 'Password123!'
    };

    const vendor = {
        ...user,
        email: `v.${user.email}`,
    }

    const admin = {
        email: 'admin@example.com',
        password: 'Q1W2E3R4'
    };

    // customer auth
    it('should have a working customer account', () => {

        const STORAGE_KEY = 'customerAccessToken';

        // Register vendor
        cy.visit('/auth/signup');
        cy.get('input[name="firstName"]').type(user.firstName);
        cy.get('input[name="lastName"]').type(user.lastName);
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('input[name="passwordConfirmation"]').type(user.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.a('string');
        });
        cy.url().should('contain', '/');


        // Logout customer
        cy.get('.account-dropdown').click();
        cy.contains('Logout').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.null;
        });
        cy.url().should('contain', '/');

        // Login customer
        cy.visit('/auth/login');
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.a('string');
        });
        cy.url().should('contain', '/');
    });

    // vendor auth
    it('should have a working vendor account', () => {

        const STORAGE_KEY = 'vendorAccessToken';

        // Register vendor
        cy.visit('/vendor/auth/signup');
        cy.get('input[name="firstName"]').type(vendor.firstName);
        cy.get('input[name="lastName"]').type(vendor.lastName);
        cy.get('input[name="email"]').type(vendor.email);
        cy.get('input[name="password"]').type(vendor.password);
        cy.get('input[name="passwordConfirmation"]').type(vendor.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.a('string');
        });
        cy.url().should('contain', '/vendor');


        // Logout vendor
        cy.get('.account-dropdown').click();
        cy.contains('Logout').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.null;
        });
        cy.url().should('contain', '/vendor');

        // Login vendor
        cy.visit('/vendor/auth/login');
        cy.get('input[name="email"]').type(vendor.email);
        cy.get('input[name="password"]').type(vendor.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.a('string');
        });
        cy.url().should('contain', '/vendor');

    });

    // admin auth
    it('should have a working admin account', () => {

        const STORAGE_KEY = 'adminAccessToken';

        // Login admin
        cy.visit('/admin/auth/login');
        cy.get('input[name="email"]').type(admin.email);
        cy.get('input[name="password"]').type(admin.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem(STORAGE_KEY)).to.be.a('string');
        });
        cy.url().should('contain', '/admin');

    });

})