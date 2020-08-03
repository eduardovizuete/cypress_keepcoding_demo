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
        cy.route('GET', '/api/v1/beers**').as('beerRequest');
        cy.login();
        cy.wait('@beerRequest')
        cy.get('[data-cy=beer-item]').should('have.length', 10);
    });

    it('should add one like to the first', () => {
        cy.server();
        cy.route('POST', '/api/v1/beers/*/like').as('likeRequest');
        cy.route('GET', '/api/v1/beers**').as('beerRequest');
        cy.login();
        cy.get('[data-cy=search-input]').type('pilsen{enter}');
        cy.wait('@beerRequest');
        cy.get('[data-cy=beer-item]').first().should('have.id', '4');
        cy.get('[data-cy=beer-button]').first().as('firstLikeButton');
        cy.get('@firstLikeButton').click();
        cy.wait('@likeRequest');
        cy.get('@firstLikeButton').contains(1);
        cy.cleanBeerLike();
    });


});
