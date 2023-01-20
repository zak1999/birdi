import List from '../components/List';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reducers from '../redux/reducers';
import { Provider } from 'react-redux';
import { eBirdApiMocks } from './eBirdApiMocks.json';

test('list component renders every list-item', async () => {
  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const mocksWithIds = [];

  for (let i = 0; i < eBirdApiMocks.length; i++) {
    if (
      mocksWithIds.find(
        (x) => x.lat == eBirdApiMocks[i].lat && x.lng == eBirdApiMocks[i].lng
      )
    ) {
    } else {
      mocksWithIds.push(eBirdApiMocks[i]);
    }
  }

  mocksWithIds.forEach((bird, i) => {
    bird.id = i;
  });

  render(
    <Provider store={store}>
      <List data={[mocksWithIds, []]} />
    </Provider>
  );
  expect(screen.queryAllByText(/Observed/).length).toEqual(mocksWithIds.length);
});
