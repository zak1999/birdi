import React from 'react';
import ActiveCard from './ActiveCard';

describe('<ActiveCard />', () => {
  const sciName = 'Anser anser';
  const comName = 'Graylag Goose';
  const obsDt = '2023-01-20 10:49';
  it('renders on the page', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ActiveCard
        bird={{
          _id: '63c96b3142bbc3cac1747432',
          comName: 'Graylag Goose',
          sciName: 'Anser anser',
          userID: '',
          userEmail: '',
          obsDt: '2023-01-20 10:49',
          url: '',
          lat: '',
          lng: '',
        }}
      />
    );
  });

  it('displays the correct scientific name', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ActiveCard
        bird={{
          _id: '63c96b3142bbc3cac1747432',
          comName: 'Graylag Goose',
          sciName: 'Anser anser',
          userID: '',
          userEmail: '',
          obsDt: '2023-01-20 10:49',
          url: '',
          lat: '',
          lng: '',
        }}
      />
    );

    cy.get('[data-testid=active-sci-name]').then(($span) => {
      // $span is the object that the previous command yielded

      const renderedSciName = $span.text();

      cy.log(renderedSciName);
      expect(renderedSciName).to.equal(sciName);
    });
  });

  it('displays the correct common name', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ActiveCard
        bird={{
          _id: '63c96b3142bbc3cac1747432',
          comName: 'Graylag Goose',
          sciName: 'Anser anser',
          userID: '',
          userEmail: '',
          obsDt: '2023-01-20 10:49',
          url: '',
          lat: '',
          lng: '',
        }}
      />
    );

    cy.get('[data-testid=active-com-name]').then(($span) => {
      // $span is the object that the previous command yielded

      const renderedComName = $span.text();

      cy.log(renderedComName);
      expect(renderedComName).to.have.string(comName);
    });
  });

  it('displays the correct observed at time', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ActiveCard
        bird={{
          _id: '63c96b3142bbc3cac1747432',
          comName: 'Graylag Goose',
          sciName: 'Anser anser',
          userID: '',
          userEmail: '',
          obsDt: '2023-01-20 10:49',
          url: '',
          lat: '',
          lng: '',
        }}
      />
    );

    cy.get('[data-testid=active-seen-at]').then(($span) => {
      // $span is the object that the previous command yielded

      const renderedSeenAt = $span.text();

      cy.log(renderedSeenAt);
      expect(renderedSeenAt).to.have.string(obsDt);
    });
  });
});
