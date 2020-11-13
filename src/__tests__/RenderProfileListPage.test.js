import React from 'react';
import RenderProfileListPage from '../components/pages/ProfileList/RenderProfileListPage';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

test('loads a profile list', () => {
  const data = [{ id: '1234', name: 'item' }];
  const { getByText, debug } = render(
    <Provider store={store}>
      <RenderProfileListPage data={data} profiles={[]} />
    </Provider>
  );
  const element = getByText(/item/i);
  expect(element.textContent).toBe(data[0].name);
});
