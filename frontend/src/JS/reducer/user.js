import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  STOP_LOADING,
  FAIL_USER,
  CLEAN_LOG_ERROR,
  SIGN_IN_USER,
  LOGOUT_USER,
  CURRENT_USER,
  EMAIL_FAIL,
  EMAIL_VALID,
  EMAIL_ALREADY_EXISTS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  UNBAN_USER,
  BAN_USER,
  UPDATE_USER_SUCCESS,
  PASSWORD_INVALID,
  SIGNUP_INVITATION_SUCCESS,
  
} from '../actionTypes/user';

const initialState = {
  user: null,
  isAuth: false,
  loaduser: false,
  errors: [],
  isError: false,
  isSuccess: false,
  emailAlreadyExists: false,
  users: [],
  isBanned: null,
  passwordinvalid: false,
  isAdmin:false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOP_LOADING:
      return {
        ...state,
        loaduser: false,
      };
    case EMAIL_ALREADY_EXISTS:
      return {
        ...state,
        emailAlreadyExists: true,
      };
     
      case PASSWORD_INVALID:
        return {
          ...state,
          passwordinvalid: true,
        };
    case LOAD_USER:
      return { ...state, loaduser: true };
    case FAIL_USER:
      return { ...state, loaduser: false, errors: payload };
    case CLEAN_LOG_ERROR:
      return { ...state, errors: [] };
    case SIGN_IN_USER:
      // console.log(payload.user);
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        loaduser: false,
        user: payload.user,
        isAuth: true,
        errors: [],
        isAdmin: payload.user.isAdmin
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        loadUser: false,
        errors: [],
        user: {},
        isAuth: false,
      };
      

    case REGISTER_SUCCESS:
      return {
        ...state,
        loaduser: false,
        user: payload.user,
        isAuth: false,
        errors: [],
        emailAlreadyExists: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loaduser: false,
        errors: payload,
        emailAlreadyExists: true,
      };
      case SIGNUP_INVITATION_SUCCESS:
      return {
        ...state,
        loaduser: false,
        user: payload.user,
        isAuth: true,
        errors: [],
      };
      
    case EMAIL_VALID:
      return {
        ...state,
        loaduser: false,
        user: payload.user,
        isAuth: true,
        errors: [],
      };
    case EMAIL_FAIL:
      return {
        ...state,
        loaduser: false,
        errors: payload,
      };
    case CURRENT_USER:
      console.log(payload);

      return {
        ...state,
        loaduser: false,
        user: payload.user,
        isAuth: true,
        errors: [],
        
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload.users,
        error: null,
      };

    case FETCH_USERS_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: payload,
      };
    case BAN_USER:
      console.log("Banning user. Payload:", payload);

      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user._id === payload.userID ? { ...user, isBanned: payload.banDate } : user,
        ),
                error: null,
      };
      

    case UNBAN_USER:
      console.log("Banning user. Payload:", payload);

      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user._id === payload.userID ? { ...user, isBanned: null } : user,
        ),
        error: null,

      };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loaduser: false,
          user: payload,
          errors: [], 
        };
    default:
      return state;
  }
};

export default userReducer;
