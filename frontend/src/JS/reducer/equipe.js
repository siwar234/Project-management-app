import {
  LOAD_EQUIPE,
  FAIL_EQUIPE,
  CREATE_EQUIPE_SUCCESS,
  CREATE_EQUIPE_FAIL,
  FETCH_EQUIPES_REQUEST,
  FETCH_EQUIPES_SUCCESS,
  FETCH_EQUIPES_FAILURE,
  DELETE_EQUIPE_SUCCESS,
  LEAVE_EQUIPE_SUCCESS,
  UPDATE_EQUIPE_SUCCESS,
  FETCH_EQUIPES,
  ADD_TO_TEAM,
  GET_EQUIPES_SUCCESS,
  ADD_LINK_SUCCESS,
  GET_LINKS_SUCCESS,
  DELETE_LINK_SUCCESS,
  FAIL_UPDATE_LINK,
  UPDATE_LINK_SUCCESS

} from '../actionTypes/equipe';
import {
  STOP_LOADING
  
} from '../actionTypes/user';

const initialState = {
  loadequipe: false,
  errors: [],
  isError: false,
  isSuccess: false,
  equipes: [],
  error: null,
  equipe:[],
  EquipesOwner:[],
  links: [],


  
};

const equipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOP_LOADING:
      return {
        ...state,
        loadequipe: false,
      };
    case LOAD_EQUIPE:
      return { ...state, loadequipe: true };
    case FAIL_EQUIPE:
      return { ...state, loadequipe: false, errors: payload };
   
    case CREATE_EQUIPE_SUCCESS:
      return { ...state, loadequipe: false, isSuccess: true};
    case CREATE_EQUIPE_FAIL:
      return { ...state, loadequipe: false, errors: payload, isError: true };
    case FETCH_EQUIPES_REQUEST:
      return {
        ...state,
        loadequipe: true,
        error: null,
      };
      
      case GET_EQUIPES_SUCCESS:
        return {
          ...state,
          loadequipe: false,
          EquipesOwner: payload.EquipesOwner,
        };
      
      case FETCH_EQUIPES:
      return {
        ...state,
        loadequipe: false,
        equipe: payload.equipe,
      };


    case FETCH_EQUIPES_SUCCESS:
      return {
        ...state,
        loadequipe: false,
        equipes: payload.equipes,
      };
     
    case FETCH_EQUIPES_FAILURE:
      return {
        ...state,
        loadequipe: false,
        error: payload,
      };
      case ADD_TO_TEAM:
      return {
        ...state,
        loadequipe: false,
        // equipe:payload.equipe,
        error: payload,
      };
      
    case DELETE_EQUIPE_SUCCESS:
      return {
        ...state,
        loadequipe: false,
        equipes: state.equipes.filter(equipe => equipe._id !== payload),
      };
      case LEAVE_EQUIPE_SUCCESS: 
      return {
        ...state,
        loadequipe: false,
        equipes: state.equipes.filter(equipe => equipe._id !== payload),

      };
      case UPDATE_EQUIPE_SUCCESS:
        return {
          ...state,
          loadequipe: false,
          equipes: payload,
          errors: [], 
        };


        case ADD_LINK_SUCCESS:
          return {
            ...state,
            links: [...state.links, payload],
            loading: false,
          };
        case GET_LINKS_SUCCESS:
          return {
            ...state,
            links: payload,
            loading: false,
          };
        case DELETE_LINK_SUCCESS:
          return {
            ...state,
            links: state.links.filter(link => link._id !== payload),
            loading: false,
          };

          case UPDATE_LINK_SUCCESS:
      const { equipeId, linkId, updatedLink } = payload;
      // Update the links array immutably
      const updatedLinks = state.links.map(link =>
        link._id === linkId ? { ...link, ...updatedLink } : link
      );

      return {
        ...state,
        links: updatedLinks,
      };
          case FAIL_UPDATE_LINK:
            return {
              ...state,
              loading: false,
              error: payload,
            };

            case 'DELETE_LINK_SUCCESS':
      return {
        ...state,
        equipe: payload, 
        error: null,
      };
   
    default:
      return state;
  }
};

export default equipeReducer;
