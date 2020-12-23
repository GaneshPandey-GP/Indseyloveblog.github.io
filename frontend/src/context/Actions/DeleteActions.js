import axios from "axios";
import { getCategories, getLinks, getSections, getSubjects, getTests, viewQuestions } from "..";
const baseURL = "http://13.235.51.163:5001/";

export const deleteCategory = async (dispatch, categoryid) => {
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
        categoryid: parseInt(categoryid),
        createdBy: localStorage.getItem("user.uid"),
      },
      DataToBeUpdated: {
        isActive: 0,
      },
    };
    try {
      const res = await axios.post(`${baseURL}/updateCategory`, body, config);
      getCategories(dispatch);
      res.data.status === '1'
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

  export const deleteSubject = async (dispatch, subid, categoryid) => {
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
        Filter:{
            subid: parseInt(subid),
            categoryid: String(categoryid),
            createdBy: localStorage.getItem("user.uid")
        },
        DataToBeUpdated: {
            isActive: 0
        }
    }
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

  export const deleteLink = async (dispatch, linkid) => {
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
        linkid: parseInt(linkid),
        createdBy: localStorage.getItem("user.uid"),
      },
      DataToBeUpdated: {
        isActive: 0,
      },
    }
    console.log(body)
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

  export const deleteTest = async (
    dispatch,
    testid,
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
        createdBy: parseInt(localStorage.getItem("user.uid")),
      },
      DataToBeUpdated: {
        isActive: 0,
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

  export const deleteQuestion = async (
    dispatch,
    qid,
    testid,
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
      testid: parseInt(testid),
      oldMarks: parseInt(marks),
      collection: "questions",
      Filter: {
        qid: parseInt(qid),
        createdBy: parseInt(localStorage.getItem("user.uid"))
      },
      DataToBeUpdated: {
        isActive: 0,
        marks: 0
      },
    };
  console.log(body)
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

  export const deleteSection = async (dispatch, testid, sectionid) => {
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
        sectionid: parseInt(sectionid),
        createdBy: parseInt(localStorage.getItem("user.uid")),
      },
      DataToBeUpdated: {
        isActive: 0,
      }
    }
    console.log(body)
    try {
      const res = await axios.post(`${baseURL}/updateSection`, body, config);
      getSections(dispatch, testid);
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