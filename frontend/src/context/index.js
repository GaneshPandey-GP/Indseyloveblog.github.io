import {
  subjectCreate,
  subAdminLogin,
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
  viewSubmissions,
  createLink,
  getLinks,
  updateLink,
  updateUserName
} from "./Actions/Sub-adminActions";

import {adminLogin} from "./Actions/AdminActions" 

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
  readUser,
  getLinks4Client
} from "./Actions/ClientActions";

import { AuthProvider, useAuthState } from "./context";

export {
  AuthProvider,
  useAuthState,
  Signup,
  subAdminLogin,
  loginUser,
  subjectCreate,
  getSubjects,
  updateSubject,
  adminLogin,
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
  createLink,
  getLinks,
  updateLink,
  getLinks4Client,
  updateUserName
};
