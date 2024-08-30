import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, TextField, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { updatetickets } from 'src/JS/actions/Tickets';

export default function StoryPoints({ projectId, userId, ticket }) {
  const [points, setPoints] = useState(ticket?.storyPoints || ''); 
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch(); 

  useEffect(() => {
    setPoints(ticket?.storyPoints || '');
  }, [ticket]);

  const handleChange = (event) => {
    setPoints(event.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleExitEditMode = async () => {
    if (points !== '') {
      try {
        // Ensure points is converted to a string for consistency
        const updatedPoints = String(points);

        await dispatch(updatetickets(projectId, userId, ticket?._id, { storyPoints: updatedPoints }));
      } catch (error) {
        console.error('Error updating story points:', error);
      }
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <Tooltip title="Story Points">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              color: '#949596',
              cursor: 'pointer',
              position: 'relative',
              fontSize: '13px',
              fontWeight: 'bold',
              marginRight: '25px',
              padding: '0 5px',
            }}
            onClick={toggleEditMode}
          >
            {ticket?.storyPoints || '0'}
          </Box>
        </Tooltip>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '65px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <TextField
            type="number"
            value={points}
            onChange={handleChange}
            inputProps={{ 
              min: 0, 
              style: { 
                textAlign: 'center',
                width: '100%',
                height: '30px',
                padding: '0',
                backgroundColor: 'white',
              } 
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '2px',
                  borderColor: '#477bdade',
                },
                '&:hover fieldset': {
                  borderColor: '#477bdade',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#477bdade',
                },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-29px', 
              left: 0,
              display: 'flex',
              gap: '1px', 
            }}
          >
            <Box
              style={{
                backgroundColor: 'white',
                marginTop: '10px',
                marginRight: '5px',
                opacity: 0.9, 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
                borderRadius: '4px', 
                padding: '4px',
                boxSizing: 'border-box',
              }}
            >
              <IconButton onClick={handleExitEditMode} size="small">
                <CheckIcon style={{ fontSize: '15px', color: '#474747', fontWeight: 'bold' }} />
              </IconButton>
            </Box>
            <Box
              style={{
                backgroundColor: 'white',
                marginTop: '10px',
                opacity: 0.9,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
                borderRadius: '4px', 
                padding: '4px',
                boxSizing: 'border-box',
              }}
            >
              <IconButton onClick={handleCancelEdit} size="small">
                <CloseIcon style={{ fontSize: '15px', color: '#474747', fontWeight: 'bold' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
