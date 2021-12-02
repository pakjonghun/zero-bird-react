import { all, put, fork, takeLatest, delay } from '@redux-saga/core/effects';
import ActionButton from 'antd/lib/modal/ActionButton';
import axios from 'axios';
import shortid from 'shortid';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
} from '../reducers/user';

function loginApi(data) {
  axios.get('/api/login', {
    params: {
      data,
    },
  });
}

function* login(action) {
  try {
    // const result = yield call(loginApi, action.data);
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield {
      type: LOGIN_FAIL,
      error: error.response.data,
    };
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function logoutApi() {
  return axios.get('/api/logout');
}

function* logout() {
  try {
    // const result = yield call(logoutApi);
    yield delay(1000);

    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOGOUT_FAIL,
      // data: error.response.data,
    });
  }
}

function* watchLogoutRequest() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* signup(action) {
  try {
    yield delay(1000);

    yield yield put({
      type: SIGNUP_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGNUP_FAIL,
      error: error.response.data,
    });
  }
}

function* watchSignUpRequest() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* follow(action) {
  try {
    delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FOLLOW_FAIL,
      error: error.response.data,
    });
  }
}

function* watchFollowRequest() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

export default function* userSaga() {
  yield all([
    fork(watchLoginRequest),
    fork(watchLogoutRequest),
    fork(watchSignUpRequest),
    fork(watchFollowRequest),
  ]);
}
