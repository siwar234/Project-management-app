import axios from 'axios';
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL,READ_NOTIFICATIONS_FAIL, MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  NEW_NOTIFICATION,READ_NOTIFICATIONS_SUCCESS,MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE } from '../actionTypes/notifications';

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


  export const markAllNotificationsAsRead = (userId) => async (dispatch) => {
    try {
      console.log("Sending request to mark all notifications as read for user ID:", userId); // Debug log
      const response = await axios.put(`http://localhost:8000/api/notifications/readall/${userId}`);
      dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE, payload: error.response.data.message });
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
