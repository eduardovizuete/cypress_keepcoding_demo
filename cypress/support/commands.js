// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ user = '', fakePwd = '' } = {}) => { 
    if (!user && !fakePwd) {
        // API login
        cy.request('POST', Cypress.env('apiURL'), { email: Cypress.env('testUser'),})
            .then(({ body }) => {
                const { user } = body;
                cy.setCookie('token', user.apiKey);
                cy.visit('/home');
            });
    } else {
        cy.get('[data-cy=email-input]').type(user);
        cy.get('[data-cy=password-input]').type(fakePwd, {log: false});
    }
});