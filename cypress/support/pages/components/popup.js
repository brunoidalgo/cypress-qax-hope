class PopUp {
    havetext(text) {
        cy.get('.swal2-html-container')
        .contains(text);
    }
}

export default new PopUp();