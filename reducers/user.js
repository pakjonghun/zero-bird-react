import shortid from 'shortid';
import produce from 'immer';
import {
  ADDCOMMENT_TO_ME,
  ADDPOST_TO_ME,
  dummyPost,
  dummyComment,
  REMOVE_COMMENT_TO_ME,
  REMOVE_POST_TO_ME,
} from './post';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAIL = 'CHANGE_NICKNAME_FAIL';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAIL = 'FOLLOW_FAIL';

const initialState = {
  id: null,
  me: null,
  avatar: 'https://picsum.photos/200/300',
  isLoggedIn: false,
  signUpDate: {},
  loginData: {},
  isLoginError: null,
  isLoginDone: false,
  isLoginLoading: false,
  isLogoutError: null,
  isLogoutDone: false,
  isLogoutLoading: false,
  isFollowingError: null,
  isFollowingDone: false,
  isFollowingLoading: false,
  isSignupError: null,
  isSignupDone: false,
  isSignupLoading: false,
};

export const loginAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const logoutAction = () => ({
  type: LOGOUT_REQUEST,
});

export const signUpAction = (data) => ({
  type: SIGNUP_REQUEST,
  data,
});

const dummyUser = {
  email: 1,
  nickname: 'pak',
  avatar: 'https://picsum.photos/200/300',
  posts: [
    {
      id: 1,

      Comments: [
        {
          id: 1,
          content: '1번댓글',
        },
        {
          id: 2,
          content: '2번댓글',
        },
      ],
    },
  ],
  followers: [
    { id: 1, nickname: 'follower1', avatar: 'https://picsum.photos/200/300' },
    { id: 2, nickname: 'follower2', avatar: 'https://picsum.photos/200/300' },
  ],
  followings: [
    {
      id: 1,
      nickname: 'following1',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      nickname: 'following2',
      avatar: 'https://picsum.photos/200/300',
    },
  ],
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_POST_TO_ME:
        const postIdx = draft.me.posts.findIndex(
          (item) => item.id === action.data.id
        );
        draft.me.posts.splice(postIdx, 1);
        break;
      case REMOVE_COMMENT_TO_ME:
        const removePost = draft.me.posts.find(
          (item) => item.id === action.data.postId
        );
        const commentIdx = removePost.Comments.findIndex(
          (item) => item.id === action.data.commentId
        );

        removePost.Comments.splice(commentIdx, 1);
        break;
      case ADDPOST_TO_ME:
        draft.me.posts.unshift(dummyPost(action.data));
        break;
      case ADDCOMMENT_TO_ME:
        const addPost = draft.me.posts.find(
          (item) => item.id === action.data.postId
        );
        addPost.Comments.unshift(dummyComment(action.data));
        break;
      case LOGIN_REQUEST:
        draft.isLoginError = null;
        draft.isLoginLoading = true;
        draft.isLoginDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.id = shortid.generate();
        draft.me = dummyUser;
        draft.isLoginLoading = false;
        draft.isLoginDone = true;
        break;
      case LOGIN_FAIL:
        draft.isLoginLoading = false;
        draft.isLoginError = action.error;
        break;
      case LOGOUT_REQUEST:
        draft.isLogoutDone = false;
        draft.isLogoutLoading = true;
        draft.isLogoutError = null;
        break;
      case LOGOUT_SUCCESS:
        draft.id = null;
        draft.me = null;
        draft.isLogoutLoading = false;
        draft.isLogoutDone = true;
        break;
      case LOGOUT_FAIL:
        draft.isLogoutLoading = false;
        draft.isLogoutError = action.error;
        break;
      case SIGNUP_REQUEST:
        draft.isSignupError = null;
        draft.isSignupDone = false;
        draft.isSignupLoading = true;
        break;
      case SIGNUP_SUCCESS:
        draft.isSignupDone = true;
        draft.isSignupLoading = false;
        break;
      case SIGNUP_FAIL:
        draft.isSignupError = action.error;
        draft.isSignupLoading = false;
        break;
      case FOLLOW_REQUEST:
        draft.isFollowingError = null;
        draft.isFollowingDone = false;
        draft.isFollowingLoading = true;
        break;
      case FOLLOW_SUCCESS:
        draft.isFollowingDone = true;
        draft.isFollowingLoading = false;
        break;
      case FOLLOW_FAIL:
        draft.isFollowingError = action.error;
        draft.isFollowingLoading = false;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        draft.changeNicknameLoading = true;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameingDone = true;
        draft.changeNicknameingLoading = false;
        break;
      case CHANGE_NICKNAME_FAIL:
        draft.changeNicknameError = action.error;
        draft.changeNicknameLoading = false;
        break;
      default:
        break;
    }
  });

export default reducer;
