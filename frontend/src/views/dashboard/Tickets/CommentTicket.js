import React, { useState,useEffect } from 'react';
import { Grid, Box, Button, IconButton, Tooltip, Chip, TextField, Avatar, Typography } from '@mui/material';import {  deleteCommentFromTicket, getListTicketsByproject, updateComment } from 'src/JS/actions/Tickets';
import { useDispatch,useSelector } from 'react-redux';
import { getTasks } from 'src/JS/actions/tasks';

const CommentTicket = ({index,ticketId,user,comment,projectId}) => {
    const [editingComment, setEditingComment] = useState({ ticketId: null, commentId: null });
    const [updatedComments, setUpdatedComments] = useState({});
    const dispatch = useDispatch();

    function formatupdatedat(updatedAt) {
        const now = new Date();
        const createdDate = new Date(updatedAt);
        const diff = Math.abs(now - createdDate);
        const minutes = Math.floor(diff / 60000); // 60000 milliseconds = 1 minute
        const hours = Math.floor(minutes / 60); // Convert minutes to hours
      
        if (minutes < 60) {
          return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
          return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
          const days = Math.floor(hours / 24);
          return `${days} day${days === 1 ? '' : 's'} ago`;
        }
      }

      function formatCreatedAt(createdAt) {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diff = Math.abs(now - createdDate);
        const minutes = Math.floor(diff / 60000); 
        const hours = Math.floor(minutes / 60);
      
        if (minutes < 60) {
          return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
          return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
          const days = Math.floor(hours / 24);
          return `${days} day${days === 1 ? '' : 's'} ago`;
        }
      }
     
  //update comment

  const handleEditButtonClick = (ticketId, commentId) => {
    setEditingComment({ ticketId, commentId });
  };
  
  const handleTextFieldChange = (event, commentId) => {
    const { value } = event.target;
    
    setUpdatedComments((prevUpdatedComments) => ({
      ...prevUpdatedComments,
      [commentId]: value,
    }));
  };
  
  const handleTextFieldKeyDown = (event, ticketId, commentId) => {
    if (event.key === 'Enter') {
      const commenterId = user?._id;
      const updatedCommentText = updatedComments[commentId];
      dispatch(updateComment(ticketId, commentId, commenterId, updatedCommentText));
      dispatch(getTasks(projectId))

      dispatch(getListTicketsByproject(projectId));

      setEditingComment(null);
    }
  };

  
  //deletecomment
  const handleDeleteComment = (ticketId,commentId) => {
    const commenterId=user?._id
 
    dispatch(deleteCommentFromTicket(ticketId,commentId, commenterId));
    dispatch(getTasks(projectId))
    dispatch(getListTicketsByproject(projectId));

  };

  
  
  

  return (
    
      <div key={index}>  
        <Box style={{ display:"flex", flexDirection:"row" ,marginTop:"13px"}}>
          <Avatar
            src={comment?.commenterId?.profilePicture}
            sx={{
              bgcolor: '#42a5f5',
              width: '30px',
              height: '30px',
              fontSize: '13px',
              alignItems: 'center',
              marginBottom:"20px",
              marginLeft: '10px',
              marginRight: '10px',
              marginTop:"5px"
            }}
          >
            {comment?.commenterId?.firstName && comment?.commenterId?.firstName.substring(0, 2).toUpperCase()}
          </Avatar>
          <Box style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" style={{ marginTop: '5px', color: "#515d70", fontWeight: "500", fontFamily: "inherit" }}>
  {comment?.commenterId?.firstName}
  <span style={{ marginLeft: "8px", color: "gray" }}>
    {comment?.updatedAt !== comment?.createdAt ? (
      <>
         {formatupdatedat(comment?.updatedAt)}
        {comment?.createdAt !== comment?.updatedAt && <span style={{ marginLeft: "10px",color:"#a3a3a3" }}>Edited</span>}
      </>
    ) : (
      formatCreatedAt(comment?.createdAt)
    )}
  </span>
</Typography>


<Typography variant="body1" style={{ marginTop: '4px' }}>
  {editingComment?.ticketId === ticketId && editingComment?.commentId === comment?._id ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        value={updatedComments[comment?._id] } 
        onChange={(event) => handleTextFieldChange(event, comment?._id)}
        onKeyDown={(event) => handleTextFieldKeyDown(event, ticketId, comment?._id)} 
        style={{ width: '80%', minHeight: '30px' }}
        variant="standard"          
      /> 
      <button
        onClick={() => setEditingComment(ticketId,comment?._id)} 
        className="hover-underline" 
        style={{ 
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          marginRight: '10px',
          padding: '0',
          color: '#515d70',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontWeight: '500',
        }}
      >
        Cancel
      </button>
    </div>
  ) : (
    comment.comment
  )}
</Typography>


<div style={{ display: 'flex', marginTop: '8px' }}>
  <button
    onClick={() => handleEditButtonClick(ticketId, comment?._id)} 
    className="hover-underline" 
    style={{ 
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      marginRight: '10px',
      padding: '0',
      color: '#515d70',
      fontSize: 'inherit',
      fontFamily:"inherit",
      fontWeight:"500",
    }}
  >
    Update
  </button>
              <button 
  onClick={() => handleDeleteComment(ticketId,comment?._id,)}
  className="hover-underline" style={{ 
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '0',
                color: '#515d70',
                fontSize: 'inherit',
                fontFamily:"inherit",
                fontWeight:"500",
              }}>
                Delete
              </button>
            </div>
          </Box>
        </Box>
      </div>
    
  )
}

export default CommentTicket