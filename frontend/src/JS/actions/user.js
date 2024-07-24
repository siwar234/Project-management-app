
import axios from 'axios';
import { 
  LOAD_USER, 
  SIGN_IN_USER, 
  FAIL_USER, 
  LOGOUT_USER, 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  EMAIL_VALID, 
  EMAIL_FAIL ,
  CLEAN_LOG_ERROR,
  EMAIL_ALREADY_EXISTS,
  CURRENT_USER,
  STOP_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  BAN_USER,
  UNBAN_USER,
  UPDATE_USER_SUCCESS,
  PASSWORD_INVALID,
  SIGNUP_INVITATION_SUCCESS

} from "../actionTypes/user"
import { toast } from 'react-toastify';

import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
 const socket = io('http://localhost:4101');

 export const loginUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_USER });

  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', userData);
    
    dispatch({ type: SIGN_IN_USER, payload: response.data });
    
    toast.success('Login successful!');
    
    navigate('/workspace'); 

  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data.message === "passwordinvalid") {
        dispatch({ type: PASSWORD_INVALID });
        toast.error('Invalid password. Please try again.');
      } else if (error.response.status === 403 && error.response.data.message === "banned") {
        toast.error('Your account is locked due to multiple failed login attempts. It will be locked for an hour. Please contact the admin if you need assistance.');
        
        socket.emit('failedAttemptnotification', {
          email: userData.email,
          message: 'A user has failed to login multiple times.',
        });

      } else {
        dispatch({ type: FAIL_USER, payload: error.response.data });
        toast.error('An error occurred during login. Please try again later.');
      }
    } else {
      dispatch({ type: FAIL_USER, payload: error.message });
      toast.error('An error occurred during login. Please try again later.');
    }
  }
};

  export const signinAfterInvitation = (activationToken,email, equipeId, password,navigate) => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/equipe/signin-after-invitation/${activationToken}/${equipeId}`, { password,email });
      dispatch({ type: SIGN_IN_USER, payload: response.data });
      navigate(`/team/equipe/${equipeId}`);
      toast.success('Login successful!');

    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error.response.data });
    }
  };


  



  

  export const signupAfterInvitation = (token,equipeId,firstName, password, email,navigate) => async (dispatch) => {
  
    try {
      const response = await axios.post(`http://localhost:8000/api/equipe/signup-after-invitation/${token}/${equipeId}`,{
        firstName,
        email,
        password,
      });
      localStorage.setItem("token", token);;
      dispatch({ type: SIGNUP_INVITATION_SUCCESS, payload: response.data });

      navigate(`/profileuser/${response.data.token}/${response.data.user._id}`);
      dispatch(currentUser())
      toast.success('signup successful!');


    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {

          dispatch({ type: EMAIL_ALREADY_EXISTS });
  } else {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
}
};
  export const registerUser = (email) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/', { email });
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
          toast.success('Invitation sent successfully!');

    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {

            dispatch({ type: EMAIL_ALREADY_EXISTS });
    } else {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    }
  }
};




  export const activateEmail = (token, firstName, password, email,navigate) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
  
    try {
        const response = await axios.post(`http://localhost:8000/api/auth/activate/${token}`, {
        firstName,
        email,
        password,
      });
      localStorage.setItem("token", token);
      dispatch({ type: EMAIL_VALID, payload: response.data });
      navigate(`/profileuser/${response.data.token}/${response.data.user._id}`);
      toast.success('signup successful!');

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {

          dispatch({ type: EMAIL_ALREADY_EXISTS });
  } else {
      dispatch({ type: EMAIL_FAIL, payload: error?.response?.data });
    }}
  };
  

  export const logoutUser = (navigate) => {
    navigate("/authentificate/login");
    return {
      type: LOGOUT_USER,
    };
  };



  export const cleanLoginError = () => {
    return {
      type: CLEAN_LOG_ERROR,
    };
  };


  export const current = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
      
      const result = await axios.get(
        `http://localhost:8000/api/getuser/${id}`,
        
      );
        dispatch({ type: CURRENT_USER,  payload: { user: result.data }  });
        dispatch({ type: STOP_LOADING });
      
    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error?.response?.data?.errors });
      dispatch({ type: STOP_LOADING });
    }
  };

  
  export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const result = await axios.get(
        `http://localhost:8000/api/getlistuser`,
        options
      );
        dispatch({ type: FETCH_USERS_SUCCESS,  payload: { users: result.data }  });
        dispatch({ type: STOP_LOADING });
      
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAIL, payload: error?.response?.data?.errors });
      dispatch({ type: STOP_LOADING });
    }
  };

  export const banUser = (userID, banDate) => async (dispatch) => {
    dispatch({ type: LOAD_USER });

    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const response = await axios.put('http://localhost:8000/api/banuser', { userID, banDate },options);
      dispatch({ type: BAN_USER, payload: response.data });
      dispatch(fetchUsers())

    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error?.response?.data?.errors });
    }
  };

  export const unbanuser = (userID) => async (dispatch) => {
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const response = await axios.put('http://localhost:8000/api/unbanuser', { userID }, options);
      dispatch({ type: UNBAN_USER, payload: response.data });
      dispatch(fetchUsers())

    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error?.response?.data?.errors });
    }
  };


  export const updateUser = (userId, userData) => async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/updateuser/${userId}`, userData);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_USER,
        payload: error.response.data.message, 
      });
    }
  };

  export const getUserIdAndDispatchCurrent = () =>async(dispatch)=> {
    const token = window.localStorage.getItem('token');
  
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      
      dispatch(current(userId));
  
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  

  export const currentUser = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
      const options = { headers: {   authorization: localStorage.getItem("token")} };
      const response = await axios.get('http://localhost:8000/api/auth/current', options);
      dispatch({ type: CURRENT_USER, payload: { user: response.data } });
    } catch (error) {
      console.error('Error fetching current admin:', error);
      dispatch({ type: FAIL_USER, payload: error?.response?.data?.errors });
    }
  };

  