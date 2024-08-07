import React from 'react'
import image2 from "../../../assets/images/mails-non-lus.png";
import image3 from '../../../assets/images/lettre.png';
import { Tooltip,IconButton } from '@mui/material';

const ReadNotification = ({notification,handleMarkAsRead}) => {
    
  return (
    <Tooltip title={notification.read ? "Read" : "Mark as read"}>
    <IconButton
      onClick={() => !notification.read && handleMarkAsRead(notification._id)}
      style={{ marginBottom: "7px", position: "absolute", top: 0, right: 0, marginLeft: "10px" }}
    >
      <img
        src={notification.read ? image3 : image2}
        style={{ marginLeft: "10px", width: notification.read ? "20px" : "25px" }}
        alt="Read icon"
      />
    </IconButton>
  </Tooltip>
  )
}

export default ReadNotification