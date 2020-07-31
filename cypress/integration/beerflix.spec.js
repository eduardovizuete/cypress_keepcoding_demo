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
        cy.fixture('login.json')
            .then(({ user, fakePwd }) => {
                cy.log(user)
                cy.get('[data-cy=email-input]').type('user');
                cy.get('[data-cy=password-input]').type('fakePwd', {log: false});
            })
    });
});
