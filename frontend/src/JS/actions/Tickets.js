import axios from 'axios';
import {
 
  LOAD_TICKETS,
  FAIL_TICKETS,
  GET_TICKETS_SUCCESS,
  UPDATE_TIKCET_SUCCESS,
  DELETE_TICKETS_SUCCESS,
  GET_ALLTICKETS_SUCCESS,
  
  
  
} from '../actionTypes/tickets';
import {
 
  CREATE_TICKETS_SUCCESS,
  UPDATE_TIKCETS_SUCCESS,
  FAIL_TASKS,
  UPDATE_TIKCETSFEATURE_SUCCESS,
  UPDATE_TIKCETSIMAGES_SUCCESS,
  VOTE_TICKET,
  DELETE_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  DELETE_TICKETS_FLAG_SUCCESS,
  UPDATE_TIKCETS_FLAG_SUCCESS
  
  
} from '../actionTypes/tasks';
import { toast } from 'react-toastify';
import { getTasks, updateSecondGrid } from './tasks';
import { getAllFeatures } from './feature';

// export const createTickets = (id,ticketsData) => async (dispatch, getState) => {
//   dispatch({ type: LOAD_TICKETS });

//   try {
//     const response = await axios.post(`http://localhost:8000/api/tickets/createtickets/${id}`, ticketsData);
//     dispatch({ type: CREATE_TICKETS_SUCCESS, payload: response.data });
    
//     const { TaskId } = ticketsData;
    
//     dispatch(getTickets(TaskId)); 
    
//     toast.success("Your Ticket is created");
//   } catch (error) {
//     dispatch({ type: FAIL_TICKETS, payload: error.message });
//   }
// };



// export const getTickets = (TaskId) => async (dispatch, getState) => {
//   dispatch({ type: LOAD_TICKETS });

//   try {
//     const response = await axios.get(`http://localhost:8000/api/tickets/getlistickets/${TaskId}`);
//     dispatch({ type: GET_TICKETS_SUCCESS, payload: { tickets: response.data } });

   
//   } catch (error) {
//     dispatch({ type: FAIL_TICKETS, payload: error.message });
//   }
// };
export const getListTicketsByproject = (projectId) => async (dispatch, getState) => {
  dispatch({ type: LOAD_TICKETS });

  try {
    const response = await axios.get(`http://localhost:8000/api/tickets/getlisticketsbyproject/${projectId}`);
    dispatch({ type: GET_TICKETS_SUCCESS, payload: { tickets: response.data } });

   
  } catch (error) {
    dispatch({ type: FAIL_TICKETS, payload: error.message });
  }
};


export const getallticket = (id) => async (dispatch, getState) => {
  dispatch({ type: LOAD_TICKETS });

  try {
    const response = await axios.get(`http://localhost:8000/api/tickets/getalltickets/${id}`);
    dispatch({ type: GET_ALLTICKETS_SUCCESS, payload: { alltickets: response.data } });

   
  } catch (error) {
    dispatch({ type: FAIL_TICKETS, payload: error.message });
  }
};

export const createTickets = (ticketsData,projectId) => async (dispatch, getState) => {

  try {
    const response = await axios.post('http://localhost:8000/api/tickets/createtickets', ticketsData);
    dispatch({ type: CREATE_TICKETS_SUCCESS, payload: response.data });
    
    // const { TaskId } = ticketsData;
    
    dispatch(getTasks(projectId))
    
    toast.success("Your Ticket is created");
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};

export const updatetickets = (projectId, userId, id, ticketsData) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/Updatetickets/${id}`, ticketsData);
   const { task,ticketId, taskid, ticket } = response.data;

    dispatch({
      type: UPDATE_TIKCETS_SUCCESS,
      payload: { task, ticketId,taskid, ticket }, 
    });
    const isSecondGridOpen = getState().tasksReducer.isSecondGridOpen[taskid];
    if (isSecondGridOpen) {
      dispatch(updateSecondGrid(ticketId, taskid, ticket));
    }
  
    toast.success("Your Ticket is updated");
    dispatch(getallticket(userId));
    dispatch(getAllFeatures(projectId));
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message,
    });
  }
};



export const updatingtickets = (projectid,id, ticketsData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/updateticket/${id}`, ticketsData);
    dispatch({
      type: UPDATE_TIKCET_SUCCESS,
      payload: response.data,
    });
    dispatch(getListTicketsByproject(projectid))
    toast.success("Your Ticket is created");

   
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
}

