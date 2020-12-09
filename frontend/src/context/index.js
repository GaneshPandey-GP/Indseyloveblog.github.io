import {
  subjectCreate,
  adminlogin,
  getSubjects,
  updateSubject,
  createTest,
  getTests,
  updateTest,
  addQuestion,
  viewQuestions,
  addQuestion2,
  updateQuestion,
  updateQuestion2,
  createCategory,
  updateCategory,
  getCategories,
  viewSubmissions
} from "./Actions/Sub-adminActions";

import {
  Signup,
  loginUser,
  getCategories4Client,
  viewQuestions4Client,
  getTests4Client,
  getSubjects4Client,
  createSubmission,
  viewResults,
  viewSubmission,
  readUser
} from "./Actions/ClientActions";

import { AuthProvider, useAuthState } from "./context";

export {
  AuthProvider,
  useAuthState,
  Signup,
  loginUser,
  subjectCreate,
  getSubjects,
  updateSubject,
  adminlogin,
  createTest,
  getTests,
  updateTest,
  addQuestion,
  updateQuestion2,
  viewQuestions,
  viewQuestions4Client,
  addQuestion2,
  updateQuestion,
  createCategory,
  updateCategory,
  getCategories,
  getCategories4Client,
  getTests4Client,
  getSubjects4Client,
  createSubmission,
  viewResults,
  viewSubmission,
  readUser,
  viewSubmissions,
};
