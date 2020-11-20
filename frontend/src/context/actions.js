import axios from 'axios';
import React from 'react'
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS
} from './types';

const baseURL = "http://127.0.0.1:5001"


// export const checkAuthenticated = () => async dispatch => {
//     if (typeof window == 'undefined') {
//         dispatch({
//             type: AUTHENTICATED_FAIL
//         });
//     }
//     if (localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         };
    
//         const body = JSON.stringify({ token: localStorage.getItem('access') });
    
//         try {
//             // const res = await axios.post(`${baseURL}/auth/`, body, config);
    
//             if (res.data.code !== 'token_not_valid') {
//                 dispatch({
//                     type: AUTHENTICATED_SUCCESS
//                 });
//             } else {
//                 dispatch({
//                     type: AUTHENTICATED_FAIL
//                 });
//             }
//         } catch (err) {
//             dispatch({
//                 type: AUTHENTICATED_FAIL
//             });
//         }
//     } else {
//         dispatch({
//             type: AUTHENTICATED_FAIL
//         });
//     }
// };

// export const load_user = () => async dispatch => {
//     if (localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `JWT ${localStorage.getItem('access')}`,
//                 'Accept': 'application/json'
//             }
//         };

//         try {
            // const res = await axios.get(`${baseURL}/auth/users/me/`, config);

//             dispatch({
//                 type: USER_LOADED_SUCCESS,
//                 payload: res.data
//             });
//         } catch (err) {
//             dispatch({
//                 type: USER_LOADED_FAIL
//             });
//         }
//     } else {
//         dispatch({
//             type: USER_LOADED_FAIL
//         });
//     }
// }

export const loginUser = async(dispatch, username, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = {
        database: "ExaminationSystem",
        collection: "users",
        username,
        password
      };
    

    try {
        const res = await axios.post(`${baseURL}/login`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        // dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const  Signup = async(dispatch, username, fname, lname, contact, email, password, uid )  => {

    dispatch({
        type: 'START_LOADING'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        database: "ExaminationSystem",
        collection: "users",
        document: {
          username: username,
          fname: fname,
          lname: lname,
          contact: contact,
          email: email,
          password: password,
          createdBy: -1,
          isActive: 1,
          level: 2,
          uid: uid,
        },
      };
    try {
        const res =  await axios.post(`${baseURL}/register`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: 'START_LOADING'
    });
    dispatch({ type: LOGOUT });
};