import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import normalizeCSS from 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './app';

// eslint-disable-next-line no-unused-expressions
injectGlobal`${normalizeCSS.toString()}`;

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    background-color: #e6e7ef;
  }
`;

const rootEl = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );
};

injectTapEventPlugin();
render(App);
if (__DEV__ && module.hot) {
  module.hot.accept('./app', () => render(App));
}
