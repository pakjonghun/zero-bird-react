const initialState = {
  mainPosts: [
    {
      createdAt: new Date(),
      User: {
        id: 1,
        me: {
          id: 1,
          nickname: "pak",
        },
        avatar: "https://picsum.photos/200/300",
      },
      content: "첫번째 게시글 #해시 #해시2",
      Images: [
        {
          src: "https://picsum.photos/200/300",
        },
        {
          src: "https://picsum.photos/id/237/200/300",
        },

        {
          src: "https://picsum.photos/seed/picsum/200/300",
        },
      ],
      Comments: [
        {
          content: "1번댓글",
          User: {
            nickname: "pak",
            avatar: "https://picsum.photos/200/300",
          },
        },
        {
          content: "2번댓글",
          User: {
            nickname: "min",
            avatar: "https://picsum.photos/200/300",
          },
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  createdAt: new Date(),
  id: 2,
  content: "dummy",
  User: {
    id: 1,
    me: {
      id: 1,
      nickname: "pak",
    },
    avatar: "https://picsum.photos/200/300",
    Images: [
      {
        src: "https://picsum.photos/200/300",
      },
      {
        src: "https://picsum.photos/id/237/200/300",
      },

      {
        src: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
    Comments: [
      {
        content: "1번댓글",
        User: {
          nickname: "pak",
        },
      },
      {
        content: "2번댓글",
        User: {
          nickname: "min",
        },
      },
    ],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
