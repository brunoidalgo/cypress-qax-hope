import orphanages from '../fixtures/orphanages.json';
const orphanage = orphanages[0];

describe('Testes com Mapa', () => {
    it('CT 01: Deve poder escolher um orfanato no mapa', () => {
        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'});
        cy.postOrphanage();

        cy.openOrphanage(orphanage.name);

        cy.contains('h1', orphanage.name)
        .should('be.visible');

        cy.googleMapLink(orphanage.position);
    });
});