import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Badge, Menu, MenuItem,Typography,Box, Avatar, Tooltip } from '@mui/material';
import { IconBellRinging } from '@tabler/icons';
// import io from 'socket.io-client';
import { getNotifications, addNewNotification, readnotifications } from '../../../JS/actions/notifications';
import { formatDistanceToNow } from 'date-fns';
import image2 from "../../../assets/images/mails-non-lus.png"
import image5 from '../../../assets/images/icons/projection.png';
import image3 from '../../../assets/images/lettre.png';
import image from '../../../assets/images/checking.webp';
import image1 from '../../../assets/images/bugging.png';
import io from 'socket.io-client';
import ApprochingDeadlinenotification from './ApprochingDeadlinenotification';
import { OverdueNotification } from './OverdueNotification';
const socket = io('http://localhost:4100'); // Adjust URL based on your backend configuration
const Notifications = ({ userId }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notificationReducer.notifications);


  const error = useSelector((state) => state.notificationReducer.error);

  const [anchorEl, setAnchorEl] = useState(null);


 
  useEffect(() => {
    dispatch(getNotifications(userId));

    socket.on('messages', (notificationData) => {
      console.log('New message received:', notificationData);
      dispatch(addNewNotification(notificationData)); 

    });

    return () => {
      socket.off('messages');
    };
  }, [dispatch, userId]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(readnotifications(notificationId));
    // console.log("Notification ID to mark as read:", notificationId); 

  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <IconButton size="large" aria-label="show 11 new notifications" color="#f8f8f8" onClick={handleClick}>
      <Badge variant="dot" color="primary">
        <IconBellRinging size="21" stroke="1.5" />
      </Badge>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    //   sx={{
    //     width:"1050px",
    //     height:"100%",
    //   }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
       <Box p={2}>
        <Typography variant="h6">Notifications</Typography>
      </Box>
      {error && <MenuItem>{error}</MenuItem>}
      {notifications.length === 0 ? (
       <MenuItem onClick={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,width:"350px",height:"300px",flexDirection:"column"}}>
       <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-notification-4790933-3989286.png" alt="No notifications" style={{ width: '100px', height: 'auto' }} />
       <Box textAlign="center">
              <Typography variant="h9">You have no notifications</Typography>
              <span style={{ display: 'block' }}>for the last 30 days.</span>
            </Box>

     </MenuItem>
     
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" style={{ marginLeft: "15px" }}>
            <Typography style={{ color: "#636161", fontWeight: "bold" }}>The most recent</Typography>
            <Typography style={{ marginRight: "12px", fontWeight: "bold" }}>
              <span style={{ textDecoration: "none", cursor: "pointer" }}>
                <span
                  style={{
                    color: "#494949",
                    transition: "text-decoration 0.2s ease-in-out"
                  }}
                  onMouseEnter={(e) => { e.target.style.textDecoration = "underline"; }}
                  onMouseLeave={(e) => { e.target.style.textDecoration = "none"; }}
                //   onClick={handleMarkAllAsRead}
                >
                  Mark everything as read
                </span>
              </span>
            </Typography>
          </Box>
        
          {notifications.map((notification) => (
            
          <React.Fragment key={notification?._id}>
                  

            {notification.data && notification.type === 'projectnotification' &&  (
           <MenuItem  style={{marginTop:"15px"}}> 
                <Avatar alt={notification.data.User?.firstName} src={notification.data.User?.profilePicture} />
                <Box ml={2}>
             <Typography variant="body1" style={{ fontWeight: "bold" }}> 
                {notification.data.User?.firstName} has assigned you as the responsible for this project 
                <span style={{ color: "gray", marginLeft: "10px", fontWeight: "lighter",marginRight:"20px" }}>
                 {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
               </span> 
              <Tooltip title={notification.read ? "read" : "Mark as read"}>
                 <IconButton
                   onClick={() => !notification.read && handleMarkAsRead(notification._id)}
                   style={{ position: "absolute", top: -3, right: 0,marginLeft:"20px" } }
                 >
                   <img
                     src={notification.read ? image3 : image2}
                     style={{ width:notification.read ?  "20px" :"25px"}}
                     alt="img"
                   />
                 </IconButton>
               </Tooltip> 
             </Typography>
             <Typography variant="body2" color="textSecondary">
               <div style={{ display: 'flex', alignItems: 'center', flexDirection: "row" }}>
                 <img src={notification.data?._id?.Icon || image5} style={{ width: "18px", height: "18px" }} alt='imgnotification' />
                 <span style={{ marginLeft: 8, fontSize: "13px" }}>{notification.data?.projectName}</span>
               </div>
             </Typography>
           </Box>
         </MenuItem>
         
            )}  
            {notification.data && notification.type === 'ticketnotification' && (
              <MenuItem style={{marginTop:"15px"}}>
  <Avatar alt={notification.data.ticket?.User?.firstName} src={notification.data.ticket?.User?.profilePicture} />
             <Box ml={2}>
               <Typography variant="body1" style={{fontWeight:"bold",marginRight:"5px"}} >
               {notification.data.ticket?.User?.firstName} <span>
                    has assigned you as the responsible  for this ticket</span> 
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
                 {/* <img src={notification.data.ticket?.Type} style={{ display: 'flex', alignItems: 'center' ,width:"18px",height:"18px"}}  alt='imgnotification'>
                   </img>  */}
                   <img
                                          src={notification.data.ticket.Type === 'Bug' ? image1 : image}
                                          alt="icon"
                                          style={{ display: 'flex', alignItems: 'center' ,width:"18px",height:"18px"}}
                                        />
                     <span style={{ marginLeft: 8,fontSize:"13px" }}>{notification.data.ticket?.Description}</span>
                   
                 </div>
               </Typography>
             </Box>
           </MenuItem>)} 

           {notification.data && notification.type === 'feedbacknotification' && (
              <MenuItem style={{marginTop:"15px"}}>
  <Avatar alt={notification.data.newComment?.commenterId?.firstName} src={notification.data.newComment?.commenterId?.profilePicture} />
             <Box ml={2}>
               <Typography variant="body1" style={{fontWeight:"bold",marginRight:"5px"}} >
               {notification.data.newComment?.commenterId?.firstName}
                               <span style={{marginLeft:"5px"}} >
                   send this feedback on  {notification.data.ticketcomment?.Description}</span> 
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
                
                     <span style={{ marginLeft: 8,fontSize:"13px" }}>{notification.data.newComment?.comment}</span>
                   
                 </div>
               </Typography>
             </Box>
           </MenuItem>)} 

           <OverdueNotification notification={notification} image2={image2} image3={image3} handleMarkAsRead={handleMarkAsRead} />
             <ApprochingDeadlinenotification notification={notification} image2={image2} image3={image3} handleMarkAsRead={handleMarkAsRead}  />
            </React.Fragment>
          ))} 
        </>
      )} 
        {notifications.length > 0 && (
         <Box onClick={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "350px", height: "300px", flexDirection: "column",marginLeft:"100px" }}>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-notification-4790933-3989286.png" alt="No notifications" style={{ width: '100px', height: 'auto' }} />
          <Box textAlign="center">
            <Typography variant="h9">You have no other notifications</Typography>
            <span style={{ display: 'block' }}>for the last 30 days.</span>
          </Box>
      </Box>)} 
       {/* {notifications.map((notification, index) => (
          <MenuItem key={index}>{notification.data.projectName}</MenuItem>
        ))} */}
      </Menu>
    </div>
  );
};


export default Notifications;
