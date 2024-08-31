import axios from 'axios';
import {
  CREATE_PROJECT_SUCCESS,
  
  FAIL_PROJECT,
  GET_PROJECT_SUCCESS,
  LOAD_PROJECT,
  UPDATE_PROJECTS,
  UPDATE_PROJECT_SUCCESS,
  GET_PROJECTBYID_SUCCESS ,
  DELETE_PROJECT_SUCCESS,
  ARCHIVE_PROJECT_SUCCESS
  
} from '../actionTypes/project';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { url ,httpUrl} from "../../ConnectionString"

const socket = io(`${httpUrl}`);

export const createProject = (projectData) => async (dispatch, getState) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.post(`${url}/project/createproject`, projectData);

    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: response.data });
     socket.emit('projectnotification',response.data)

    const { user } = getState().userReducer;
    const userId = user._id;
    dispatch(getprojectbyuser(userId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};


export const archiveProject = (projectId) => async (dispatch, getState) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.put(`${url}/project/archiverproject/${projectId}`,);

    dispatch({ type: ARCHIVE_PROJECT_SUCCESS, payload: response.data });
    // socket.emit('projectnotification', response.data);
    toast.success("Project successfully archived " )

    // const { user } = getState().userReducer;
    // const userId = user._id;
    // dispatch(getprojectbyuser(userId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
    toast.error(error.message )

  }
};


export const unarchiveProject = (projectId) => async (dispatch, getState) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.put(`${url}/project/unarchiverproject/${projectId}`,);

    dispatch({ type: ARCHIVE_PROJECT_SUCCESS, payload: response.data });
    // socket.emit('projectnotification', response.data);
    toast.success("Project successfully restored " )

    // const { user } = getState().userReducer;
    // const userId = user._id;
    // dispatch(getprojectbyuser(userId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
    toast.error(error.message )

  }
};

export const getprojectbyid = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.get(`${url}/project/getprojectbyid/${id}`, );
    dispatch({ type: GET_PROJECTBYID_SUCCESS, payload: { project: response.data }  });

    // dispatch({ type: SELECT_PROJECT, payload:response.data });

  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};

export const updateProject = (id, projectData,userid) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/project/updateproject/${id}`, projectData);
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




export const deleteproject = (projectId) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });
try {
    await axios.delete(`${url}/project/deleteproject/${projectId}`);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    dispatch(getprojectbyid(projectId));
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.response.data });
  }
};



export const getprojectbyuser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.get(`${url}/project/getprojectbyuser/${userId}`, );
    dispatch({ type: GET_PROJECT_SUCCESS, payload: { projects: response.data }  });

  
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};



export const updateProjects = (projects) => ({
  type: UPDATE_PROJECTS,
  payload: { projects }
});
