import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import callAPIMiddleware from './callAPIMiddleware';
import {CookiesProvider} from 'react-cookie';
import './index.css';

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate.includes(key))
    .reduce((res, key) => (res[key] = obj[key], res), {});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
  thunkMiddleware, callAPIMiddleware
)))

render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
