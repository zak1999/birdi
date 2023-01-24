describe('active card and list item interaction', () => {
  it('renders the active card on list item click', () => {
    cy.visit('http://localhost:3000');
    cy.findByTestId('active-card-placeholder').should('be.visible');
    cy.findAllByRole('list-item', {timeout: 5000})
      .first()
      .click()
      .then(() => {
        cy.findByTestId('active-card').should('be.visible');
      });
  });
});
