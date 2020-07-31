describe('beerflix app', () => {
    beforeEach(() => {
        cy.fixture('login.json').as('loginData');
        cy.visit('/');
    });
    
    
    it('visit app', () => {
        cy.get('[data-cy=email-input]');
        cy.get('[data-cy=login-image]')
            .should('have.attr', 'src')
            .should('include', 'emoji-beer');
    });

    it('login', () => {
        cy.server();
        cy.route('POST', '/api/v1/user/login').as('loginRequest');
        cy.get('@loginData')
            .then(({ user, fakePwd }) => {
                cy.log(user)
                cy.get('[data-cy=email-input]').type(user);
                cy.get('[data-cy=password-input]').type(fakePwd, {log: false});
                cy.wait('@loginRequest');
                cy.url().should('include', '/home');
            })
    });

    it.only('login error', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/v1/user/login',
            status: 404,
            response: 'fixture:loginErrorResponse'
        }).as('loginRequest');
        cy.get('@loginData')
            .then(({ user, fakePwd }) => {
                cy.log(user)
                cy.get('[data-cy=email-input]').type(user);
                cy.get('[data-cy=password-input]').type(fakePwd, {log: false});
                cy.wait('@loginRequest');
                cy.get('[data-cy=login-error]')
            })
    });
});
