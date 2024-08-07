import axios from 'axios';
import {  useSelector_ } from 'react-redux';
import {
  CREATE_TASKS_SUCCESS,
  LOAD_TASKS,
  FAIL_TASKS,
  GET_TASKS_SUCCESS,
  UPDATE_TASKS_SUCCESS,
  DELETE_TASKS_SUCCESS,
  MOVE_TICKET_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_SECOND_GRID,
  CLOSE_SECOND_GRID,
  GET_ALL_TASKS_SUCCESS,
  RELATE_TASKS_SUCCESS,
  
  UPDATE_TICKET_IN_TASK
  
  
} from '../actionTypes/tasks';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { getAllFeatures } from './feature';
 const socket = io('http://localhost:4101');
export const createTasks = (tasksData) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.post('http://localhost:8000/api/tasks/createtasks', tasksData);
    dispatch({ type: CREATE_TASKS_SUCCESS, payload: response.data });
    const { projectId } = tasksData;
    dispatch(getTasks(projectId))
    toast.success("Your Tasks is created")

   
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};


export const relatedtask = (taskId,relatedTaskId,projectId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.put(`http://localhost:8000/api/tasks/relatedtask/${taskId}/${relatedTaskId}`, );
    dispatch({ type: RELATE_TASKS_SUCCESS, payload: response.data });
    socket.emit('relatedTasksNotification', response.data);

    toast.success("Your Tasks is related ")
    dispatch(getTasks(projectId))

   
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};

export const unrelatedtask = (taskId,projectId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.put(`http://localhost:8000/api/tasks/unrelatedtask/${taskId}`, );
    dispatch({ type: RELATE_TASKS_SUCCESS, payload: response.data });
    dispatch(getTasks(projectId))

    toast.success("Your Tasks is unrelated ")

   
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};


export const getallTasks = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.get(`http://localhost:8000/api/tasks/getalltasks/${userId}`);
    dispatch({ type: GET_ALL_TASKS_SUCCESS, payload: response.data });
    
   
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};



export const getTasks = (projectId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.get(`http://localhost:8000/api/tasks/getlisttask/${projectId}`);
    dispatch({ type: GET_TASKS_SUCCESS, payload: response.data });
    socket.on('updateTickets')
   
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};


export const updateTicketInTask = (updatedTicket) => {
  return {
    type: UPDATE_TICKET_IN_TASK,
    payload: updatedTicket,
  };
};


export const updateSecondGrid = (ticketId, taskId, ticket) => ({
  
  type: UPDATE_SECOND_GRID,
  payload: { ticketId, taskId, ticket },

});



export const close = () => ({
  type: CLOSE_SECOND_GRID,
});





export const updatetasks = (id, taskData,projectId) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/tasks/Updatetasks/${id}`, taskData);
    dispatch({
      type: UPDATE_TASKS_SUCCESS,
      payload: response.data,
    });
    toast.success("Your Project settings have been saved")
    dispatch(getAllFeatures(projectId));

   
  } catch (error) {
    dispatch({
      type: FAIL_TASKS,
      payload: error.response.data.message, 
    });
  }
}


export const deletetasks = (taskId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });
try {
    await axios.delete(`http://localhost:8000/api/tasks/deletetasks/${taskId}`);
    dispatch({ type: DELETE_TASKS_SUCCESS, payload: taskId });
    // dispatch(getprojectbyid(taskId));
  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.response.data });
  }
};


export const moveTicket = (ticketIds, sourceTaskId, destinationTaskId) => async (dispatch) => {
  dispatch({ type: LOAD_TASKS });

  try {
    const response = await axios.put('http://localhost:8000/api/tasks/move-ticket', {
      ticketIds,
      sourceTaskId,
      destinationTaskId,
    });
    dispatch({ type: MOVE_TICKET_SUCCESS, payload: response.data });
    dispatch({ type: DELETE_TASK_SUCCESS, payload: sourceTaskId });

  } catch (error) {
    dispatch({ type: FAIL_TASKS, payload: error.message });
  }
};





  

  
