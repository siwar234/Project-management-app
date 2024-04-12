import axios from 'axios';
import { CREATE_EQUIPE_SUCCESS, CREATE_EQUIPE_FAIL ,ADD_TO_TEAM,FETCH_ALLEQUIPES_SUCCESS,FETCH_EQUIPES,UPDATE_EQUIPE_SUCCESS,LEAVE_EQUIPE_SUCCESS,DELETE_EQUIPE_SUCCESS,FAIL_EQUIPE,FETCH_EQUIPES_SUCCESS,FETCH_EQUIPES_FAILURE, LOAD_EQUIPE} from '../actionTypes/equipe';
import { toast } from 'react-toastify';

export const createEquipe = (formData,id) => async (dispatch) => {
  // dispatch({ type: LOAD_E }); 

    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
        const response = await axios.post(`http://localhost:8000/api/equipe/createequipe/${id}`, formData,options);
        dispatch({ type: CREATE_EQUIPE_SUCCESS, payload: response.data }); 
       dispatch(fetchEquipes(id))

    } catch (error) {
        dispatch({ type: CREATE_EQUIPE_FAIL, payload: error.response.data.error }); 
    }
};

export const fetchEquipes = (userId) => async (dispatch) => {
  
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const result = await axios.get(
        `http://localhost:8000/api/equipe/equipes/${userId}`,
        options
      );
    
      dispatch({ type: FETCH_EQUIPES_SUCCESS, payload: { equipes: result.data } });
    } catch (error) {
      dispatch({ type: FETCH_EQUIPES_FAILURE, payload: error.message });
    }
  };



export const leaveEquipe = (equipeId,id) => async (dispatch) => {
  dispatch({ type: LOAD_EQUIPE });
  try {
    const options = {
      headers: { authorization: localStorage.getItem("token") },
    };
    await axios.put(`http://localhost:8000/api/equipe/leave/${equipeId}/${id}`, null, options);
    dispatch({ type: LEAVE_EQUIPE_SUCCESS, payload: equipeId });
  } catch (error) {
    dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
  }
};





  export const fetchEquipesbyId = (id) => async (dispatch) => {
  
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const result = await axios.get(
        `http://localhost:8000/api/equipe/equipe/${id}`,
        options
      );
    
      dispatch({ type: FETCH_EQUIPES, payload: { equipe: result.data } });
    } catch (error) {
      dispatch({ type: FETCH_EQUIPES_FAILURE, payload: error.message });
    }
  };

  export const updateEquipe = (id, equipeData) => async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/equipe/updateequipe/${id}`, equipeData);
      dispatch({
        type: UPDATE_EQUIPE_SUCCESS,
        payload: response.data,
      });
      dispatch(fetchEquipesbyId(id))
      toast.success("Your team settings have been saved")
    } catch (error) {
      dispatch({
        type: FAIL_EQUIPE,
        payload: error.response.data.message, 
      });
    }
  };

  export const addtoteam = (activationToken, equipeId) => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/equipe/addteam/${activationToken}/${equipeId}`);
      dispatch({ type: ADD_TO_TEAM, payload: response.data });
      // toast.success(' addedd success!');

    } catch (error) {
      console.log(error)
    }
  };


  export const fetchequipes = () => async (dispatch) => {
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const result = await axios.get(
        `http://localhost:8000/api/equipe/liste-equipe`,
        options
      );
        dispatch({ type: FETCH_ALLEQUIPES_SUCCESS,  payload: { allEquipes: result.data }  });
      
    } catch (error) {
      dispatch({ type: FETCH_EQUIPES_FAILURE, payload: error?.response?.data?.errors });
    }
  };


  export const deleteEquipe = (equipeId) => async (dispatch) => {
    dispatch({ type: LOAD_EQUIPE });
    try {
      await axios.delete(`http://localhost:8000/api/equipe/deleteequipe/${equipeId}`);
      dispatch({ type: DELETE_EQUIPE_SUCCESS, payload: equipeId });
      dispatch(fetchEquipesbyId(equipeId));
    } catch (error) {
      // dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
    }
  };


  export const sendInvitation = (formData,id) => async (dispatch) => {
  
      try {
        const options = {
          headers: { authorization: localStorage.getItem("token") },
        };
          const response = await axios.post(`http://localhost:8000/api/equipe/invite/${id}`, formData,options);
        
      } catch (error) {
          dispatch({ type: CREATE_EQUIPE_FAIL, payload: error.response.data.error }); 
      }
  };