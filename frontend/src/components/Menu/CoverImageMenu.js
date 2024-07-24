import React, { useState } from 'react';
import { Box, Typography, Button, Menu, Grid, Tooltip } from '@mui/material';
import image from "../../assets/images/fullsize.png";
import image1 from "../../assets/images/halfsize.png";
import { getListTicketsByproject, updatetickets } from 'src/JS/actions/Tickets';
import { useDispatch } from 'react-redux';

const CoverImageMenu = ({ anchorEl, isOpen, onClose, projectId, user, ticketId,selectedColor,setSelectedColor }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const colors = ['#acffb6', '#fae792', '#FF6B6B', '#ffcaca', '#dca3ff42', '#4D96FF', '#a2c3f387', '#34d39975', '#dba0b485', '#7f7f7f4f',"#fff"];
  const dispatch = useDispatch();

  const handleUpdateCoverImage = () => {
    if (!selectedSize || !selectedColor) return; 

    const data = {
      CoverImage: [{
        size: selectedSize,
        colorimage: selectedColor
      }]
    };

    dispatch(updatetickets(projectId, user._id, ticketId, data))
      .then(() => {
        dispatch(getListTicketsByproject(projectId))
        console.log('Ticket cover image updated successfully');
        onClose(); 
      })
      .catch((error) => {
        console.error('Error updating ticket cover image:', error);
      });
  };

   // Function to handle size selection
   const handleSizeClick = (size) => {
    setSelectedSize(size); 
  };


  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose} sx={{ '& .MuiPaper-root': { width: '330px', padding: 2 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Size</Typography>
        <Box
  onClick={() => handleSizeClick('Full')}
  sx={{
    width: 140,
    height: 70,
    cursor: 'pointer',
    border: selectedSize === 'Full' ? '3px solid #86dafa' : '2px solid transparent',
  }}
>
  <Tooltip title="Full size">
    <img src={image} alt='Full size' style={{ width: 135, height: 65 }} />
  </Tooltip>
</Box>
<Box
  onClick={() => handleSizeClick('small')}
  sx={{
    width: 140,
    height: 70,
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    border: selectedSize === 'small' ? '3px solid #86dafa' : '2px solid transparent',
  }}
>
  <Tooltip title="Half size">
    <img src={image1} alt='Half size' style={{ width: 135, height: 65 }} />
  </Tooltip>
</Box>

      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Couleurs</Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {colors.map((color) => (
            <Grid item xs={3} key={color}>
              <Box
                onClick={() => handleColorClick(color)}
                sx={{
                  width: 50,
                  height: 30,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: selectedColor === color ? '2px solid black' : '2px solid transparent',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Button fullWidth variant="outlined" onClick={handleUpdateCoverImage}>Change Cover Image</Button>
      </Box>
    </Menu>
  );
};

export default CoverImageMenu;
