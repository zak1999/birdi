import React from 'react'
import Navbar from './Navbar'
import { Provider } from 'react-redux';
import reducers from '../redux/reducers';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';


describe('<Navbar />', () => {
  it('renders', () => {
    let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__());
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    )
  })
})