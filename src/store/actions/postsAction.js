import {
  ADD_POST,
  DELETE_POST,
  GET_POST_START,
  GET_POST_SUCCESS,
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  EDIT_POST, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT
} from "./actionType";
import axios from "axios/index";

export const addPost = (post, history) => async dispatch => {
  try{
    const res = await axios.post('https://fir-89ca2.firebaseio.com/posts.json', post);
    dispatch({
      type: ADD_POST,
      posts: [res.data.name, post]
    })
  }catch (e) {
    console.log(e)
  }
  setTimeout(() => history.push('/'))
};

export const getPosts = () => async dispatch => {
  dispatch({
    type: GET_POSTS_START
  });
  const res = await axios.get('https://fir-89ca2.firebaseio.com/posts.json');
  const posts = [];

  Object.entries(res.data).forEach(item => {
    posts.push(item)
  });
  dispatch({
    type: GET_POSTS_SUCCESS,
    posts: posts
  })
};

export const getPost = id => async dispatch => {
  dispatch({
    type: GET_POST_START
  });
  const res = await axios.get(`https://fir-89ca2.firebaseio.com/posts/${id}.json`);
  dispatch({
    type: GET_POST_SUCCESS,
    post: res.data
  })
};

export const deletePost = (id, history) => async dispatch => {
  await axios.delete(`https://fir-89ca2.firebaseio.com/posts/${id}.json`);
  dispatch({
    type: DELETE_POST
  });
  history.replace('/')
};

export const editPost = (id, post) => async dispatch => {
  await axios.put(`https://fir-89ca2.firebaseio.com/posts/${id}.json`, post);
  dispatch({
    type: EDIT_POST
  })
};

export const addComment = (id, comment) => async dispatch => {
  await axios.post(`https://fir-89ca2.firebaseio.com/posts/${id}/comments.json`, comment);
  const res = await axios.get(`https://fir-89ca2.firebaseio.com/posts/${id}.json`);
  dispatch({
    type: ADD_COMMENT,
    post: res.data
  })
};

export const deleteComment = (postId, commentId) => async dispatch => {
  await axios.delete(`https://fir-89ca2.firebaseio.com/posts/${postId}/comments/${commentId}.json`);
  const res = await axios.get(`https://fir-89ca2.firebaseio.com/posts/${postId}.json`);
  dispatch({
    type: DELETE_COMMENT,
    post: res.data
  })
};

export const editComment = (postId, commentId, comment) => async dispatch => {
  await axios.patch(`https://fir-89ca2.firebaseio.com/posts/${postId}/comments/${commentId}.json`, comment);
  const res = await axios.get(`https://fir-89ca2.firebaseio.com/posts/${postId}/comments/${commentId}.json`);
  console.log(res.data, 42354)
  dispatch({
    type: EDIT_COMMENT
  })
};