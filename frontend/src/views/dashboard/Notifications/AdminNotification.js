import React from 'react'
import {  MenuItem,Typography,Box } from '@mui/material';
import ReadNotification from './ReadNotification';

const AdminNotification = ({notification,image2,image3,handleMarkAsRead,userId}) => {
  return (
<>

{notification.data && notification.type === 'failedAttemptnotification' && userId===notification.responsible_user && (
    <MenuItem style={{marginTop:"15px"}} >
   <Box ml={1}>
 user with email <span style={{marginRight:"5px", marginLeft:"5px", color:"#5d87ff", fontWeight:"bold"}}>{notification.data.email}</span> is banned due to <br></br>multiple failed password attempt 
 
 
 <ReadNotification notification={notification}></ReadNotification>

     <Typography variant="body2" color="textSecondary">
     
     </Typography>
   </Box>
 </MenuItem>)} 
   
 </>  )
}

export default AdminNotification