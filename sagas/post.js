import axios from 'axios';
import { all, fork, takeLatest, delay, put } from '@redux-saga/core/effects';
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
  REMOVE_COMMENT_FAIL,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_TO_ME,
} from '../reducers/post';

function addPostApi() {
  return axios.get('/api/addpost');
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);
    const data = { ...action.data, id: shortid.generate() };
    yield put({
      type: ADDPOST_SUCCESS,
      data,
    });
    yield put({
      type: ADDPOST_TO_ME,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADDPOST_FAIL,
      error: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADDPOST_REQUEST, addPost);
}

function* addComment(action) {
  try {
    yield delay(1000);

    const data = { ...action.data, id: shortid.generate() };

    yield put({
      type: ADDCOMMENT_SUCCESS,
      data,
    });
    yield put({
      type: ADDCOMMENT_TO_ME,
      data,
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
    yield put({ type: REMOVE_POST_SUCCESS, data: action.data });
    yield put({ type: REMOVE_POST_TO_ME, data: action.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_COMMENT_FAIL,
      error,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSage() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
