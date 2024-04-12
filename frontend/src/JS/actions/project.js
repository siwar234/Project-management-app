import axios from 'axios';
import {
  CREATE_PROJECT_SUCCESS,
  
  FAIL_PROJECT,
  LOAD_PROJECT,
  
} from '../actionTypes/project';

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: LOAD_PROJECT });

  try {
    const response = await axios.post('http://localhost:8000/api/project/createproject', projectData);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FAIL_PROJECT, payload: error.message });
  }
};
