import React from 'react'
import { IconButton, MenuItem,Typography,Box, Avatar, Tooltip, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const ApprochingDeadlinenotification = ({notification,image2,image3,handleMarkAsRead}) => {
  return (
<>

{notification.data && notification.type === 'approachingDeadline' && (
    <MenuItem style={{marginTop:"15px"}} >
{/* <Avatar alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} /> */}
   <Box ml={2}>
     <Typography variant="body1" style={{fontWeight:"bold",marginRight:"5px"}} >
                     <span style={{marginLeft:"5px"}} >
                    <span>  deadline of  </span>
{notification.data.TaskName} in  {notification.data.projectId.projectName} is approaching 
</span>
          <span 
          style={{color:"gray",marginLeft:"10px",fontWeight:"lighter",marginRight:"18px"}}>  
           {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</span> 
          <Tooltip title={notification.read ? "read" : "Mark as read"}>
              <IconButton  
              
              onClick={() => !notification.read && handleMarkAsRead(notification._id)}
              style={{marginBottom:"7px",position: "absolute", top: 0, right: 0,marginLeft:"10px"}} >
            <img 
src={notification.read ? image3 : image2} 
style={{ marginLeft: "10px", width:notification.read ?  "20px" :"25px" }} 
alt="img" 
/>
</IconButton></Tooltip>
     </Typography>
     <Typography variant="body2" color="textSecondary">
      <div style={{ display: 'flex', alignItems: 'center',flexDirection:"row"}}>
        
      <span style={{ marginLeft: 8, fontSize: "13px",marginTop:"5px" }}>
      {formatDistanceToNow(new Date(notification.data.EndDate), { addSuffix: true })}

</span>
       </div>
     </Typography>
   </Box>
 </MenuItem>)} 
   
 </>  )
}

export default ApprochingDeadlinenotification