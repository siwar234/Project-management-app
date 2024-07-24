import React, { useState, useEffect } from 'react';
import { Typography, Menu, MenuItem, Divider, IconButton, Avatar } from '@mui/material';
import image from "../../../assets/images/images.png";
import image1 from "../../../assets/images/female_woman_person_people_avatar_icon_159366.png";
import image2 from "../../../assets/images/147129.png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addVoteToTicket, deleteVoteFromTicket } from 'src/JS/actions/Tickets';
import { getTasks } from 'src/JS/actions/tasks';
import { useParams } from 'react-router';

const VoteModal = ({ anchorEl, handleMenuClose, ticketId ,taskId,isSecondGridOpen}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user._id;
   console.log("userid",userId)

   const hasVoted = isSecondGridOpen[taskId][ticketId].votes.some(voter => voter._id === userId);
   console.log("hasvoted",hasVoted);
   console.log("voted",isSecondGridOpen[taskId][ticketId].votes);
   const { projectId } = useParams();

  const handleVote = () => {
    const voterId = userId;
    dispatch(addVoteToTicket(ticketId, voterId));
    dispatch(getTasks(projectId));

    handleMenuClose();
  };

  const handleDeleteVote = () => {
    dispatch(deleteVoteFromTicket(ticketId, userId)); 
    dispatch(getTasks(projectId));

    handleMenuClose();
  };


  return (
    <>
      <Menu
        id="vote-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={hasVoted ? handleDeleteVote : handleVote}>
  <IconButton style={{ color: '#42526E' }}>
    {hasVoted ? <DeleteIcon /> : <ThumbUpOffAltIcon style={{ color: "#5d87ff" }} />}
  </IconButton>
  <span style={{ marginLeft: "8px" }}>{hasVoted ? 'Delete Ticket' : 'Vote for this ticket'}</span>
</MenuItem>
        <Divider />

        {isSecondGridOpen[taskId][ticketId].votes && isSecondGridOpen[taskId][ticketId].votes.length > 0 ? (
  isSecondGridOpen[taskId][ticketId].votes.map((voter) => (
    <MenuItem key={voter?._id}  style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'left', marginTop: "10px",overflow:"auto" }}>

    {/* <div key={voter?._id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}> */}
      <Avatar
        alt={voter?.firstName}
        src={voter?.profilePicture}
        justifyContent="left"
        style={{ marginRight: '10px', marginLeft: '10px', fontSize: "12px", backgroundColor: 'rgb(78 123 159)', width: "25px", height: "25px" }}
      >
        {voter?.firstName?.substring(0, 2).toUpperCase()}
      </Avatar>
      <span>{voter?.firstName}</span>
    </MenuItem>
  ))
) : (
  <MenuItem style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "14px" }}>
    <img style={{ width: "35px", position: 'absolute', left: 'calc(50% - 40px)' }} src={image} alt="imageavatar" />
    <img style={{ width: "35px", position: 'absolute', left: 'calc(50% - 20px)' }} src={image1} alt="imageavatar" />
    <img style={{ width: "35px", position: 'absolute', left: 'calc(50% - 0px)' }} src={image2} alt="imageavatar" />
    <Typography variant="body1" style={{ marginTop: "45px" }}>No one has voted for this ticket</Typography>
  </MenuItem>
)}

      </Menu>
    </>
  );
};

export default VoteModal;
