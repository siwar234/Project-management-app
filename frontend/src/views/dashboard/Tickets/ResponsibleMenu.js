import React, { useState } from 'react';
import { MenuItem, Menu, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTasks } from 'src/JS/actions/tasks';
import {  updatetickets } from 'src/JS/actions/Tickets';

export default function ResponsibleMenu({ MenuResponsible, handleclosedResponsible,responsible,Responsibleid,ResponsibleTicket,handleAssignResponsible }) {
  const projects = useSelector((state) => state.projectReducer.project);

  const equipes = projects?.Equipe;
  const owner = equipes?.owner;

  //  console.log('owner:', owner.firstName);

  // if (equipes) {
  //   equipes.members.forEach((member) => {
  //     console.log('Member ID:', member.memberId);
  //     console.log('Member First Name:', member.memberId.firstName);
  //   });
  // }

 
  const dispatch = useDispatch();

  
  const filteredMembers = equipes?.members?.filter(member => member.memberId?._id !== Responsibleid) || [];

  return (
    <Menu
      id="menu"
      open={Boolean(MenuResponsible)}
      onClose={handleclosedResponsible}
      anchorEl={MenuResponsible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      sx={{
        '& .MuiMenu-paper': {
          marginTop: '15px',
          width: '220px',
          height: '130px',
          overflow: 'auto',
        },
      }}
    >
  <MenuItem
  sx={{ display: 'flex', alignItems: 'left', marginTop: '10px', border: '2px solid #7caaff' }}
  onClick={() => handleAssignResponsible('')}
>
  <Avatar
          src={responsible?.profilePicture}

    sx={{
      
      bgcolor: '#42a5f5',
      width: 25,
      height: 25,
      fontSize: '13px',
      marginRight: '10px',
    }}
  >
    {ResponsibleTicket && ResponsibleTicket.substring(0, 2).toUpperCase()}
  </Avatar>
  {ResponsibleTicket || 'Not assigned'}
</MenuItem>

{ResponsibleTicket  && (
  <MenuItem
    sx={{ display: 'flex', alignItems: 'left', marginTop: '10px', '&:hover': {
      borderLeft: '2px solid #7caaff',
      backgroundColor:'rgb(231 236 251 / 85%)'

    } }}
    onClick={() => handleAssignResponsible(null)}
  >
    <Avatar
      sx={{
        bgcolor: '#42a5f5',
        width: 25,
        height: 25,
        fontSize: '13px',
        marginRight: '10px',
      }}
    ></Avatar>
    Not assigned
  </MenuItem>
)}

      {owner?._id !== Responsibleid && (
      <MenuItem
        value={owner?._id}
        sx={{ display: 'flex', alignItems: 'left', marginTop: '5px', '&:hover': {
          borderLeft: '2px solid #7caaff',
          backgroundColor:'rgb(231 236 251 / 85%)'

        } }}
        onClick={() => handleAssignResponsible(owner?._id)}
      >
        <Avatar
          src={owner?.profilePicture}
          sx={{
            bgcolor: '#42a5f5',
            width: 25,
            height: 25,
            fontSize: '13px',
            marginRight: '10px',
          }}
        >
          {owner?.firstName && owner?.firstName.substring(0, 2).toUpperCase()}
        </Avatar>
        <span>{owner?.firstName}</span>
      </MenuItem>
)}
      {filteredMembers?.map((member) => (
        <MenuItem
        sx={{ '&:hover': {
          borderLeft: '2px solid #7caaff',
          backgroundColor:'rgb(231 236 251 / 85%)'
        }}}
          key={member.memberId?._id}
          onClick={() => handleAssignResponsible(member.memberId?._id)}
        >
          <Avatar
            src={member.memberId?.profilePicture}
            sx={{
              bgcolor: '#42a5f5',
              width: 25,
              height: 25,
              fontSize: '13px',
              marginRight: '10px',
            }}
          >
            {member.memberId?.firstName && member.memberId?.firstName.substring(0, 2).toUpperCase()}
          </Avatar>
          {member.memberId.firstName}
        </MenuItem>
      ))}
    </Menu>
  );
}
