import axios from "axios";

const baseURL = "http://127.0.0.1:5001";

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
    console.log(res.data[0].level);
    res.data[0].level === 2
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
      type: 'SIGNUP_SUCCESS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'SIGNUP_FAIL',
    });
  }
};

export const logout = (dispatch) => {
  dispatch({
    type: "START_LOADING",
  });
  dispatch({ type: 'LOGOUT' });
};

export const getSubjects4Client = async (dispatch, categoryid) => {
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
    Filter: {
      categoryid: String(categoryid),
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

export const viewQuestions4Client = async (dispatch, testid) => {
  const questions = [];
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
    Filter: {
      testid: parseInt(testid)
    }
  };
  try {
    const res = await axios.post(`${baseURL}/viewQuestions`, body, config);
    res.data.map((question) => {
      return questions.push(question);
    });
    dispatch({
      type: "GET_QUESTIONS",
      questions: questions,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const getTests4Client = async (dispatch, subid) => {
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

export const getCategories4Client = async (dispatch, categoryid) => {
  const categories = [];
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
    collection: "category",
    Filter: {
      categoryid,
    },
  };

  try {
    const res = await axios.post(`${baseURL}/viewCategory`, body, config);
    res.data.map((category) => {
      return categories.push(category);
    });
    dispatch({
      type: "GET_CATEGORY",
      categories: categories,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}


export const createSubmission = async (dispatch, testid, result, answers) => {
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    "database": "ExaminationSystem",
    "collection": "submissions",
    testid,
    result,
    "document":{
      "userid": parseInt(localStorage.getItem("user.uid")),
      answers,
      total: parseInt(localStorage.getItem("totalMarks"))
    }
  }

  console.log(body)
  try {
    const res = await axios.post(`${baseURL}/createSubmission`, body, config);
    console.log(res.data)
    dispatch({
      type: "SUBMISSION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}
