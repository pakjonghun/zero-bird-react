import axios from "axios";
import { all, fork, takeLatest } from "@redux-saga/core/effects";

function addPostApi() {
  return axios.get("/api/addpost");
}

function* addPost() {
  try {
    // const result = yield call(addPostApi);
    yield delay(1000);

    yield put({
      type: "ADDPOST_SUCCESS",
    });
  } catch (error) {
    yield put({
      type: "ADDPOST_FAIL",
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  takeLatest("ADDPOST_REQUEST", addPost);
}

export default function* postSage() {
  yield all([fork(watchAddPost)]);
}
