import shortid from 'shortid';
import {
  ADDCOMMENT_TO_ME,
  ADDPOST_TO_ME,
  dummyPost,
  dummyComment,
  REMOVE_COMMENT_TO_ME,
} from './post';

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
  id: 1,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_COMMENT_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          posts: state.me.posts.map((item) => {
            if (item.id === action.data.postId) {
              return {
                ...item,
                Comments: item.Comments.filter(
                  (jtem) => jtem.id !== action.data.commentId
                ),
              };
            }
            return item;
          }),
        },
      };

    case ADDPOST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          posts: [...state.me.posts, dummyPost(action.data)],
        },
      };

    case ADDCOMMENT_TO_ME:
      const posts = state.me.posts.map((item) => {
        if (item.id === action.data.postId) {
          return {
            ...item,
            Comments: [
              dummyComment(action.data),
              ...(item.Comments ? item.Comments : []),
            ],
          };
        }
        return item;
      });

      return {
        ...state,
        me: {
          ...state.me,
          posts,
        },
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        me: dummyUser,
        isLoginLoading: false,
        isLoginDone: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoginError: action.error,
        isLoginLoading: false,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutLoading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        me: null,
        isLogoutLoading: false,
        isLoginDone: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        isLogoutError: action.error,
        isLogoutLoading: false,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isSignupError: null,
        isSignupDone: false,
        isSignupLoading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignupDone: true,
        isSignupLoading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isSignupError: action.error,
        isSignupLoading: false,
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        isFollowingError: null,
        isFollowingDone: false,
        isFollowingLoading: true,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        isFollowingDone: true,
        isFollowingLoading: false,
      };
    case FOLLOW_FAIL:
      return {
        ...state,
        isFollowingError: action.error,
        isFollowingLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
