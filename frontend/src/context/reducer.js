import {
    START_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from './types';

  export const initialState = {
    Document_ID: localStorage.getItem('Document_ID'),
    isAuthenticated: false,
    user: null,
    loading: false,
    errorMessage: null
  };


  export const reducer = (initialState, action) => {
    const {type, payload} = action
    console.log(action)
    switch(type) {
        case START_LOADING:
          return {
            ...initialState,
            loading: true
          };
        case LOGIN_SUCCESS:
          // localStorage.setItem('Document_ID', payload.Document_ID);
          return {
            ...initialState,
            isAuthenticated: true,
            // Document_ID: "payload.Document_ID",
          }
        case SIGNUP_SUCCESS:
          localStorage.setItem('Document_ID', payload.Document_ID);
          return {
            ...initialState,
            isAuthenticated: true
            // Document_ID: payload.Document_ID,
          }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
          localStorage.removeItem('Document_ID');
          return {
            ...initialState,
            Document_ID: null,
            isAuthenticated: false,
            user: null,
            // errorMessage: error
          }
        default:
          return initialState
    }
  }
