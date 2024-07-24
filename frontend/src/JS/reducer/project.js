import {
    LOAD_PROJECT,
    FAIL_PROJECT,
    CREATE_PROJECT_SUCCESS,
    GET_PROJECT_SUCCESS,
    UPDATE_PROJECTS,
    GET_PROJECTBYID_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    DELETE_PROJECT_SUCCESS,
    ARCHIVE_PROJECT_SUCCESS
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
        return { ...state, loadproject: false, isSuccess: true,project:payload};
      
        case UPDATE_PROJECT_SUCCESS:
          return {
            ...state,
            loadproject: false,
            projects: payload,
            errors: [], 
          };


          case ARCHIVE_PROJECT_SUCCESS:
            return {
              ...state,
              loading: false,
              projects: state.projects.map((project) =>
                project._id === payload._id ? payload : project
              ),
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
            case UPDATE_PROJECTS:
              return { ...state, project: payload.projects };
    
    default:
      return state;
  }
  };
  
  export default projectReducer;
  