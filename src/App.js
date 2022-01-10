import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import FlashMessage from 'react-native-flash-message';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';

import reducer from './Context/reducer/reducer';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
      <FlashMessage position="top" />
    </Provider>
  );
}
