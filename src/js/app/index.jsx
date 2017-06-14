import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import normalizeCSS from 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';
import { background } from 'constants/colors';
import App from './app';

// eslint-disable-next-line no-unused-expressions
injectGlobal`${normalizeCSS.toString()}`;

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&subset=cyrillic');
  body {
    font-family: Roboto, sans-serif;
    background-color: ${background};
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

render(App);
if (__DEV__ && module.hot) {
  module.hot.accept('./app', () => render(App));
}
