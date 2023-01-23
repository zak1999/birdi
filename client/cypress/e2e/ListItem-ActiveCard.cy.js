import React from 'react';

describe('active card and list item interaction', () => {
  it('renders the active card on list item click', () => {
    cy.visit('http://localhost:3000');
    cy.findByTestId('active-card-placeholder').should('be.visible');
    let list = cy
      .findAllByRole('list-item')
      .first()
      .click()
      .then(() => {
        cy.findByTestId('active-card').should('be.visible');
      });
  });
});
