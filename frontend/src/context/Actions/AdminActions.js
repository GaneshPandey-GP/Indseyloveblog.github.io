import axios from "axios";

const baseURL = "http://13.235.51.163:5001/";


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

export const getTests4Admin = async (dispatch, subid) => {
  const tests = [];
  if(subid!==undefined){
    subid = String(subid)
  }
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
      subid
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

export const updateAdminSiteUser = async (dispatch, fname, lname,  contact, email, iuid ) => {
  dispatch({
    type: "START_LOADING",
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
      uid: iuid
    },
   DataToBeUpdated: {
      fname,
      lname,
      contact,
      email
  }}
  try {
    await axios.post(`${baseURL}/updateUser`, body, config)
    readUser4Admin(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const viewQuestions4Admin = async (dispatch, testid) => {
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
      testid: parseInt(testid),
    },
  }
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

export const updateQuestion4Admin = async (
  dispatch,
  qid,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAns,
  marks,
  testid,
  oldmarks,
  section,
  sectionId
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
    oldMarks: oldmarks,
    testid: parseInt(testid),
    collection: "questions",
    Filter: {
      qid,
    },
    DataToBeUpdated: {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAns,
      marks,
      section,
      sectionId
    },
  };

  console.log(body)
  try {
    await axios.post(`${baseURL}/updateQuestion`, body, config);
    viewQuestions4Admin(dispatch, testid);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const updateTest4Admin = async (
  dispatch,
  testname,
  testid,
  testtime,
  subid,
  subname,
  createdBy
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
      subid: String(subid),
      subname,
      createdBy,
      isActive: 1,
    },
  }
  console.log(body)
  try {
    await axios.post(`${baseURL}/updateTest`, body, config);
    getTests4Admin(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const updateSection4Admin = async (dispatch, testid, sectionid, section, createdBy) => {
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
    collection: "sections",
    Filter: {
      testid: parseInt(testid),
      sectionid: parseInt(sectionid)
    },
    DataToBeUpdated: {
      testid: parseInt(testid),
      sectionid: parseInt(sectionid),
      section,
      createdBy: parseInt(createdBy),
      isActive: 1,
    }
  }
  try {
    const res = await axios.post(`${baseURL}/updateSection`, body, config);
    getSections4Admin(dispatch, testid);
    res.data.status === 1
      ? dispatch({
          type: "ACTION_SUCCESS",
        })
      : dispatch({
          type: "ACTION_FAIL",
        });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const getSections4Admin = async (dispatch, testid, createdBy) => {
  const sections = [];
  dispatch({
    type: "START_LOADING",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  const body = {
    database: "ExaminationSystem",
    collection: "sections",
    Filter: {
      createdBy: parseInt(createdBy),
      testid: parseInt(testid)
    },
  }
  console.log(body)
  try {
    const res = await axios.post(`${baseURL}/getSections`, body, config);
    res.data.map((section) => {
      return sections.push(section);
    });
    dispatch({
      type: "GET_SECTIONS",
      sections: sections,
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};