Cypress.Commands.add('goToCreate', (position) => {
    cy.visit('orphanages/create', position.latitude, position.longitude);

    cy.get('legend').contains('Cadastro');
});

Cypress.Commands.add('createOrphanage', (orphanage) => {
    cy.setMapPosition(orphanage.position);

    cy.get('input[name=name]').as('fildName');
    cy.get('#description').as('fildDesc');
    cy.get('input[type=file]').as('fildImg');
    cy.get('#opening_hours').as('fildOpen');
    
    orphanage.name ? 
    cy.get('@fildName').type(orphanage.name) : 
    cy.log('empty fild name');
    
    orphanage.description ? 
    cy.get('@fildDesc').type(orphanage.description) : 
    cy.log('empty fild Description');

    orphanage.image ?
    cy.get('@fildImg').selectFile('cypress/fixtures/images/' + orphanage.image, { force: true }) :
    cy.log('empty fild Image');

    orphanage.service_hours ? 
    cy.get('@fildOpen').type(orphanage.service_hours) : 
    cy.log('empty fild Opening_hours');

    cy.contains('button', orphanage.open_on_weekends ? "Sim" : "Não")
    .click();

    cy.get('.save-button').click({force: true});
});