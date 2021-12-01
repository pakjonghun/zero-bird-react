import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaaMiddleware = createSagaMiddleware();
  const middlewares = [sagaaMiddleware];

  const composeEnhancers =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools({ trace: true });

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.sagaTask = sagaaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
