import axios from 'axios';
import { CREATE_EQUIPE_SUCCESS, CREATE_EQUIPE_FAIL, FAIL_UPDATE_LINK,UPDATE_LINK_SUCCESS,
  GET_EQUIPES_SUCCESS, ADD_TO_TEAM, FETCH_EQUIPES, UPDATE_EQUIPE_SUCCESS, LEAVE_EQUIPE_SUCCESS, DELETE_EQUIPE_SUCCESS, FAIL_EQUIPE, FETCH_EQUIPES_SUCCESS, FETCH_EQUIPES_FAILURE, LOAD_EQUIPE, ADD_LINK_SUCCESS, GET_LINKS_SUCCESS, DELETE_LINK_SUCCESS } from '../actionTypes/equipe';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { GET_PROJECT_SUCCESS,GET_PROJECTBYID_SUCCESS } from '../actionTypes/project';
import { url,httpUrl } from "../../ConnectionString"

 const socket = io(`${httpUrl}`);

export const createEquipe = (formData,id) => async (dispatch) => {
  // dispatch({ type: LOAD_E }); 

    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
        const response = await axios.post(`${url}/equipe/createequipe/${id}`, formData,options);
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
        `${url}/equipe/equipes/${userId}`,
        options
      );
    
      dispatch({ type: FETCH_EQUIPES_SUCCESS, payload: { equipes: result.data } });
    } catch (error) {
      dispatch({ type: FETCH_EQUIPES_FAILURE, payload: error.message });
    }
  };

  export const GetchEquipesOwner = (userId) => async (dispatch) => {
  
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const result = await axios.get(
        `${url}/equipe/equipesowner/${userId}`,
        options
      );
    
      dispatch({ type: GET_EQUIPES_SUCCESS, payload: { EquipesOwner: result.data } });
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
   const res= await axios.put(`${url}/equipe/leave/${equipeId}/${id}`, null, options);
    dispatch({ type: LEAVE_EQUIPE_SUCCESS, payload: equipeId });

    dispatch(fetchEquipesbyId(equipeId))

    const {  projectdata } = res.data;
    dispatch({ type: GET_PROJECT_SUCCESS, payload: { projects: projectdata}  });
    dispatch({ type: GET_PROJECTBYID_SUCCESS, payload: { project: projectdata }  });

    
    // dispatch(getprojectbyuser(id))
    socket.emit('leaveTeamnotification',res.data)

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
        `${url}/equipe/equipe/${id}`,
        options
      );
    
      dispatch({ type: FETCH_EQUIPES, payload: { equipe: result.data } });
    } catch (error) {
      dispatch({ type: FETCH_EQUIPES_FAILURE, payload: error.message });
    }
  };

  export const updateEquipe = (id, equipeData) => async (dispatch) => {
    try {
      const response = await axios.put(`${url}/equipe/updateequipe/${id}`, equipeData);
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

  export const addtoteam = (activationToken, equipeId,userId) => async (dispatch) => {
    try {
      const response = await axios.post(`${url}/equipe/addteam/${activationToken}/${equipeId}`);
      dispatch({ type: ADD_TO_TEAM, payload: response.data });
      // toast.success(' addedd success!');
      // dispatch(GetchEquipesOwner(userId));


    } catch (error) {
      console.log(error)
    }
  };





  export const deleteEquipe = (equipeId) => async (dispatch) => {
    dispatch({ type: LOAD_EQUIPE });
    try {
      await axios.delete(`${url}/equipe/deleteequipe/${equipeId}`);
      dispatch({ type: DELETE_EQUIPE_SUCCESS, payload: equipeId });
      dispatch(fetchEquipesbyId(equipeId));
    } catch (error) {
      // dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
    }
  };


 export const sendInvitation = (formData, id) => async (dispatch) => {
    try {
        const options = {
            headers: { authorization: localStorage.getItem("token") },
        };
        await axios.post(`${url}/equipe/invite/${id}`, formData, options);
    } catch (error) {
        dispatch({ type: CREATE_EQUIPE_FAIL, payload: error.response.data.error });
    }
};

//links
  export const addLink = (equipeId, linkData) => async (dispatch) => {
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const response = await axios.put(`${url}/equipe/addlink/${equipeId}`, linkData, options);
      dispatch({ type: ADD_LINK_SUCCESS, payload: response.data });
      dispatch(getLinks(equipeId));
    } catch (error) {
      dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
    }
  };


  export const updateLink = (equipeId, linkId, updatedLinkData) => async (dispatch) => {
    try {
      const response = await axios.put(`${url}/equipe/${equipeId}/updatelink/${linkId}`, updatedLinkData);
      dispatch({ type: UPDATE_LINK_SUCCESS, payload: { equipeId, linkId, updatedLink: response.data } });
    } catch (error) {
      dispatch({ type: FAIL_UPDATE_LINK, payload: error.response.data });
    }
  };
  
  
  export const getLinks = (equipeId) => async (dispatch) => {
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      const response = await axios.get(`${url}/equipe/links/${equipeId}`, options);
      dispatch({ type: GET_LINKS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
    }
  };
  
  export const deleteLink = (equipeId, linkId) => async (dispatch) => {
    try {
      const options = {
        headers: { authorization: localStorage.getItem("token") },
      };
      await axios.delete(`${url}/equipe/deletelink/${equipeId}/${linkId}`, options);
      dispatch({ type: DELETE_LINK_SUCCESS, payload: linkId });
    } catch (error) {
      dispatch({ type: FAIL_EQUIPE, payload: error.response.data });
    }
  };
