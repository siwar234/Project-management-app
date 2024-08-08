import axios from 'axios';
import {
  CREATE_COMMUNICATION_SPACE,
  CREATE_COMMUNICATION_SPACE_SUCCESS,
  CREATE_COMMUNICATION_SPACE_FAIL,
  GET_COMMUNICATION_SPACES_BY_PROJECT_ID,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_BY_TASKID_SUCCESS,
  GET_POSTS_BY_TASKID_FAIL,
  CREATE_COMMENT,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL

} from '../actionTypes/communicationSpace'
import { toast } from 'react-toastify';
import { url } from "../../ConnectionString"

export const createCommunicationSpace = (task, disscusionspace, privacy,projectId) => async (dispatch) => {
  dispatch({ type: CREATE_COMMUNICATION_SPACE });
  try {
    
    const body = { Task: task, Disscusionspace: disscusionspace, Privacy: privacy,projectId:projectId };
    const res = await axios.post(`${url}/communicationspace/create`, body);

    dispatch({ type: CREATE_COMMUNICATION_SPACE_SUCCESS, payload: res.data });

    toast.success("your disscusion space  is created ")


  } catch (error) {
    dispatch({ type: CREATE_COMMUNICATION_SPACE_FAIL, payload: error.response.data });
    toast.error("Error creating communication space ")

  }
};




export const getCommunicationSpacesByProjectId = (projectId) => async (dispatch) => {
    try {
      const res = await axios.get(`${url}/communicationspace/project/${projectId}`);
      dispatch({
        type: GET_COMMUNICATION_SPACES_BY_PROJECT_ID,
        payload: res.data,
      });
    } catch (error) {
      console.error('Error retrieving communication spaces:', error);
      // Handle the error appropriately
    }
  };


  //posts

  export const createPost = (taskId, posterId, postText, images, pdf) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('taskId', taskId);
      formData.append('posterId', posterId);
      formData.append('postText', postText);
  
      if (pdf) {
        formData.append('pdf', pdf);
      }
  
      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }
  
      const res = await axios.post(`${url}/communicationspace/posts/create`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      dispatch({ type: CREATE_POST_SUCCESS, payload: res.data });
      dispatch(getPostsByTaskId(taskId));
      toast.success("Post created successfully");
  
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data : 'Network error';
      dispatch({ type: CREATE_POST_FAIL, payload: errorMessage });
      toast.error("Error creating post");
    }
  };
  


  export const deletePost = (postId, taskId) => async (dispatch) => {
  
    try {
      await axios.delete(`${url}/communicationspace/posts/${postId}`);
  
      dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
      dispatch(getPostsByTaskId(taskId));
      toast.success("Post deleted successfully");
  
    } catch (error) {
      dispatch({ type: DELETE_POST_FAIL, payload: error.response.data });
      toast.error("Error deleting post");
    }
  };


  export const getPostsByTaskId = (taskId) => async (dispatch) => {
    dispatch({ type: CREATE_COMMUNICATION_SPACE });

    try {
      const res = await axios.get(`${url}/communicationspace/posts/byTaskId/${taskId}`);
      dispatch({ type: GET_POSTS_BY_TASKID_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_POSTS_BY_TASKID_FAIL, payload: error.response.data });
    }
  };


  export const createComment = (postId, commenterId, commentText) => async (dispatch) => {
    try {
      const res = await axios.post(`${url}/communicationspace/comments/create`, { postId, commenterId, commentText });
      dispatch({ type: CREATE_COMMENT, payload: res.data });
      toast.success("comment  is created ")

      dispatch(getPostsByTaskId(res.data.taskId))
    } catch (error) {
      // console.error('Error creating comment:', error);
      toast.error("Error creating comment ")

    }
  };
  

  export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
      const res = await axios.delete(`${url}/communicationspace/comments/${postId}/${commentId}`);
      toast.success("comment  is deleted ")

      dispatch(getPostsByTaskId(res.data.taskId))

    } catch (error) {
      // console.error('Error deleting comment:', error);
      toast.error("Error deleting comment ")

    }
  };