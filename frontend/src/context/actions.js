import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

const baseURL = "http://127.0.0.1:5001";

export const adminlogin = async (dispatch, { username, password }) => {
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

    res.data[0].level === 1
      ? dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: LOGIN_FAIL,
        });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loginUser = async (dispatch, { username, password }) => {
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
    console.log(res.data);
    res.data === [{}]
      ? res.data[0].level === 2 || res.data[1].level === 2
        ? dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: LOGIN_FAIL,
          })
      : dispatch({
          type: LOGIN_FAIL,
        });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const Signup = async (
  dispatch,
  { username, fname, lname, contact, email, password }
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
      subname,
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
    },
  };

  try {
    await axios.post(`${baseURL}/createSubject`, body, config);
    getSubjects(dispatch);
  } catch (err) {
    console.log(err);
  }
};

export const getSubjects = async (dispatch) => {
  dispatch({
    type: "START_LOADING",
  });
  const subjects = [];
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: "ExaminationSystem",
    collection: "subjects",
    Filter: {},
  };
  try {
    const res = await axios.post(`${baseURL}/getSubjects`, body, config);
    res.data.map((subject) => subjects.push(subject));
    dispatch({
      type: "GET_SUBJECTS",
      subjects: subjects,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const updateSubject = async (dispatch, subid, subname) => {
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
    Filter: {
      subid,
    },
    DataToBeUpdated: {
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
      subid,
      subname,
    },
  };
  console.log(body);
  try {
    const res = await axios.post(`${baseURL}/updateSubject`, body, config);
    getTests(dispatch);
    res.data.status === "1"
      ? dispatch({
          type: "ACTION_SUCCESS",
        })
      : dispatch({
          type: "ACTION_FAIL",
        });
    getSubjects(dispatch);
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const getTests = async (dispatch, subid) => {
  const tests = [];
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
    collection: "tests",
    Filter: {
      subid,
    },
  };

  try {
    const res = await axios.post(`${baseURL}/getTests`, body, config);
    console.log(res.data);
    res.data.map((test) => {
      return tests.push(test);
    });
    dispatch({
      type: "GET_TESTS",
      tests: tests,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const createTest = async (dispatch, testname, subjectid, testtime) => {
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
    collection: "tests",
    document: {
      testname,
      subjectid,
      testtime,
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
    },
  };

  try {
    await axios.post(`${baseURL}/createTest`, body, config);
    getTests(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const updateTest = async (
  dispatch,
  testname,
  testid,
  testtime,
  subid
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
    collection: "tests",
    Filter: {
      testid: parseInt(testid),
    },
    DataToBeUpdated: {
      testid: parseInt(testid),
      testname,
      testtime: parseInt(testtime),
      subid: parseInt(subid),
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
    },
  };
  console.log(body);
  try {
    const res = await axios.post(`${baseURL}/updateTest`, body, config);
    getTests(dispatch, subid);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const Addquestion = async (
  dispatch,
  testid,
  question,
  option1,
  option2,
  option3,
  option4,
  correctans
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
    collection: "questions",
    document: {
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
      testid,
      question,
      option1,
      option2,
      option3,
      option4,
      correctans,
    },
  };
  try {
    await axios.post(`${baseURL}/createQuestion`, body, config);
    dispatch({
      type: "QUESTION_CREATED",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};
