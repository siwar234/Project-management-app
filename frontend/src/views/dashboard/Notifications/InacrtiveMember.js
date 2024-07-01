import React from 'react'
import { IconButton, MenuItem,Typography,Box, Avatar, Tooltip, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { MdFaceRetouchingOff } from "react-icons/md";

export const InacrtiveMember = ({notification,image2,image3,handleMarkAsRead}) => {
    const renderResponsibleTickets = () => {
        return notification.data.ticketsToDo.map((ticket, index) => (

          <Typography key={index} variant="body2" color="textSecondary">
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: "row",overflow:"auto",maxHeight:"50px" }}>
            <Avatar alt={ticket.ResponsibleTicket?.firstName} src={ticket.ResponsibleTicket?.profilePicture} style={{width:"28px",height:"28px"}} />

              <span style={{ marginLeft: 8, fontSize: "13px", marginTop: "5px", }}>

               {ticket.ResponsibleTicket?.firstName}
                
              </span>
            </div>
          </Typography>
        ));
      };

  return (
<>

    {notification.data && notification.type === 'inactiveMember' && (
        <MenuItem style={{marginTop:"15px"}} >
{/* <Avatar alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} /> */}
       <Box ml={1}>

       <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
        textAlign: 'center', 
        position: 'relative'  }}>
        <MdFaceRetouchingOff style={{ fontSize: '30px', marginRight: '5px' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', marginRight: '5px' }}>
          these members are inactive in 
          <span style={{ marginLeft: '5px' }}>
            {notification.data.task.TaskName}
          </span>
          <span 
            style={{ color: 'gray', marginLeft: '10px', fontWeight: 'lighter', marginRight: '18px' }}
          >  
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </span>
          
        </Typography>
       
      </Typography>
       <Tooltip title={notification.read ? 'Read' : 'Mark as read'}>
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
               
      <span style={{ marginLeft: 8, fontSize: "13px",marginTop:"4px" ,}}>
    deadline   {formatDistanceToNow(new Date(notification.data.task.EndDate), { addSuffix: true })}

</span>
          <div style={{ display: 'flex', alignItems: 'center',flexDirection:"row",marginTop:"4px"}}>
            
          <span style={{ marginLeft: 8, fontSize: "13px",marginTop:"5px" }}>
            
            {renderResponsibleTickets()}

          
         
</span>
             
           </div>
         </Typography>
       </Box>
     </MenuItem>)} 
       
     </>
  )
}
