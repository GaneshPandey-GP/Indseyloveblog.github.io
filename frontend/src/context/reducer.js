import {
    START_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from './types';

  export const initialState = {
    isAuthenticated: false,
    user: [{}],
    loading: false,
    subjects: [],
    errorMessage: null,
  };


  export const reducer = (initialState, action) => {
    switch(action.type) {
        case START_LOADING:
          return {
            ...initialState,
            loading: true
          };
        case LOGIN_SUCCESS:
          localStorage.setItem('user.level', action.payload[0].level);
          localStorage.setItem('user.uid', action.payload[0].uid);
          return {
            ...initialState,
            isAuthenticated: true,
            loading: false,
            user: action.payload
          }
        case SIGNUP_SUCCESS:
          // localStorage.setItem('Document_ID', action.payload.Document_ID);
          return {
            ...initialState,
            isAuthenticated: true,
            loading: false

            // Document_ID: payload.Document_ID,
          }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
          localStorage.removeItem('Document_ID');
          return {
            ...initialState,
            Document_ID: null,
            isAuthenticated: false,
            user: null,
            loading: false,
            errorMessage: "Your creds didn't match! Try Again.."
          }
        case LOGOUT:
          localStorage.removeItem('Document_ID');
          return {
            ...initialState,
            Document_ID: null,
            isAuthenticated: false,
            user: null,
            loading: false,
          }
        case 'GET_SUBJECTS':
          return {
            ...initialState,
            subjects: action.subjects,
            loading: false
          };

        case 'UPDATE_SUBJECT': 
        return {
          ...initialState,
          loading: false
        };
        case 'ACTION_FAILED': 
        return {
          ...initialState,
          loading: false
        };
        default:
          return initialState
    }
  }
