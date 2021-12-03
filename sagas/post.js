import axios from 'axios';
import {
  all,
  fork,
  takeLatest,
  delay,
  put,
  throttle,
} from '@redux-saga/core/effects';
import shortid from 'shortid';
import {
  ADDPOST_FAIL,
  ADDPOST_REQUEST,
  ADDPOST_SUCCESS,
  ADDCOMMENT_REQUEST,
  ADDCOMMENT_SUCCESS,
  ADDCOMMENT_FAIL,
  ADDPOST_TO_ME,
  ADDCOMMENT_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_TO_ME,
  REMOVE_POST_FAIL,
  LOAD_POST_REQUEST,
  LOAD_POST_FAIL,
  LOAD_POST_SUCCESS,
  generatePosts,
} from '../reducers/post';

function addPostApi() {
  return axios.get('/api/addpost');
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);
    const payload = { ...action.payload, id: shortid.generate() };
    yield put({
      type: ADDPOST_SUCCESS,
      payload,
    });
    yield put({
      type: ADDPOST_TO_ME,
      payload,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADDPOST_FAIL,
      error,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADDPOST_REQUEST, addPost);
}

function* addComment(action) {
  try {
    yield delay(1000);

    const payload = { ...action.payload, id: shortid.generate() };

    yield put({
      type: ADDCOMMENT_SUCCESS,
      payload,
    });
    yield put({
      type: ADDCOMMENT_TO_ME,
      payload,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADDCOMMENT_FAIL,
      error,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADDCOMMENT_REQUEST, addComment);
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({ type: REMOVE_POST_SUCCESS, payload: action.payload });
    yield put({ type: REMOVE_POST_TO_ME, payload: action.payload });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAIL,
      error,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* loadPost() {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: { data: generatePosts(10) },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_POST_FAIL, payload: { error } });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

export default function* postSage() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
