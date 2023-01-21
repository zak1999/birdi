import React from 'react';
import ActiveCard from './ActiveCard';

describe('<ActiveCard />', () => {
  it('renders on the page', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ActiveCard
        bird={{
          _id: '63c96b3142bbc3cac1747432',
          comName: 'Graylag Goose',
          sciName: 'anser anser',
          userID: '',
          userEmail: '',
          obsDt: '2023-01-20 10:49',
          url: '',
          lat: '',
          lng: '',
        }}
      />
    );
    cy.get('Graylag Goose');
  });

  // it('fetches from wikipedia', () => {
  //   // see: https://on.cypress.io/mounting-react
  //   cy.mount(
  //     <ActiveCard
  //       bird={{
  //         _id: '63c96b3142bbc3cac1747432',
  //         comName: 'Graylag Goose',
  //         sciName: 'anser anser',
  //         userID: '',
  //         userEmail: '',
  //         obsDt: '2023-01-20 10:49',
  //         url: '',
  //         lat: '',
  //         lng: '',
  //       }}
  //     />
  //   );
  //   cy.intercept('GET', 'https://en.wikipedia.org/*').as('getWikiBird');
  //   cy.visit(
  //     'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&generator=prefixsearch&redirects=1&converttitles=1&formatversion=2&exintro=1&explaintext=1&gpssearch=$Anser%20anser'
  //   );
  // });
});
