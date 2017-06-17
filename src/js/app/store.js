/* eslint-disable no-underscore-dangle,import/prefer-default-export,global-require */
import { createStore } from 'redux';
import rootReducer from './reducers';

export function configureStore() {
  const store = createStore(
    rootReducer,
    __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers);
    });
  }

  return store;
}
