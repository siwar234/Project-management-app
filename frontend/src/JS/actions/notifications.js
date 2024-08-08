import axios from 'axios';
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL,READ_NOTIFICATIONS_FAIL, MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  NEW_NOTIFICATION,READ_NOTIFICATIONS_SUCCESS,MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE } from '../actionTypes/notifications';
  import { url } from "../../ConnectionString"

export const getNotifications = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/notifications/user/${userId}`);
    dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error.response.data.message });
  }
};

export const readnotifications = (notificationId) => async (dispatch) => {
    try {
      console.log("Sending notification ID to backend:", notificationId); // Debug log

      const response = await axios.patch(`${url}/notifications/${notificationId}/read`);
      dispatch({ type: READ_NOTIFICATIONS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: READ_NOTIFICATIONS_FAIL, payload: error.response.data.message });
    }
  };


  export const markAllNotificationsAsRead = (userId) => async (dispatch) => {
    try {
      console.log("Sending request to mark all notifications as read for user ID:", userId); // Debug log
      const response = await axios.put(`${url}/notifications/readall/${userId}`);
      dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE, payload: error.response.data.message });
    }
  };



export const addNewNotification = (notification) => (dispatch) => {
  dispatch({ type: NEW_NOTIFICATION, payload: notification });
};
