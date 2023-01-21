describe('login', () => {
  it('should successfully log into the app', () => {

    cy.login()
      .then((resp) => {return resp.body})
      .then((body) => {
        const { access_token, expires_in, id_token } = body;
        const auth0State = {
          nonce: '',
          state: 'some-random-state',
        };
        const callbackUrl = `http://localhost:3000/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {onBeforeLoad(win) {win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State)}});
      });
      
      cy.get('[data-testid=login-button]').click();
      cy.origin('https://dev-tpslh342lr07lf3r.us.auth0.com', () => {
        cy.get('input[id="username"]', { withinSubject: null }).type('alexryanjones@gmx.com');
        cy.get('input[id="password"]', { withinSubject: null }).type('mvh_nyd7hfp3QYC0akw{enter}');
      })
      cy.get('img.chakra-avatar__img').should('be.visible');
      })
  });
