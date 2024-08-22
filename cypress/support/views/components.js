Cypress.Commands.add('popupHaveText', (text) => {
        cy.get('.swal2-html-container')
        .contains(text);
});

Cypress.Commands.add('alertHaveText',(label, txt) => {
        cy.contains('label', label)
        .parent()
        .find('small')
        .should('have.text', txt);
});