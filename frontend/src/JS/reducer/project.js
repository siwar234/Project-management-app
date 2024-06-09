import {
    LOAD_PROJECT,
    FAIL_PROJECT,
    CREATE_PROJECT_SUCCESS,
    GET_PROJECT_SUCCESS,
    SELECT_PROJECT,
    GET_PROJECTBYID_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    DELETE_PROJECT_SUCCESS
   
  } from '../actionTypes/project';
  import {
    STOP_LOADING
    
  } from '../actionTypes/user';
  
  const initialState = {
    loadproject: false,
    errors: [],
    isError: false,
    isSuccess: false,
    projects: [],
    loading: false,
    error: null,
    selectedProject: null,
    project:[]
    
    
  };
  
  const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case STOP_LOADING:
        return {
          ...state,
          loadproject: false,
        };
      case LOAD_PROJECT:
        return { ...state, loadproject: true };
      case FAIL_PROJECT:
        return { ...state, loadproject: false, errors: payload };
     
      case CREATE_PROJECT_SUCCESS:
        return { ...state, loadproject: false, isSuccess: true,};
      
        case UPDATE_PROJECT_SUCCESS:
          return {
            ...state,
            loadproject: false,
            projects: payload,
            errors: [], 
          };
          case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loadproject: false,
        projects: state.projects.filter(projet => projet._id !== payload),
      };

    case GET_PROJECT_SUCCESS:
      return { ...state, loadproject: false, isSuccess: true,
        projects:payload.projects};

        
        case GET_PROJECTBYID_SUCCESS:
          return { ...state, loadproject: false, isSuccess: true,
            project:payload.project};
      case SELECT_PROJECT:
        return {
          ...state,
          selectedProject:payload.selectedProject
        };
    
    default:
      return state;
  }
  };
  
  export default projectReducer;
  