import { UserDeleteOutlined } from '@ant-design/icons';
import produce from 'immer';
import shortid from 'shortid';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_POST_REQUEST:
        draft.removePostDone = false;
        draft.removePostLoading = true;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (item) => item.id !== action.data.id
        );
        draft.removePostDone = true;
        draft.removePostLoading = false;
        break;
      case REMOVE_POST_FAIL:
        draft.removePostError = action.error;
        draft.removePostLoading = false;
        break;
      case ADDPOST_REQUEST:
        draft.addPostDone = false;
        draft.addPostError = null;
        draft.addPostLoading = true;
        break;
      case ADDPOST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostDone = true;
        draft.addPostLoading = false;
        break;
      case ADDPOST_FAIL:
        draft.addPostError = action.error;
        draft.addPostLoading = false;
        break;
      case ADDCOMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;
      case ADDCOMMENT_SUCCESS:
        const addCommentPost = draft.mainPosts.find(
          (item) => item.id === action.data.postId
        );
        addCommentPost.Comments.unshift(dummyComment(action.data));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADDCOMMENT_FAIL:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentError = null;
        draft.removeCommentDone = false;
        break;
      case REMOVE_COMMENT_SUCCESS:
        const removePost = draft.mainPosts.find(
          (item) => item.id === action.data.postId
        );
        const commentIdx = removePost.findIndex(
          (item) => item.id === action.data.commentId
        );
        removePost.splice(commentIdx, 1);
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      case REMOVE_COMMENT_FAIL:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
