// Apagando o banco de dados antes de rodar os testes.


describe('Setup', () => {
    
    before(() => {
        cy.dropCollection('orphanages')
    })

    it('Drop sucessfully', () => {
        cy.log('Drop sucessfully')
    });

});