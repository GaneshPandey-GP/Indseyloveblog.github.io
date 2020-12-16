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
    })
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
      subid: String(subid)
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
    type: "START_LOAD",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: "ExaminationSystem",
    collection: "submissions",
    document:{
      testid,
      result,
      answers,
      userid: parseInt(localStorage.getItem("user.uid")),
      total: parseInt(localStorage.getItem("totalMarks")),
      testname: localStorage.getItem("testname"),
      fname: localStorage.getItem("fname"),
      lname: localStorage.getItem("lname"),
      email: localStorage.getItem("email"),
      contact: localStorage.getItem("contact"),
    }
  }

  try {
    await axios.post(`${baseURL}/createSubmission`, body, config);
    dispatch({
      type: "SUBMISSION_SUCCESS",
    })
    updateUser(dispatch)
  } catch (err) {
    dispatch({
      type: "SUBMISSION_FAIL",
    });
  }
}

export const viewResults4Client = async (dispatch) => {
  const results = []
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
    collection: "submissions",
    Filter:{
      userid: parseInt(localStorage.getItem("user.uid")),
    }
  }

  try {
    const res = await axios.post(`${baseURL}/viewResults`, body, config);
    res.data.map((result) => {
      return results.push(result);
    })
    dispatch({
      type: "GET_RESULTS",
      results: results,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const viewSubmission4Client = async (dispatch, testid) => {
  const submission = []
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
    collection: "submissions",
    Filter:{
      userid: parseInt(localStorage.getItem("user.uid")),
      testid,
    }
  }
  console.log(body)
  try {
    const res = await axios.post(`${baseURL}/viewSubmission`, body, config);
    res.data.map((ques) => {
      return submission.push(ques);
    })
    localStorage.removeItem("testname")
    dispatch({
      type: "GET_SUBMISSION",
      submission: submission,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const updateUser = async (dispatch) => {
  try{
    var tests = JSON.parse(localStorage.getItem('testsGiven'))
  }catch(err){
    console.log(err)
  }
  dispatch({
    type: "START_LOAD",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    database: 'ExaminationSystem',
    collection: 'users',
    Filter:{
      uid: parseInt(localStorage.getItem("user.uid"))
    },
   DataToBeUpdated: {
      testsGiven: tests
  }}
  try {
    const res = await axios.post(`${baseURL}/updateUser`, body, config)
    readUser4Client(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const readUser4Client = async (dispatch) => {
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
      uid: parseInt(localStorage.getItem("user.uid"))
    }
   }

  try {
    const res = await axios.post(`${baseURL}/readUsers`, body, config)
    dispatch({
      type: "LOAD_USER",
      user: res.data
    })
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const getLinks4Client = async (dispatch) => {
  const links = [];
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
    collection: "links",
    Filter: {
    },
  };

  try {
    const res = await axios.post(`${baseURL}/getLinks`, body, config);
    res.data.map((link) => {
      return links.push(link);
    });
    dispatch({
      type: "GET_LINKS",
      links: links,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};