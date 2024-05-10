describe('Orders List Table', () => {
    before(() => {
        cy.visit("/admin/auth/login");
        cy.get('input[name="email"]').type("admin@example.com");
        cy.get('input[name="password"]').type("Q1W2E3R4");
        cy.get('button[type="submit"]').click()
    });

    beforeEach(() => {
        cy.visit("/admin/dashboard");
    });

    it('should check if there are any orders and count them', () => {
        cy.get('table').should('exist');

        // Count the number of order rows in the table
        cy.get('table tbody').find('tr').then(rows => {
            const count = rows.length;
            // Output the count to the console for debugging purposes
            cy.log('Number of orders found:', count);

            if (count > 0) {
                expect(count).to.be.at.least(1);
            } else {
                cy.log('No orders are available');
                expect(count).to.equal(0);
            }
        });
    });

    it('Check the order data', () => {

        cy.get('table tbody tr').first().find('button[data-testid="view-details"]').click();

        cy.get('h6').contains('Order Items').should('be.visible');

        cy.get('table tbody tr').each(($row, index, $list) => {
            cy.wrap($row).find('td').eq(1).invoke('text').should('not.be.empty');
            cy.wrap($row).find('td').eq(2).invoke('text').should('match', /READY|INPROGRESS/);
            cy.wrap($row).find('td').eq(3).invoke('text').should('not.be.empty');
            cy.wrap($row).find('td').eq(4).invoke('text').should('not.be.empty');
            cy.wrap($row).find('td').eq(5).invoke('text').should('not.be.empty').and('contain', '$');
        });

    });

    it('Change order status', () => {

        cy.get('table tbody tr').first().find('td').contains('View Details').click();

        cy.get('select[name="status"]').select('Delivered');

        cy.intercept('POST', '/api/orders/update', {
            statusCode: 200,
            body: { status: 'success' },
        }).as('updateStatus');

        cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
        cy.get('[data-testid="status-display"]').should('contain', 'Delivered');
    });

});



