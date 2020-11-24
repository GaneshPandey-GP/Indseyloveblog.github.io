import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

const baseURL = "http://127.0.0.1:5001";

export const loginUser = async (dispatch, username, password) => {
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: "ExaminationSystem",
    collection: "users",
    username,
    password,
  };
  try {
    const res = await axios.post(`${baseURL}/login`, body, config);
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const Signup = async (
  dispatch,
  username,
  fname,
  lname,
  contact,
  email,
  password,
  uid
) => {
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
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
    const res = await axios.post(`${baseURL}/register`, body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const logout = (dispatch) => {
  dispatch({
    type: "START_LOADING",
  });
  dispatch({ type: LOGOUT });
};

export const subjectCreate = async (dispatch, subname) => {
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: "ExaminationSystem",
    collection: "subjects",
    document: {
      subid: 2,
      subname,
      createdBy: 1,
      isActive: 1,
    },
  };

  try {
    await axios.post(`${baseURL}/createSubject`, body, config);
    getSubjects(dispatch)
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: LOGIN_FAIL,
    // });
  }
};

export const getSubjects = async (dispatch) => {
  const subjects = [{name: '', id: ''}]
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: "ExaminationSystem",
    collection: "subjects",
  };
  try {
    const res = await axios.post(`${baseURL}/getSubjects`, body, config);
    res.data.map(({subname, subid}) => 
      subjects.push({name: subname, id: subid})
    )
    dispatch({
      type: 'GET_SUBJECTS',
      subjects: subjects
    })
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: LOGIN_FAIL,
    // });
  }
};

export const createTest = async (dispatch, testname, subname) => {
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = 
  {
      database: "ExaminationSystem",
      collection: "tests",
      document : {
          testid: 2,
          testname,
          subjecid: 2,
          createdBy: 2,
          isActive:1
      }
      
  }

  try {
    await axios.post(`${baseURL}/createTest`, body, config);
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: LOGIN_FAIL,
    // });
  }
};
