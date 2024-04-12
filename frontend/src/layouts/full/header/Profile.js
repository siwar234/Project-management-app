import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';
import { currentUser } from 'src/JS/actions/user';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { logoutUser } from 'src/JS/actions/user';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import image1 from '../../../assets/images/membe.png';
import image2 from '../../../assets/images/inboxes.png';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const token = window.localStorage.getItem('token');
  const [isHovered, setIsHovered] = useState(false);


  // Function to decode the token and extract user ID
  const getUserIdFromToken = () => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleProfileClick = () => {
    const id = getUserIdFromToken(); 
    handleClose2(); 
    navigate(`/profileuser/${token}/${id}`);
  };
  

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
            alignItems:'right'
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
                  src={user?.profilePicture}
          sx={{
            bgcolor: '#42a5f5',
            width: 30,
            height: 30,
            alignItems:'right',
            fontSize:'13px'
          }}
        >{user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}</Avatar>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '270px',
          },
        }}
      >
        <MenuItem>
          <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1000px' }}>
            User Profile
          </Typography>
        </MenuItem>
        <MenuItem>
          <Avatar
          src={user?.profilePicture}
            sx={{ bgcolor: '#42a5f5' }}
            style={{ width: '55px', height: '55px', marginTop: '10px' }}
          >
            {user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}
          </Avatar>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              style={{ fontSize: '15px', fontWeight: '1000px', marginLeft: '15px' }}
            >
              {user.firstName}
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontSize: '12px',
                fontWeight: '1000px',
                marginLeft: '15px',
                marginTop: '12px',
              }}
            >
              {user.email}
            </Typography>
          </div>
        </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemIcon onClick={handleProfileClick}>
            <img alt="imageuser" src={image1} width={23} />
          </ListItemIcon>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15px',
              textOverflow: 'ellipsis',
            }}
          >
            <ListItemText onClick={handleProfileClick}>
              <Typography
                variant="body2"
                style={{ fontSize: '14px', fontFamily: 'Plus Jakarta Sans' }}
              >
                My Profile
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: '12px' }}>
                Account settings
              </Typography>
            </ListItemText>
          </div>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img alt="image2" src={image2} width={23} />
          </ListItemIcon>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15px',
              textOverflow: 'ellipsis',
            }}
          >
            <ListItemText onClick={handleProfileClick}>
              <Typography
                variant="body2"
                style={{ fontSize: '14px', fontFamily: 'Plus Jakarta Sans' }}
              >
                My Inbox
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: '12px' }}>
                messages and emails
              </Typography>
            </ListItemText>
          </div>
        </MenuItem>

        <Box mt={1} py={1} px={2} justifyContent={'center'}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            style={{
              backgroundColor: isHovered ? '#5D87FF' : 'transparent',
              border: isHovered ? 'none' : '1px solid rgb(13 74 249 / 52%)',
              padding: 0,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              dispatch(logoutUser(navigate));
            }}
          >
            <div
              style={{
                padding: '8px',
                borderRadius: '4px',
                color: isHovered ? 'white' : 'rgb(13 74 249 / 52%)',
              }}
            >
              Logout
            </div>
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
