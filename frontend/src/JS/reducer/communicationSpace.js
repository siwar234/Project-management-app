import {
    CREATE_COMMUNICATION_SPACE,
    CREATE_COMMUNICATION_SPACE_SUCCESS,
    CREATE_COMMUNICATION_SPACE_FAIL,
    GET_COMMUNICATION_SPACES_BY_PROJECT_ID,
    GET_POSTS_BY_TASKID_SUCCESS,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    GET_POSTS_BY_TASKID_FAIL,
    CREATE_COMMENT,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL
  } from '../actionTypes/communicationSpace';
  
  const initialState = {
    loading: false,
    communicationSpaces: [],
        error: null,
    posts: {},
  };
  
  const communicationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case CREATE_COMMUNICATION_SPACE:
        return {
          ...state,
          loading: true,
        };
      case CREATE_COMMUNICATION_SPACE_SUCCESS:
        return {
          ...state,
          loading: false,
          communicationSpaces: payload,
        };
      case CREATE_COMMUNICATION_SPACE_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      case GET_COMMUNICATION_SPACES_BY_PROJECT_ID:
        return {
          ...state,
          communicationSpaces: payload,
          loading: false,
        };
     
      case CREATE_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          // posts: [payload, ...state.posts], 

        };
      case CREATE_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };

        case GET_POSTS_BY_TASKID_SUCCESS:
            return {
              ...state,
              loading: false,
              posts: payload,
            };
          case GET_POSTS_BY_TASKID_FAIL:
            return {
              ...state,
              loading: false,
              error: payload,
            };
           case CREATE_COMMENT:
    
      return {
        ...state,
      
        loading: false,
        error: null,
      };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: state.posts.filter(post => post._id !== payload),
        };
      case DELETE_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      default:
        return state;
    }
  };
  
  export default communicationReducer;
  