const initialState = {
  Comments: [
    {
      content: "2번댓글",
      User: {
        nickname: "min",
        avatar: "https://picsum.photos/200/300",
      },
    },
  ],
};

const dummyComment = {
  id: 2,
  content: "dummy번댓글",
  User: {
    nickname: "p",
    avatar: "https://picsum.photos/200/300",
  },
};

const ADDCOMMENT = "ADDCOMMENT";

export const addComment = (data) => ({
  type: ADDCOMMENT,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDCOMMENT:
      return {
        Comments: [
          ...state.Comments,
          { ...dummyComment, content: action.data },
        ],
      };

    default:
      return state;
  }
};

export default reducer;
