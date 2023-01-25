describe('Active card more info popup', () => {
  it('renders the active card popup on click', () => {
    cy.visit('http://localhost:3000');
    cy.findAllByRole('list-item', {timeout: 5000})
      .first()
      .click()

    cy.get('.css-er0b4n > svg').click();

    cy.get('.css-j8t1yu > .chakra-image', { timeout: 1000 }).should('be.visible');
  });
});