export const addCommentToTicket = (projectId,ticketid, commenterId,commentText) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/tickets/addcomment/${ticketid}`,{ commenterId,commentText });
    const {ticketId, taskid, ticketcomment} = response.data;

    dispatch({
      type: ADD_COMMENT,
      payload: response.data, 
    });

    dispatch(updateSecondGrid(ticketId, taskid, ticketcomment)); 
    dispatch(getTasks(projectId))

    
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message,
    });
  }
};

export const updateticketsFeature = (projectId, id, ticketsData) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/Updateticketsfeature/${id}`, ticketsData);
    const { ticketId, taskid, ticketfeature } = response.data;
    
    dispatch({
      type: UPDATE_TIKCETSFEATURE_SUCCESS,
      payload: response.data,
    });
  
    const isSecondGridOpen = getState().tasksReducer.isSecondGridOpen[taskid];
    if (isSecondGridOpen) {
      dispatch(updateSecondGrid(ticketId, taskid, ticketfeature));
    }
  
    dispatch(getTasks(projectId));
    dispatch(getAllFeatures(projectId));
    
    toast.success("Your Ticket feature is updated");
    
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
}

export const deleteCommentFromTicket = (ticketid, commentId, commenterId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/tickets/deleteComment/${ticketid}/${commentId}/${commenterId}`);

    const {ticketId, taskId, ticket } = response.data;

    dispatch({
      type: DELETE_COMMENT,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 

    toast.success("Comment deleted successfully");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
};


export const updateComment = (ticketid, commentId, commenterId, updatedCommentText) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/updateComment/${ticketid}/${commentId}`, {
      commenterId,
      updatedCommentText,
    });
    const {ticketId, taskId, ticket } = response.data;

    dispatch({
      type: UPDATE_COMMENT,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 

    toast.success("Comment updated successfully");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message,
    });
  }
};



export const deleteVoteFromTicket = (ticketid,voterId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/tickets/deleteVote/${ticketid}/${voterId}`);

   
    const { ticketId,taskId, ticket } = response.data;

    dispatch({
      type: DELETE_VOTE,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 

    toast.success("Your vote has been deleted successfully");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
};



export const addVoteToTicket = (ticketid, voterId) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/tickets/${ticketid}/vote`, { voterId });
   
    const {taskId,ticketId, ticket} = response.data;
    
    dispatch({
      type: VOTE_TICKET,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 

    toast.success("Your vote has been added successfully");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
};


export const updateticketsimages = (id, ticketsdata) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/updateticketsimages/${id}`, ticketsdata);
    
    const { ticketId, taskId, ticket } = response.data;

    dispatch({
      type: UPDATE_TIKCETSIMAGES_SUCCESS,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 
    toast.success("Your Ticket feature is updated");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
}


export const updateticketsflag = (projectId,ticketid) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tickets/updateTicketFlag/${ticketid}`);
    
    const { ticketId, taskId, ticket } = response.data;

    dispatch({
      type: UPDATE_TIKCETS_FLAG_SUCCESS,
      payload: response.data,
    });

    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 
    dispatch(getTasks(projectId))
    toast.success("Your Ticket feature is updated");
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
}


export const deleteticketsflag = (projectId,ticketid) => async (dispatch) => {
  dispatch({ type: LOAD_TICKETS });

try {
  const response =await axios.delete(`http://localhost:8000/api/tickets/deleteTicketFlag/${ticketid}`);
    const { ticketId, taskId, ticket } = response.data;

    dispatch({ type: DELETE_TICKETS_FLAG_SUCCESS, payload: ticketid });


    dispatch(updateSecondGrid(ticketId, taskId, ticket)); 
    dispatch(getListTicketsByproject(projectId))


  } catch (error) {
    dispatch({ type: FAIL_TICKETS, payload: error.response.data });
  }
};


export const deletetickets = (ticketId) => async (dispatch) => {
  dispatch({ type: LOAD_TICKETS });
try {
    await axios.delete(`http://localhost:8000/api/tickets/deleteticket/${ticketId}`);
    dispatch({ type: DELETE_TICKETS_SUCCESS, payload: ticketId });
    // dispatch(getprojectbyid(taskId));
  } catch (error) {
    dispatch({ type: FAIL_TICKETS, payload: error.response.data });
  }
};




