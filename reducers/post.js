import { UserDeleteOutlined } from '@ant-design/icons';
import shortid from 'shortid';

export const ADDPOST_SUCCESS = 'ADDPOST_SUCCESS';
export const ADDPOST_FAIL = 'ADDPOST_FAIL';
export const ADDPOST_REQUEST = 'ADDPOST_REQUEST';
export const ADDPOST_TO_ME = 'ADDPOST_TO_ME';
export const ADDCOMMENT_REQUEST = 'ADDCOMMENT_REQUEST';
export const ADDCOMMENT_SUCCESS = 'ADDCOMMENT_SUCCESS';
export const ADDCOMMENT_FAIL = 'ADDCOMMENT_FAIL';
export const ADDCOMMENT_TO_ME = 'ADDCOMMENT_TO_ME';
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAIL = 'REMOVE_COMMENT_FAIL';
export const REMOVE_COMMENT_TO_ME = 'REMOVE_COMMENT_TO_ME';

const initialState = {
  mainPosts: [
    {
      id: 1,
      createdAt: new Date(),
      User: {
        id: shortid.generate(),
        me: {
          email: shortid.generate(),
          nickname: 'pak',
          avatar: 'https://picsum.photos/200/300',
        },
      },
      content: '첫번째 게시글 #해시 #해시2',
      Images: [
        {
          id: shortid.generate(),
          src: 'https://picsum.photos/200/300',
        },
        {
          id: shortid.generate(),
          src: 'https://picsum.photos/id/237/200/300',
        },
        {
          id: shortid.generate(),
          src: 'https://picsum.photos/id/237/200/300',
        },
        {
          id: shortid.generate(),
          src: 'https://picsum.photos/id/237/200/300',
        },
      ],
      Comments: [
        {
          content: '1번댓글',
          User: {
            nickname: 'pak',
            avatar: 'https://picsum.photos/200/300',
          },
        },
        {
          content: '2번댓글',
          User: {
            nickname: 'min',
            avatar: 'https://picsum.photos/200/300',
          },
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

export const addPost = (data) => ({
  type: ADDPOST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADDCOMMENT_REQUEST,
  data,
});

export const dummyPost = (data) => ({
  createdAt: new Date(),
  Images: [
    {
      id: shortid.generate(),
      src: 'https://picsum.photos/200/300',
    },
    {
      id: shortid.generate(),
      src: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: shortid.generate(),
      src: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: shortid.generate(),
      src: 'https://picsum.photos/id/237/200/300',
    },
  ],
  Comments: [
    {
      content: '1번댓글',
      User: {
        nickname: 'pak',
        avatar: 'https://picsum.photos/200/300',
      },
    },
    {
      content: '2번댓글',
      User: {
        nickname: 'min',
        avatar: 'https://picsum.photos/200/300',
      },
    },
  ],

  User: data.user,
  id: data.id,
  content: data.content,
});

export const dummyComment = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: data.userId,
    nickname: 'pak',
    avatar: 'https://picsum.photos/200/300',
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPOST_REQUEST:
      return {
        ...state,
        addPostDone: false,
        addPostError: null,
        addPostLoading: true,
      };
    case ADDPOST_SUCCESS:
      return {
        ...state,
        mainPosts: [...state.mainPosts, { ...dummyPost(action.data) }],
        addPostDone: true,
        addPostLoading: false,
      };
    case ADDPOST_FAIL:
      return {
        ...state,
        addPostError: action.error,
        addPostLoading: false,
      };
    case ADDCOMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null,
        addCommentDone: false,
      };

    case ADDCOMMENT_SUCCESS:
      const newState = state.mainPosts.map((item) => {
        if (item.id === action.data.postId) {
          return {
            ...item,
            Comments: [dummyComment(action.data), ...item.Comments],
          };
        }

        return item;
      });

      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        mainPosts: newState,
      };
    case ADDCOMMENT_FAIL:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentError: null,
        removeCommentDone: false,
      };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.mainPosts.map((item) => {
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
        removeCommentLoading: false,
        removeCommentDone: true,
      };
    case REMOVE_COMMENT_FAIL:
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
