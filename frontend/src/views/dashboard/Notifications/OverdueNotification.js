import React from 'react'
import {  MenuItem,Typography,Box, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import ReadNotification from './ReadNotification';

export const OverdueNotification = ({notification,image2,image3,handleMarkAsRead,userId}) => {


  return (
<>

    {notification.data && notification.type === 'overdueTask' &&   userId===notification.responsible_user && (
        <MenuItem style={{marginTop:"15px"}} >
{/* <Avatar alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} /> */}
       <Box ml={1}>
         <Typography variant="body1" style={{fontWeight:"bold",marginRight:"5px"}} >
                         <span style={{marginLeft:"5px"}} >
  {notification.data.TaskName} is overdue in  {notification.data.projectId.projectName}
</span>
              <span 
              style={{color:"gray",marginLeft:"10px",fontWeight:"lighter",marginRight:"18px"}}>  
               {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</span> 
               <ReadNotification notification={notification} handleMarkAsRead={handleMarkAsRead}>
      
      </ReadNotification>
         </Typography>
         <Typography variant="body2" color="textSecondary">
          <div style={{ display: 'flex', alignItems: 'center',flexDirection:"row"}}>
            
          <span style={{ marginLeft: 8, fontSize: "13px",marginTop:"5px" }}>
            incompleted tickets. 
            
             <Chip label={notification.data.tickets.length} style={{ width: "35px", height: "15px", marginLeft: '20px', justifyContent: 'center', alignContent: "center" }} >
          </Chip>
          
         
</span>
             
           </div>
         </Typography>
       </Box>
     </MenuItem>)} 
       
     </>
  )
}
