import React from 'react'
import { MenuItem,Typography,Box, Avatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import ReadNotification from './ReadNotification';


const FeebackNotifications = ({notification,image2,image3,handleMarkAsRead,userId}) => {
  return (
<>

{notification.data && notification.type === 'feedbacknotification' && userId===notification.responsible_user && (
    <MenuItem style={{marginTop:"15px"}} >
<Avatar
  sx={{
    bgcolor: '#42a5f5',
    width: 40,
    height: 40,
    fontSize:'13px'
  }}
 alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} >{notification.data.newComment?.commenterId?.firstName.substring(0, 2).toUpperCase()}</Avatar>
   <Box ml={1}>
   <Typography
      variant="body1"
      style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        marginRight: '5px',
        justifyContent: 'center', 
        textAlign: 'center', 
        position: 'relative' 
      }}
    >
{notification.data.newComment?.commenterId?.firstName}    has commented this ticket   : {notification.data.ticketcomment?.Description}

                    
                        <span style={{ color: "gray", marginLeft: "10px", fontWeight: "lighter", marginRight: "20px" }}>
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>   </Typography>
                        <ReadNotification notification={notification} handleMarkAsRead={handleMarkAsRead}>
      
      </ReadNotification>
                  
                     
   </Box>
 </MenuItem>)} 
   
 </>  )
}

export default FeebackNotifications