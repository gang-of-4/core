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
        email: 'tba',
        password: 'tba'
    };

    function visitVendorDashboard(){
        cy.visit('/admin/dashboard');
        cy.contains('The page you are looking for isn’t here')
    }

    function visitAdminDashboard(){
        cy.visit('/admin/dashboard');
        cy.contains('The page you are looking for isn’t here')
    }

    // customer auth
    it('should have a working customer account', () => {

        // Register vendor
        cy.visit('/auth/signup');
        cy.get('input[name="firstName"]').type(user.firstName);
        cy.get('input[name="lastName"]').type(user.lastName);
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('input[name="passwordConfirmation"]').type(user.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.a('string');
        });
        cy.url().should('contain', '/');


        // Logout vendor
        cy.get('.account-dropdown').click();
        cy.contains('Logout').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.null;
        });
        cy.url().should('contain', '/');

        // Login vendor
        cy.visit('/auth/login');
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.a('string');
        });
        cy.url().should('contain', '/');

        visitVendorDashboard()
        visitAdminDashboard()

    });

    // vendor auth
    it('should have a working vendor account', () => {

        // Register vendor
        cy.visit('/vendor/auth/signup');
        cy.get('input[name="firstName"]').type(vendor.firstName);
        cy.get('input[name="lastName"]').type(vendor.lastName);
        cy.get('input[name="email"]').type(vendor.email);
        cy.get('input[name="password"]').type(vendor.password);
        cy.get('input[name="passwordConfirmation"]').type(vendor.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.a('string');
        });
        cy.url().should('contain', '/vendor');


        // Logout vendor
        cy.get('.account-dropdown').click();
        cy.contains('Logout').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.null;
        });
        cy.url().should('contain', '/vendor');

        // Login vendor
        cy.visit('/vendor/auth/login');
        cy.get('input[name="email"]').type(vendor.email);
        cy.get('input[name="password"]').type(vendor.password);
        cy.get('button[type="submit"]').click().should(() => {
            expect(localStorage.getItem('accessToken')).to.be.a('string');
        });
        cy.url().should('contain', '/vendor');

        visitAdminDashboard()
    });

    // admin auth tba

 })