describe('Upload', () => {
  it('uploads a sighting correctly and appears on profile', () => {
    cy.login()
      .then((resp) => {
        return resp.body;
      })
      .then((body) => {
        const { access_token, expires_in, id_token } = body;
        const auth0State = {
          nonce: '',
          state: 'some-random-state',
        };
        const callbackUrl = `http://localhost:3000/access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            win.document.cookie =
              'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
          },
        });
      });
    cy.get('[data-testid=login-button]').click();
    cy.origin('https://dev-tpslh342lr07lf3r.us.auth0.com', () => {
      cy.get('input[id="username"]', { withinSubject: null }).type(
        'alexryanjones@gmx.com'
      );
      cy.get('input[id="password"]', { withinSubject: null }).type(
        'mvh_nyd7hfp3QYC0akw{enter}'
      );
    });
    cy.get('[data-testid=bird-card]', { timeout: 10000 }).should('be.visible');
    cy.get('button').contains('Upload your bird sighting')
      .click();
    cy.get('[name="comName"]').type('Eurasian Kestrel');
    cy.get('[name="sciName"]').type('Falco tinnunculus');
    cy.get('#obsDt').type(
      '2017-06-01T08:30'
    );
    cy.get('[type="file"]').attachFile('falco.jpg');
    cy.get('.css-1lekzkb > .chakra-button').click();
    cy.get('[data-testid=bird-card]', { timeout: 5000 }).should('be.visible');
    cy.get('.chakra-avatar__img').click();
    cy.get('[data-testid=active-card]').contains('Eurasian Kestrel').should('be.visible');

  })
})