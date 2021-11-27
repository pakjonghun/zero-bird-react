import { all, put, fork, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function loginApi(data) {
  axios.get("/api/login", {
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
      type: "LOGIN_SUCCESS",
    });
  } catch (error) {
    yield {
      type: "LOGIN_FAIL",
      data: error.response.data,
    };
  }
}

function* watchLoginRequest() {
  yield takeLatest("LOGIN_REQUEST", login);
}

function logoutApi() {
  return axios.get("/api/logout");
}

function* logout() {
  try {
    // const result = yield call(logoutApi);
    yield delay(1000);

    yield put({
      type: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    yield put({
      type: "LOGOUT_FAIL",
      data: error.response.data,
    });
  }
}

function* watchLogoutRequest() {
  yield takeLatest("LOGOUT_REQUEST", logout);
}

export default function* userSaga() {
  yield all([fork(watchLoginRequest), fork(watchLogoutRequest)]);
}
