import axios from "axios";
import { readUser4Client } from "./ClientActions";
const baseURL = "http://13.235.51.163/app/";

export const subAdminLogin = async (dispatch, { username, password }) => {
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

export const subjectCreate = async (dispatch, subname, categoryid) => {
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
      categoryid,
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
    Filter: {
      createdBy: localStorage.getItem("user.uid"),
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
  try {
    const res = await axios.post(`${baseURL}/updateSubject`, body, config);
    getSubjects(dispatch);
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
      createdBy: parseInt(localStorage.getItem("user.uid")),
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
};

export const createTest = async (dispatch, testname, subid, testtime,startTestTime, endTestTime) => {
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
      subid: String(subid),
      testtime,
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
      startTestTime, 
      endTestTime,
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
  subid,
  subname,
  createdBy,
  startTestTime,
  endTestTime
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
      subname,
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
      startTestTime,
      endTestTime
    },
  }
  console.log(body)
  try {
    await axios.post(`${baseURL}/updateTest`, body, config);
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

export const addQuestion = async (
  dispatch,
  testid,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAns,
  marks
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
      testid: parseInt(testid),
      question,
      marks : parseInt(marks),
      type: 1,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAns,
    },
  };
  try {
    await axios.post(`${baseURL}/createQuestion`, body, config);
    viewQuestions(dispatch, testid);
    dispatch({
      type: "QUESTION_CREATED",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const addQuestion2 = async (dispatch, testid, question, marks) => {
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
      testid,
      question,
      marks,
      createdBy: parseInt(localStorage.getItem("user.uid")),
      isActive: 1,
      type: 2,
    },
  };
  try {
    await axios.post(`${baseURL}/createQuestion`, body, config);
    viewQuestions(dispatch, testid);
    dispatch({
      type: "QUESTION_CREATED",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const viewQuestions = async (dispatch, testid) => {
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
      createdBy: parseInt(localStorage.getItem("user.uid"))
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

export const updateQuestion = async (
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
  oldmarks
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
    },
  };

  try {
    await axios.post(`${baseURL}/updateQuestion`, body, config);
    viewQuestions(dispatch, testid);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
};

export const updateQuestion2 = async (
  dispatch,
  qid,
  question,
  marks,
  testid
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
    Filter: {
      qid,
    },
    DataToBeUpdated: {
      question,
      marks,
    },
  };

  try {
    const res = await axios.post(`${baseURL}/updateQuestion`, body, config);
    viewQuestions(dispatch, testid);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "ACTION_FAIL",
    });
  }
}

export const createCategory = async (dispatch, categoryName) => {
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
    document: {
      categoryName,
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
    },
  };

  try {
    await axios.post(`${baseURL}/createCategory`, body, config);
    getCategories(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    console.log(err);
  }
}

export const updateCategory = async (dispatch, categoryid, categoryName) => {
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
    DataToBeUpdated: {
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
      categoryid,
      categoryName,
    },
  };
  try {
    const res = await axios.post(`${baseURL}/updateCategory`, body, config);
    getCategories(dispatch);
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
}

export const getCategories = async (dispatch, categoryid) => {
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
      createdBy: localStorage.getItem("user.uid"),
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

export const viewResults = async (dispatch) => {
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
      testid: localStorage.getItem("testid"),
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

export const viewSubmission = async (dispatch, testid, submitID) => {
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
      testid,
      submissionID : parseInt(submitID)
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

export const createLink = async (dispatch, link, linktitle) => {
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
    document: {
      link,
      linktitle,
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
    }
  };

  try {
    await axios.post(`${baseURL}/createLink`, body, config);
    getLinks(dispatch);
    dispatch({
      type: "ACTION_SUCCESS",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateLink = async (dispatch, linkid, link, linktitle) => {
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
      linkid,
    },
    DataToBeUpdated: {
      createdBy: localStorage.getItem("user.uid"),
      isActive: 1,
      link,
      linktitle,
    },
  };
  try {
    const res = await axios.post(`${baseURL}/updateLink`, body, config);
    getLinks(dispatch);
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

export const getLinks = async (dispatch) => {
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
      createdBy: localStorage.getItem("user.uid"),
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

export const updateUserName = async (dispatch, fname, lname) => {
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
      uid: parseInt(localStorage.getItem("user.uid"))
    },
   DataToBeUpdated: {
      fname,
      lname,
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