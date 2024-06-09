import axios from 'axios';
import { CREATE_FEATURE_SUCCESS,FAIL_FEATURE,GET_FEATURES_SUCCESS,LOAD_FEATURE,UPDATE_FEATURE_SUCCESS} from '../actionTypes/features';
import { toast } from 'react-toastify';
import { getTasks } from './tasks';

export const createFeature = (formData) => async (dispatch) => {
  // dispatch({ type: LOAD_E }); 

    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
        const response = await axios.post(`http://localhost:8000/api/feature/createfeature`, formData,options);
        dispatch({ type: CREATE_FEATURE_SUCCESS, payload: response.data }); 
        const { projectId } = formData;
       dispatch(getAllFeatures(projectId))
    toast.success("Your feature is created")


    } catch (error) {
        dispatch({ type: FAIL_FEATURE, payload: error.response.data.error }); 
    }
};



export const getAllFeatures = (projectId) => async (dispatch) => {
  dispatch({ type: LOAD_FEATURE });

  try {
    const response = await axios.get(`http://localhost:8000/api/feature/getlistfeatures/${projectId}`, );
    dispatch({ type: GET_FEATURES_SUCCESS, payload: { features: response.data }  });


  } catch (error) {
    dispatch({ type: FAIL_FEATURE, payload: error.message });
  }
};

export const updatefeatures = (projectId,id, featureData) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/feature/updatefeature/${id}`, featureData);
        dispatch({
            type: UPDATE_FEATURE_SUCCESS,
            payload: response.data, 
        });
        dispatch(getTasks(projectId))
        dispatch(getAllFeatures(projectId))
        toast.success("Your feature settings have been saved");
        
    } catch (error) {
        dispatch({
            type: FAIL_FEATURE,
            payload: error.response.data.message,
        });
    }
};



  
  




  