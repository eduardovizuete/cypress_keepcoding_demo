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
                cy.screenshot('my-screenshot-login-1', {
                    capture: 'runner'
                });
                cy.login({ user, fakePwd });
                cy.wait('@loginRequest');
                cy.url().should('include', '/home');
            })
    });

    it('login error', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/v1/user/login',
            status: 404,
            response: 'fixture:loginErrorResponse'
        }).as('loginRequest');
        cy.get('@loginData')
            .then(({ user, fakePwd }) => {
                cy.screenshot('my-screenshot-login-error-2', {
                    capture: 'viewport',
                    blackout: ['form']
                });
                cy.login({ user, fakePwd });
                cy.wait('@loginRequest');
                cy.get('[data-cy=login-error]');
            })
    });

    it('Get beers 10', () => {
        cy.server();
        cy.route('GET', '/api/v1/beers**').as('getBeers');
        cy.login();
        cy.wait('@getBeers')
        cy.get('[data-cy=beer-item]').should('have.length', 10);
    });
});
