import React from 'react'
import {  MenuItem,Typography,Box } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { FcLink } from 'react-icons/fc';
import ReadNotification from './ReadNotification';

export const RelatedTasksnotification = ({notification,image2,image3,handleMarkAsRead,userId}) => {


  return (
<>

    {notification.data && notification.type === 'relatedTasksNotification' &&   userId===notification.responsible_user && (
        <MenuItem style={{marginTop:"15px"}} >
       <Box ml={2}>
      
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
      <FcLink style={{ fontSize: '30px', marginRight: '5px' }} />                         <span style={{marginLeft:"5px"}} >
  {notification.data.task.TaskName} is related to   {notification.data.task.related.TaskName}
</span>
              <span 
              style={{color:"gray",marginLeft:"10px",fontWeight:"lighter",marginRight:"18px"}}>  
               {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</span> 
            
         </Typography> 
         
         <ReadNotification notification={notification} handleMarkAsRead={handleMarkAsRead}>
      
      </ReadNotification>
        
       </Box>
     </MenuItem>)} 
       
     </>
  )
}
