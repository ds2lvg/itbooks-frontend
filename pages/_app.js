import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer, { rootSaga } from '../modules';

const ITBooksApp = ({ Component, store }) => { // Component: next.js에서 넣어주는 props
  return (
    <Provider store={store}>
      <Head>
        <link rel="stylesheet" href="/css/common.css" />
      </Head>
      <Component />
    </Provider>
  );
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // 실사용 배포일때만 리덕스 개발자도구 추가
  const enhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(...middlewares)
  : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default withRedux(configureStore)(ITBooksApp);
