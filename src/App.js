import React from 'react';
import Navigation from './Navigation';
import {Provider, useDispatch} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducer from './Context/reducer/reducer';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
