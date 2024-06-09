import {
    ADD_FAVOURITES,
    REMOVE_FAVOURITES,
    FAIL_FAVOURITES,
    LOAD_FAVOURITES,
    GET_FAVOURITES
  } from '../actionTypes/favourites';
  
  
  const initialState = {
    errors: [],
    isError: false,
    isSuccess: false,
   favourites: [],
   loadfavourite:false
  
  
    
  };
  
  const favouritesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      
      case LOAD_FAVOURITES:
        return { ...state, loadfavourite: true };
      case FAIL_FAVOURITES:
        return { ...state, loadfavourite: false, errors: payload };
     
        case ADD_FAVOURITES:
            return {
              ...state,
              favourites: payload,
              loading: false,
              error: null
            };
          case REMOVE_FAVOURITES:
            return {
              ...state,
              favourites: state.favourites.filter(favouite => favouite._id !== payload),
              loading: false,
              error: null
            };
            case GET_FAVOURITES:
                return { ...state, loading: false, isSuccess: true,favourites:payload};
      
          
      default:
        return state;
    }
  };
  
  export default favouritesReducer;
  