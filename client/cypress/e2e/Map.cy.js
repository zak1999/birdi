describe('template spec', () => {
  it('follows active card coordinates', () => {
    cy.visit('http://localhost:3000');
    cy.findByTestId('active-card-placeholder').should('be.visible');
    cy.findAllByRole('list-item')
      .first()
      .click()
      .then(() => {
        cy.findByText('Observed')
          .then((element) => {
            cy.log(element);
          });

        cy.get('.mapbox-canvas').click()

        // cy.findByTestId('active-card').contains('Observed');
      });
  })
})