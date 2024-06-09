import {
    CREATE_FEATURE_SUCCESS,
    FAIL_FEATURE,
    LOAD_FEATURE,
    GET_FEATURES_SUCCESS,UPDATE_FEATURE_SUCCESS
  } from '../actionTypes/features';
  import {
    STOP_LOADING
    
  } from '../actionTypes/user';
  
  const initialState = {
    loadfeature: false,
    errors: [],
    isError: false,
    isSuccess: false,
   features: [],
  
  
    
  };
  
  const featureReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case STOP_LOADING:
        return {
          ...state,
          loadfeature: false,
        };
      case LOAD_FEATURE:
        return { ...state, loadfeature: true };
      case FAIL_FEATURE:
        return { ...state, loadfeature: false, errors: payload };
     
      case CREATE_FEATURE_SUCCESS:
        return { ...state, loadfeature: false, isSuccess: true};
        case GET_FEATURES_SUCCESS:
            return { ...state, loadfeature: false, isSuccess: true,features:payload.features};

            case UPDATE_FEATURE_SUCCESS:
                const updatedFeatures = state.features.map(feature => 
                    feature._id === payload._id ? payload : feature
                );
                return { ...state, loadfeature: false, isSuccess: true, features: updatedFeatures };
            
      
     
      default:
        return state;
    }
  };
  
  export default featureReducer;
  