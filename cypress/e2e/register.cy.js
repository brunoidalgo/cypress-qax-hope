import orphanages from '../fixtures/orphanages.json';
import CreatePage from '../support/pages/create/index';
import mapPage from '../support/pages/map/index';

const orphanage = orphanages[0];

describe('Cadastro de Orfanatos', () => {
    it('CT 01: Deve cadastrar um novo orfanato', () => {
        cy.deleteMany({name: orphanage.name}, {collection:'orphanages'});

        CreatePage.go();
        cy.setMapPosition(orphanage.position);
        CreatePage.form(orphanage);
        CreatePage.submit();

        mapPage.popup.havetext('Orfanato cadastrado com sucesso.');
    });

    it.only('CT 02: Não deve cadastrar orfanato quando o nome já existe', () => {

        cy.deleteMany({name: orphanage.name}, {collection:'orphanages'});
        cy.visit('http://localhost:3000/orphanages/create');

        // Primeiro Cadastro via API
        cy.postOrphanage(orphanage);

        // Segundo Cadastro

        CreatePage.go();
        cy.setMapPosition(orphanage.position);
        CreatePage.form(orphanage);
        CreatePage.submit();

        mapPage.popup.havetext(`Já existe um cadastro com o nome: ${orphanage.name}`);
    });
});