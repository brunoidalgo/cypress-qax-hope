import orphanages from '../fixtures/orphanages.json';
import { generator } from '../support/factory';

const orphanage = generator();
let orphanageDois = orphanages[1];

describe('Cadastro de Orfanatos', () => {

    it('CT 01: Deve cadastrar um novo orfanato', () => {

        cy.goToCreate(orphanage.position);
        cy.createOrphanage(orphanage);
        cy.popupHaveText(`Orfanato cadastrado com sucesso.`);
    });

    it('CT 02: Não deve cadastrar orfanato quando o nome já existe', () => {
        // Primeiro Cadastro via API
        cy.postOrphanage(orphanage);

        // Segundo Cadastro

        cy.goToCreate(orphanage.position);
        cy.createOrphanage(orphanage);

        cy.popupHaveText(`Orfanato cadastrado com sucesso.`);
    });

    context('Campos obrigatórios', () => {
        it('CT 03: Não deve cadastrar se o nome não for preenchido', () => {

            delete orphanageDois.name;
    
            cy.goToCreate(orphanage.position);
            cy.createOrphanage(orphanageDois);
    
            cy.alertHaveText('Nome','Campo obrigatório');
        });
    
        it('CT 04: Não deve cadastrar se o sobre não for preenchido', () => {
    
            delete orphanageDois.description;
    
            cy.goToCreate(orphanage.position);
            cy.createOrphanage(orphanageDois);
    
            cy.alertHaveText('Nome','Campo obrigatório');
            cy.alertHaveText('Sobre','Campo obrigatório');
        });
    
        it('CT 05: Não deve cadastrar se o horário não for preenchido', () => {
            delete orphanageDois.service_hours;
    
            cy.goToCreate(orphanage.position);
            cy.createOrphanage(orphanageDois);
            cy.alertHaveText('Horário','Campo obrigatório');
        });
    
        it('CT 06: Não deve cadastrar se não anexar a imagem', () => {
            delete orphanageDois.image;
    
            cy.goToCreate(orphanage.position);
            cy.createOrphanage(orphanageDois);
            cy.alertHaveText('Fotos','Envie pelo menos uma foto');
        });
    
        it('CT 07: Não deve cadastrar se os campos obrigatorios não forem preenchidos.', () => {
            delete orphanageDois.image;
            delete orphanageDois.name;
            delete orphanageDois.description;
            delete orphanageDois.service_hours;
    
            cy.goToCreate(orphanage.position);
            cy.createOrphanage(orphanageDois);
            cy.alertHaveText('Nome','Campo obrigatório');
            cy.alertHaveText('Sobre','Campo obrigatório');
            cy.alertHaveText('Horário','Campo obrigatório');
            cy.alertHaveText('Fotos','Envie pelo menos uma foto');
        }); 
    });
});