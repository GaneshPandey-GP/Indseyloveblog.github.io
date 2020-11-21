import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from './types';

const baseURL = "http://127.0.0.1:5001"


export const loginUser = async(dispatch, username, password) => {
    dispatch({
        type: 'START_LOADING'
    });
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
    
    // console.log(body)
    try {
        const res = await axios.post(`${baseURL}/login`, body, config)
        // console.log(res.data)
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


export const logout = (dispatch)  => {
    dispatch({
        type: 'START_LOADING'
    });
    dispatch({ type: LOGOUT });
};