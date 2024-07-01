import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL, NEW_NOTIFICATION,READ_NOTIFICATIONS_SUCCESS,READ_NOTIFICATIONS_FAIL ,MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS} from '../actionTypes/notifications';

const initialState = {
  notifications: [],
  error: null
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: payload, error: null };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, error: payload };
    case NEW_NOTIFICATION:
      return { ...state, notifications: [payload, ...state.notifications] };
      case READ_NOTIFICATIONS_SUCCESS:
      return { 
        ...state, 
        notifications: state.notifications.map(notification =>
          notification._id === payload._id ? { ...notification, read: true } : notification
        ),
        error: null 
      };
    case READ_NOTIFICATIONS_FAIL:
      return { ...state, error: payload };

      case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
        return {
          ...state,
          notifications: state.notifications.map(notification => ({ ...notification, read: true }))
        };
      case MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE:
        return {
          ...state,
          error: payload
        };
    default:
      return state;
  }
};

export default notificationReducer;
