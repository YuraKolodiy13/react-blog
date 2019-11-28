import {
  ADD_COMMENT,
  ADD_POST, DELETE_COMMENT,
  DELETE_POST, EDIT_COMMENT, EDIT_POST,
  GET_POST_START,
  GET_POST_SUCCESS,
  GET_POSTS_START,
  GET_POSTS_SUCCESS
} from "../actions/actionType";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.posts]
      };
    case GET_POSTS_START:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        loading: false
      };
    case GET_POST_START:
      return {
        ...state,
        loading: true
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
        loading: false
      };
    case DELETE_POST:
    case EDIT_POST:
      return {
        ...state,
        post: {}
      };
    case ADD_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        post: action.post
      };
    case EDIT_COMMENT:
      return {
        ...state
      };

    default:
      return state
  }
};

export default postReducer