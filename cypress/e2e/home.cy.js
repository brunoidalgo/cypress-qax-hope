describe('Home Spec', () => {
  it('CT 00: Hope Web deve estar online', () => {
    cy.visit('http://localhost:3000/')
    // Validando que o texto inicial da página home está visível.
    cy.get('h1').contains('Semeando esperança, colhendo sorrisos')
  })
})