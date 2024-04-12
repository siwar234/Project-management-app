import {
    LOAD_PROJECT,
    FAIL_PROJECT,
    CREATE_PROJECT_SUCCESS,
   
  } from '../actionTypes/project';
  import {
    STOP_LOADING
    
  } from '../actionTypes/user';
  
  const initialState = {
    loaduser: false,
    errors: [],
    isError: false,
    isSuccess: false,
    projects: [],
    loading: false,
    error: null,
    
  };
  
  const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case STOP_LOADING:
        return {
          ...state,
          loaduser: false,
        };
      case LOAD_PROJECT:
        return { ...state, loaduser: true };
      case FAIL_PROJECT:
        return { ...state, loaduser: false, errors: payload };
     
      case CREATE_PROJECT_SUCCESS:
        return { ...state, loaduser: false, isSuccess: true,};
      
      default:
        return state;
    }
  };
  
  export default projectReducer;
  