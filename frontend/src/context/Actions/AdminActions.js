import axios from "axios";

const baseURL = "http://127.0.0.1:5001";

export const adminLogin = async (dispatch, { username, password }) => {
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
    const res = await axios.post(`${baseURL}/login`, body, config)
    console.log(res.data)
    res.data[0].level === 3
      ? dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        })
      : dispatch({
          type: 'LOGIN_FAIL',
        });
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
}

export const createAdmin = async (
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
      level: 3,
    },
  }
  try {
    const res = await axios.post(`${baseURL}/register`, body, config);
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: 'SIGNUP_FAIL',
    });
  }
}

export const createSubAdmin = async (
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
      level: 1,
    },
  }
  try {
    const res = await axios.post(`${baseURL}/register`, body, config);
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: 'SIGNUP_FAIL',
    });
  }
}

export const getTests4Admin = async (dispatch) => {
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
    }
  };

  try {
    const res = await axios.post(`${baseURL}/getTests`, body, config);
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
}

export const readUser4Admin = async (dispatch) => {
  dispatch({
    type: "START_LOAD",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }
  const body = {
    database: 'ExaminationSystem',
    collection: 'users',
    Filter:{
    }
   }

  try {
    const res = await axios.post(`${baseURL}/readUsers`, body, config)
    dispatch({
      type: "LOAD_USER",
      users: res.data
    })
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const getSubjects4Admin = async (dispatch, categoryid) => {
  const subjects = []
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
    },
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