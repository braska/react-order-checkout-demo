/* eslint-disable no-underscore-dangle,import/prefer-default-export,global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const createStoreWithMiddleware = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())
    : compose(applyMiddleware(sagaMiddleware));

  const store = createStoreWithMiddleware(createStore)(rootReducer);
  let sagaTask = sagaMiddleware.run(rootSaga);

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers);
    });

    module.hot.accept('./sagas', () => {
      const newRootSaga = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(newRootSaga);
      });
    });
  }

  return store;
}
