import axios from 'axios';
import {  useSelector } from 'react-redux';
import {
  CREATE_PROJECT_SUCCESS,
  
  FAIL_PROJECT,
  GET_PROJECT_SUCCESS,
  LOAD_PROJECT,
  SELECT_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  GET_PROJECTBYID_SUCCESS ,
  DELETE_PROJECT_SUCCESS
  
} from '../actionTypes/project';
import { toast } from 'react-toastify';
import { fetchEquipesbyId } from './equipe';

export const createProject = (projectData) => async (dispatch, getState) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.post('http://localhost:8000/api/project/createproject', projectData);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: response.data });

    const { user } = getState().userReducer;
    const userId = user._id;
    dispatch(getprojectbyuser(userId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};

export const getprojectbyid = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.get(`http://localhost:8000/api/project/getprojectbyid/${id}`, );
    dispatch({ type: GET_PROJECTBYID_SUCCESS, payload: { project: response.data }  });

    // dispatch({ type: SELECT_PROJECT, payload:response.data });

  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};

export const updateProject = (id, projectData,userid) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/project/updateproject/${id}`, projectData);
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: response.data,
    });
    dispatch(getprojectbyuser(userid))
    toast.success("Your Project settings have been saved")
  } catch (error) {
    dispatch({
      type: FAIL_PROJECT,
      payload: error.response.data.message, 
    });
  }
};



// export const getAllProject = () => async (dispatch) => {
//   dispatch({ type: LOAD_PROJECT });

//   try {
//     const response = await axios.get(`http://localhost:8000/api/project//getAllproject`, );
//     dispatch({ type: GET_PROJECT_SUCCESS, payload: { allprojects: response.data }  });


//   } catch (error) {
//     dispatch({ type: FAIL_PROJECT, payload: error.message });
//   }
// };


export const deleteproject = (projectId) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });
try {
    await axios.delete(`http://localhost:8000/api/project/deleteproject/${projectId}`);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    dispatch(getprojectbyid(projectId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.response.data });
  }
};



export const getprojectbyuser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.get(`http://localhost:8000/api/project/getprojectbyuser/${userId}`, );
    dispatch({ type: GET_PROJECT_SUCCESS, payload: { projects: response.data }  });

  
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};

