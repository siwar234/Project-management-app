// actions/favoritesActions.js

import axios from 'axios';
import {
    ADD_FAVOURITES,
  REMOVE_FAVOURITES,
  LOAD_FAVOURITES,
  FAIL_FAVOURITES,
  GET_FAVOURITES
} from '../actionTypes/favourites';

import { toast } from 'react-toastify';
import { updateSecondGrid } from './tasks';

export const addFavorites = (ticketId, userId) => async (dispatch) => {
    dispatch({ type: LOAD_FAVOURITES });

  try {
    const res = await axios.post(`http://localhost:8000/api/favrouites/addfavroutie`, { ticketId, userId });
    dispatch({
      type: ADD_FAVOURITES,
      payload: res.data
    });

    // const {  taskid, ticket } = res.data;
    // dispatch(updateSecondGrid(ticketId, taskid, ticket));
    dispatch(getFavorites(userId));

    toast.success("Ticket add to favourites ")

  } catch (error) {
    dispatch({
      type: FAIL_FAVOURITES,
      payload: error.response.data 
    });
  }
};

export const getFavorites = (userId) => async (dispatch) => {
    dispatch({ type: LOAD_FAVOURITES });
  
    try {
      const res = await axios.get(`http://localhost:8000/api/favrouites/getfavorites/${userId}`);
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data 
      });
    } catch (error) {
      dispatch({
        type: FAIL_FAVOURITES,
        payload: error.response.data 
      });
    }
  };
  

export const removeFavorites = (ticketId, userId) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/favrouites/removefavroutie`, { ticketId, userId });
    dispatch({
      type: REMOVE_FAVOURITES,
      payload: res.data 
    });
    toast.success("Ticket removed from favourites ")
    dispatch(getFavorites(userId));

  } catch (error) {
    dispatch({
      type: FAIL_FAVOURITES,
      payload: error.response.data 
    });
  }
};

