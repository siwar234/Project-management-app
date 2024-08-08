import React from 'react';
import { Box, Typography, Button, Menu } from '@mui/material';

const UpdateImage = ({ ticket,setMenuAnchor,menuAnchor,handleDeleteImage ,handleCloseMenu}) => {
  



  return (
    <div>
     


     <Menu
  anchorEl={menuAnchor}
  open={Boolean(menuAnchor)}
  onClose={handleCloseMenu}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',

  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  sx={{borderRadius:"10px" }} 
>
  <Box p={2} display="flex" flexDirection="column" alignItems="stretch">
    <Typography variant="subtitle1" style={{ marginBottom: '15px',justifyContent:"center",color:"#44546f",fontWeight:"bold" }}>
    Delete attachment?    </Typography>
    <Typography variant="subtitle1" style={{ marginBottom: '15px',justifyContent:"center",color:"black", }}>
    Deleting an attachment is final.<br></br>
     Operation is irreversible.
    </Typography>
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained"  fullWidth color='primary' justifyContent='center'  onClick={() => handleDeleteImage(ticket?._id)} >
Delete       </Button>
    </Box>
  </Box>
</Menu>


    </div>
  );
};

export default UpdateImage;
