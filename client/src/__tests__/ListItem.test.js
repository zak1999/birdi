import ListItem from '../components/ListItem';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reducers from '../redux/reducers';
import { Provider } from 'react-redux';

test('list item renders correct information', async () => {
  let store = createStore(
    reducers,
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
