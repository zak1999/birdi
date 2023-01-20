const ActiveCard = require('../components/ActiveCard').default;
const ListItem = require('../components/ListItem').default;
const { createStore } = require('redux');
const { render, screen } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event');
require('@testing-library/jest-dom');
const reducers = require('../redux/reducers');
const { Provider } = require('react-redux');

test('list item renders correct information', async () => {
  let store = createStore(
    reducers.default,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  render(
    <Provider store={store}>
      <ListItem
        data-testid='list-item'
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
    </Provider>
  );
  expect(screen.getByText('Graylag Goose')).toBeInTheDocument();
  expect(screen.getByText('anser anser')).toBeInTheDocument();
  expect(screen.getByText('Observed at 2023-01-20 10:49')).toBeInTheDocument();
});
