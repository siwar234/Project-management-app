import React, { useState, useEffect } from 'react';
import { Typography, IconButton, TextField } from '@mui/material';
import { GrClose, GrCheckmark } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { updateEquipe } from 'src/JS/actions/equipe';

export const EquipeUpdate = ({ equipeId }) => {
  const dispatch = useDispatch();
  const equipeDescription = useSelector((state) => state.equipeReducer.equipe?.description);
  console.log('equipeDescription')
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(equipeDescription || 'Heyyy what does your team do again ?');
  const [newTextValue, setNewTextValue] = useState('');

  

  useEffect(() => {
    setTextValue(equipeDescription || 'Heyyy what does your team do again ?');
  }, [equipeDescription]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setNewTextValue(textValue);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await dispatch(updateEquipe(equipeId, { description: newTextValue }));
      setTextValue(newTextValue); 
    } catch (error) {
      console.error('Failed to update description:', error);
      
    }
  };

  return (
    <>
      {!isEditing ? (
        <Typography
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleEdit}
          justifyContent={'center'}
          marginLeft="18px"
          color={isHovered ? 'gray' : 'black'}
          fontWeight={'400'}
          mb={1}
          sx={{
            cursor: 'pointer',
            backgroundColor: isHovered ? '#f3f3f3' : 'transparent',
            borderRadius: '5px',
            padding: '5px',
          }}
        >
          {textValue}
        </Typography>
      ) : (
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <TextField
            placeholder='Heyyy what does your team do again ?'
            value={newTextValue}
            onChange={(e) => setNewTextValue(e.target.value)}
            fullWidth
            multiline
            rows={3}
            style={{ width: '250px', fontSize:"18px", marginBottom: '10px',marginLeft:"20px",borderColor:'gray' }}
            InputProps={{
                style: { fontSize: "12px", height:"55px", } 
              }}
          />
          <div style={{ position: 'absolute', bottom: '-35px', left: '210px', display: 'flex' }}>
            <IconButton style={{ width: '28px', height: '28px', marginRight: '3px', backgroundColor: 'rgb(107 106 106)', borderRadius: '0' }} onClick={handleCancel}>
              <GrClose style={{ color: "white" }} />
            </IconButton>
            <IconButton style={{ width: '28px', height: '28px', backgroundColor: 'rgb(107 106 106)', borderRadius: '0' }} onClick={handleSave}>
              <GrCheckmark style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};
