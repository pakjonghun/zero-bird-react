import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import comment from "./comment";
import { combineReducers } from "redux";

export const changeNickname = (data) => {
  return { type: "CHANGE_NICKNAME", data };
};

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
  comment,
});

export default rootReducer;
