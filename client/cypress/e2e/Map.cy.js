describe('Map', () => {
  it('displays the active card bird', () => {
    cy.visit('http://localhost:3000');
    cy.findByTestId('active-card-placeholder').should('be.visible');
    let activeBirdName;
    cy.findAllByRole('list-item', {timeout: 5000})
      .first()
      .click()
      .find('b')
      .then(($element) => {
        activeBirdName = $element.text()
      });
      let currentBirdOnMap;
      cy.get('.mapboxgl-popup-content', {timeout: 2000})
        .then(($element) => {
          currentBirdOnMap = $element.text().slice(0, $element.text().length - 1);
          expect(currentBirdOnMap).to.be.equal(activeBirdName)
        });
  });
});
