describe('beerflix app', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    
    
    it('visit app', () => {
        cy.get('[data-cy=email-input]');
        cy.get('[data-cy=login-image]')
            .should('have.attr', 'src')
            .should('include', 'emoji-beer');
    });

    it.only('login', () => {
        cy.get('[data-cy=email-input]').type('kevin');
        cy.get('[data-cy=password-input]').type('kevin', {log: false});
    });
});

