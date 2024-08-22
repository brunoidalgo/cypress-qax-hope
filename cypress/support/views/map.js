Cypress.Commands.add('openOrphanage',(name) => {

    const popup = '.leaflet-popup-content';

    cy.visitWtihMockGeolocation('map');

    cy.get('.leaflet-marker-icon').as('mapList');

    cy.get('@mapList').each((el, index, list) => {
        // Obtendo o index de cada elemento iniciado em 0.
        cy.get('@mapList')
        .eq(index)
        .click({force: true});
        cy.wait(1000);

        // Obetendo o nome de cada elemento da lista através do seletor que contém o texto.
        cy.get(popup).as('divName');
        cy.get('@divName')
        .invoke('text')
        .then((txt) => {
            cy.log(txt);
            // Encontrando um elemento específico em um Alias.
            if(txt === name) {
                cy.get('@mapList').eq(index).as('foundItem');
            }
        });
    });
    cy.get('@foundItem')
        .click({force: true});

        cy.contains(popup, name)
        .find('a').click({force: true});
} );


Cypress.Commands.add('googleMapLink',(position) => {
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`

        cy.contains('a', 'Ver rotas no Google Maps')
        .should('have.attr', 'href', googleUrl);
});