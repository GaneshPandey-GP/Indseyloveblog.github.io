export const initialState = {
  isAuthenticated: false,
  user: [{}],
  loading: false,
  load: false,
  subjects: [],
  categories:[],
  tests: [],
  questions: [],
  results: [],
  submission: [],
  links: [],
  errorMessage: null,
};


export const reducer = (initialState, action) => {
  switch(action.type) {
      case 'START_LOADING':
        return {
          ...initialState,
          loading: true
        }
      case 'LOAD_USER':
        return{
          ...initialState,
          load: false,
          loading: false,
          user: action.user
        }
      case 'LOGIN_SUCCESS':
        localStorage.setItem('user.level', action.payload[0].level);
        localStorage.setItem('user.uid', action.payload[0].uid);
        return {
          ...initialState,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        }
      case 'SIGNUP_SUCCESS':
        return {
          ...initialState,
          isAuthenticated: true,
          loading: false
        }
      case 'SIGNUP_FAIL':
      case 'LOGIN_FAIL':
        return {
          ...initialState,
          Document_ID: null,
          isAuthenticated: false,
          user: null,
          loading: false,
          errorMessage: "Your creds didn't match! Try Again.."
        }
      case 'LOGOUT':
        // localStorage.removeItem('user.level', action.payload[0].level);
        // localStorage.removeItem('user.uid', action.payload[0].uid);
        return {
          ...initialState,
          Document_ID: null,
          isAuthenticated: false,
          user: null,
          loading: false,
        }
      case 'GET_SUBJECTS':
        return {
          ...initialState,
          subjects: action.subjects,
          loading: false
        }
      case 'GET_TESTS':
        return {
          ...initialState,
          tests: action.tests,
          loading: false
        }
      case 'GET_QUESTIONS':
        return {
          ...initialState,
          questions: action.questions,
          loading: false
        }
      case 'GET_LINKS':
        return {
          ...initialState,
          links: action.links,
          loading: false
        }
      case 'ACTION_SUCCESS':
        return {
          ...initialState,
          load: false
        }
      case 'ACTION_FAIL':
        return {
          ...initialState,
          loading: false
        }
      case 'UPDATE_SUBJECT': 
      return {
        ...initialState,
        loading: false
      };
      case 'ACTION_FAILED': 
      return {
        ...initialState,
        loading: false
      };
      case 'QUESTION_CREATED': 
      return {
        ...initialState,
        loading: false
      };
      case 'GET_CATEGORY': 
      return {
        ...initialState,
        categories: action.categories,
        loading: false
      };
      case 'START_LOAD': 
      return {
        ...initialState,
        load: true,
      }   
      case 'SUBMISSION_SUCCESS': 
      return {
        ...initialState,
        load: false,
      }
      case 'SUBMISSION_FAIL': 
      return {
        ...initialState,
        load: false,
        loading: false
      }
      case 'GET_RESULTS': 
      return {
        ...initialState,
        loading: false,
        results: action.results
      };
      case 'GET_SUBMISSION': 
      return {
        ...initialState,
        submission: action.submission,
        loading: false,
      }
      default:
        return initialState
  }
}