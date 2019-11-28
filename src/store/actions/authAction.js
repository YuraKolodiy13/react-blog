import axios from 'axios'
import {CLEAR_ERROR, LOGIN_ERROR, LOGOUT_USER, SET_USER} from "./actionType";

export const auth = (email, password, isLogin) => {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBywqP6pJXkQX7O3YGCqCYRVkagdcdY2cI';

    if(isLogin){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBywqP6pJXkQX7O3YGCqCYRVkagdcdY2cI';
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const user = {
      email: data.email,
      token: data.idToken,
      id: data.localId
    };
    console.log(data.expiresIn, 654645324423)

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(user));
    // dispatch(autoLogout(data.expiresIn))
  }
};

export const authSuccess = (user) => {
  return{
    type: SET_USER,
    user
  }
};

export const autoLogin = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(logout())
      }else {
        dispatch(authSuccess(user));
        // dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return{
    type: LOGOUT_USER
  }
};

export const clearError = () => {
  return{
    type: CLEAR_ERROR
  }
};