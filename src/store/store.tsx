import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {userReducer, riskReducer} from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootreducer = combineReducers({
  userReducer,
  riskReducer
});

const configureStore = createStore(
  rootreducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(sagas);


export default configureStore;
