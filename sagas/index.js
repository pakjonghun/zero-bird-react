import { fork, all } from 'redux-saga/effects';
import postSage from './post';
import userSaga from './user';

export default function* sagaRoot() {
  yield all([fork(postSage), fork(userSaga)]);
}
