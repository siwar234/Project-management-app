import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Badge, Menu, MenuItem, Typography, Box, Avatar, Tooltip, Switch } from '@mui/material';
import { IconBellRinging } from '@tabler/icons';
import { getNotifications, addNewNotification, readnotifications, markAllNotificationsAsRead } from '../../../JS/actions/notifications';
import { formatDistanceToNow } from 'date-fns';
import image5 from '../../../assets/images/icons/projection.png';
import image from '../../../assets/images/checking.webp';
import image1 from '../../../assets/images/bugging.png';
import image2 from '../../../assets/images/storie.png';

import io from 'socket.io-client';
import { FcAdvertising } from "react-icons/fc";
import ApprochingDeadlinenotification from './ApprochingDeadlinenotification';
import { OverdueNotification } from './OverdueNotification';
import { RelatedTasksnotification } from './RelatedTasksnotification';
import { InacrtiveMember } from './InacrtiveMember';
import AdminNotification from './AdminNotification';
import FeebackNotifications from './FeebackNotifications';
import ReadNotification from './ReadNotification';
import { httpUrl } from "../../../ConnectionString"

const socket = io(`${httpUrl}`);

const Notifications = ({ userId }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notificationReducer.notifications);
  const error = useSelector((state) => state.notificationReducer.error);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    dispatch(getNotifications(userId));

    socket.on('messages', (notificationData) => {
      // console.log('New message received:', notificationData);
      dispatch(addNewNotification(notificationData));
    });

    return () => {
      socket.off('messages');
    };
  }, [dispatch, userId]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(readnotifications(notificationId));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check if all notifications are read
  const allNotificationsRead = notifications.every(notification => notification.read);

  // Read all notifications
  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead(userId));
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter(notification => !notification.read)
    : notifications;

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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box p={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <FcAdvertising style={{ fontSize: '25px', marginRight: '5px' }} />
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <Tooltip title="Show unread notifications">
            <Switch
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly(!showUnreadOnly)}
              name="showUnreadOnly"
              color="primary"
            />
          </Tooltip>
        </Box>
        {error && <MenuItem>{error}</MenuItem>}
        {filteredNotifications.length === 0 ? (
          <MenuItem onClick={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "350px", height: "300px", flexDirection: "column" }}>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-notification-4790933-3989286.png" alt="No notifications" style={{ width: '100px', height: 'auto' }} />
            <Box textAlign="center">
              <Typography variant="h9">You have no unread notifications</Typography>
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
                    onClick={handleMarkAllAsRead}
                    disabled={allNotificationsRead}
                    style={{
                      color: "#494949",
                      transition: "text-decoration 0.2s ease-in-out"
                    }}
                    onMouseEnter={(e) => { e.target.style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { e.target.style.textDecoration = "none"; }}
                  >
                    Mark everything as read
                  </span>
                </span>
              </Typography>
            </Box>
            {filteredNotifications.map((notification) => (
              <React.Fragment key={notification?._id}>
                {notification.data && notification.type === 'projectnotification' && userId===notification.responsible_user && (
                  <MenuItem style={{ marginTop: "15px" }}>
                    <Avatar
                    sx={{
                      bgcolor: '#42a5f5',
                      width: 40,
                      height: 40,
                      fontSize:'13px'
                    }}
                     alt={notification.data.User?.firstName} src={notification.data.User?.profilePicture} >
                    {notification.data.User?.firstName.substring(0, 2).toUpperCase()}</Avatar>

                    <Box ml={2}>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        {notification.data.User?.firstName} has assigned you as the responsible for this project
                        <span style={{ color: "gray", marginLeft: "10px", fontWeight: "lighter", marginRight: "20px" }}>
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                        <ReadNotification notification={notification} handleMarkAsRead={handleMarkAsRead}>
      
      </ReadNotification>                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                          <img src={notification.data?._id?.Icon || image5} style={{ width: "18px", height: "18px" }} alt='Project icon' />
                          <span style={{ marginLeft: 8, fontSize: "13px" }}>{notification.data?.projectName}</span>
                        </div>
                      </Typography>
                    </Box>
                  </MenuItem>
                )}
                {notification.data && notification.type === 'ticketnotification' && userId===notification.responsible_user &&(
                  <MenuItem style={{ marginTop: "15px" }}>
                    <Avatar 
                    sx={{
                      bgcolor: '#42a5f5',
                      width: 40,
                      height: 40,
                      fontSize:'13px'
                    }}
                    alt={notification.data.ticket?.User?.firstName} src={notification.data.ticket?.User?.profilePicture} >
                      {notification.data.ticket?.User?.firstName.substring(0, 2).toUpperCase()}</Avatar>
                    <Box ml={1}>
                      <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "5px" }}>
                        {notification.data.ticket?.User?.firstName} has assigned you as the responsible for this ticket
                        <span style={{ color: "gray", marginLeft: "10px", fontWeight: "lighter", marginRight: "18px" }}>
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                        <ReadNotification notification={notification} handleMarkAsRead={handleMarkAsRead}>
      
      </ReadNotification>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "row" }}>
                          <img
                            src={notification.data.ticket.Type === 'Bug' ? image1 : notification.data.ticket.Type=== 'story' ? image2 : image}
                            alt="Ticket icon"
                            style={{ display: 'flex', alignItems: 'center', width: "18px", height: "18px" }}
                          />
                          <span style={{ marginLeft: 8, fontSize: "13px" }}>{notification.data.ticket?.Description}</span>
                        </div>
                      </Typography>
                    </Box>
                  </MenuItem>
                )}

                <OverdueNotification notification={notification}  handleMarkAsRead={handleMarkAsRead} userId={userId} />
                <ApprochingDeadlinenotification notification={notification}  handleMarkAsRead={handleMarkAsRead}  userId={userId} />
                <RelatedTasksnotification notification={notification}  handleMarkAsRead={handleMarkAsRead}   userId={userId}/>
                <InacrtiveMember notification={notification}  handleMarkAsRead={handleMarkAsRead}  userId={userId} />
                <AdminNotification notification={notification}  handleMarkAsRead={handleMarkAsRead}  userId={userId} />
                < FeebackNotifications notification={notification}  handleMarkAsRead={handleMarkAsRead}  userId={userId} />

              </React.Fragment>
            ))}
            {!showUnreadOnly && notifications.length > 0 && (
              <Box onClick={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "350px", height: "300px", flexDirection: "column", marginLeft: showUnreadOnly ? "auto" : "120px" }}>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-notification-4790933-3989286.png" alt="No notifications" style={{ width: '100px', height: 'auto' }} />
                <Box textAlign="center">
                  <Typography variant="h9">You have no other notifications</Typography>
                  <span style={{ display: 'block' }}>for the last 30 days.</span>
                </Box>
              </Box>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default Notifications;
