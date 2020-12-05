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
} from "./actions/Sub-adminActions";

import {
  Signup,
  loginUser,
  getCategories4Client,
  getTests4Client,
  getSubjects4Client,
} from "./actions/ClientActions";

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
  addQuestion2,
  updateQuestion,
  createCategory,
  updateCategory,
  getCategories,
  getCategories4Client,
  getTests4Client,
  getSubjects4Client,
};
