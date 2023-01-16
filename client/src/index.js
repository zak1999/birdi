import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

import { createStore } from 'redux';
import reducers from './redux/reducers';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      whiteish: {
        def:"#fff7f1",
        hover:"#DED0C5"
      },
      darkish: "#202f2a",
      greenish:"#4b732f",
      blueish: '#f1f9ff',
    },
  },
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
        redirectUri={window.location.origin}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <App /> 
          </ChakraProvider>
        </Provider>
  </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
