import React from 'react'
import { IconButton, MenuItem,Typography,Box, Avatar, Tooltip, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { FcAlarmClock } from "react-icons/fc";

const ApprochingDeadlinenotification = ({notification,image2,image3,handleMarkAsRead}) => {
  return (
<>

{notification.data && notification.type === 'approachingDeadline' && (
    <MenuItem style={{marginTop:"15px"}} >
{/* <Avatar alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} /> */}
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
      <FcAlarmClock style={{ fontSize: '30px', marginRight: '5px' }} />
      <span style={{ marginLeft: '5px' }}>
        <span>
          Deadline of <strong>{notification.data.TaskName}</strong> in{' '}
          <strong>{notification.data.projectId.projectName}</strong> is approaching
        </span>
        <span style={{ color: 'gray', marginLeft: '10px', fontWeight: 'lighter', marginRight: '18px' }}>
          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
        </span>
       
      </span>
    </Typography> <Tooltip title={notification.read ? 'Read' : 'Mark as read'}>
          <IconButton
            onClick={() => !notification.read && handleMarkAsRead(notification._id)}
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            <img
              src={notification.read ? image3 : image2}
              style={{ marginLeft: '10px', width: notification.read ? '20px' : '25px' }}
              alt="img"
            />
          </IconButton>
        </Tooltip>
     <Typography variant="body2" color="textSecondary">
      <div style={{ display: 'flex', alignItems: 'center',flexDirection:"row"}}>
        
      <span style={{ marginLeft: 8, fontSize: "13px",marginTop:"5px" }}>
      {formatDistanceToNow(new Date(notification.data.EndDate), { addSuffix: true })}

</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center',flexDirection:"row"}}>
            
            <span style={{ marginLeft: 8, fontSize: "14px",marginTop:"5px",color:'#5d87ff' }}>
              inactive ( To Do) tickets.
              
               <Chip label={notification.data.tickets.filter(ticket => ticket.Etat === 'TO DO').length} style={{ width: "35px", height: "15px", marginLeft: '10px', justifyContent: 'center', alignContent: "center" }} >
            </Chip>
            
           
  </span>
               
             </div>
     </Typography>
   </Box>
 </MenuItem>)} 
   
 </>  )
}

export default ApprochingDeadlinenotification