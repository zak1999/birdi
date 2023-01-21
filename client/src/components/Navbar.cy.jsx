import React from 'react'
import Navbar from './Navbar'
import { Provider } from 'react-redux';
import reducers from '../redux/reducers';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';
import { Auth0Provider } from "@auth0/auth0-react";


describe('<Navbar />', () => {
  it('renders', () => {
    let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__());
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <Auth0Provider domain={process.env.REACT_APP_AUTH_DOMAIN} clientId={process.env.REACT_APP_AUTH_CLIENT_ID} redirectUri={'http://localhost:8080/__/#/specs/runner?file=src/components/Navbar.cy.jsx'}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </Auth0Provider>
      </Provider>
    )
    cy.get('[data-testid=login-button]').click()
  })
})