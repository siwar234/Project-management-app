import axios from 'axios';
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL,READ_NOTIFICATIONS_FAIL, NEW_NOTIFICATION,READ_NOTIFICATIONS_SUCCESS } from '../actionTypes/notifications';

export const getNotifications = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/notifications/user/${userId}`);
    dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error.response.data.message });
  }
};

export const readnotifications = (notificationId) => async (dispatch) => {
    try {
      console.log("Sending notification ID to backend:", notificationId); // Debug log

      const response = await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`);
      dispatch({ type: READ_NOTIFICATIONS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: READ_NOTIFICATIONS_FAIL, payload: error.response.data.message });
    }
  };


// export const getTicketNotifications = (userId) => async (dispatch) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/notifications/tiketResponsible/${userId}`);
//       dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error.response.data.message });
//     }
//   };
  

export const addNewNotification = (notification) => (dispatch) => {
  dispatch({ type: NEW_NOTIFICATION, payload: notification });
};
