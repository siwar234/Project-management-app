import React from "react";
import PropTypes from "prop-types"; 

import {
  Modal,
  IconButton,
  Fade,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import {  useSelector } from 'react-redux';
import { CloudUpload } from '@mui/icons-material'; 

function ProfileModal({
  open,
  handleClose,
  firstName,
  email,
  ProfileInformation,
  setProfileInformation,
  organisation,
  setorganisation,
  handleSave,
  profilePicture,
  Location,
  setLocation,
  setprofilePicture
  
 
}) {

  const user = useSelector((state) => state.userReducer.user);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxououehj/upload';
      const cloudinaryPreset = 'siwarse';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryPreset);

      try {
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setprofilePicture(data.secure_url); // Set the profile picture URL received from Cloudinary
      } catch (error) {
        console.error('Error uploading image to Cloudinary: ', error);
      }
    }
  };
  
  const handleAvatarClick = () => {
    document.getElementById('profile-picture-input').click();
  };

  
  return (
    <Modal
    open={open}
    onClose={handleClose}
    
   
  >
    <Fade in={open}>
 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
       
      >
        
        <div
          style={{
            width: "80%",
            maxWidth: "600px",
            padding: "20px",
            background: "#fff",
            borderRadius:'5px'

          }}
        >
      <label htmlFor="profile-picture-input">
  <Avatar
    src={profilePicture}
    sx={{ bgcolor: '#42a5f5' }}
    style={{ width: '45px', height: '45px', marginTop: '5px', marginBottom: '10px', cursor: 'pointer' }}
  >
    {user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}
  </Avatar>
</label>

{/* File input to select profile picture */}
<input
  accept="image/*"
  id="profile-picture-input"
  type="file"
  style={{ display: 'none' }}
  onChange={handleFileChange}
/>

    
                            <Typography
            sx={{ fontSize: 14, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
          Full Name: {firstName} 
          
          </Typography> 
          <Typography
            sx={{ fontSize: 14, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
          Contact: {email} 
          </Typography>           
          
          <Typography
            sx={{ fontSize: 14, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
          Profile Information :
                    <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={ProfileInformation}
            onChange={(e) => setProfileInformation(e.target.value)}
          /> </Typography>   
           <Typography
            sx={{ fontSize: 14, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
          organisaton:
                    <TextField
            variant="outlined"
            fullWidth
            value={organisation}
            
            onChange={(e) => setorganisation(e.target.value)}
          /></Typography>  
            <Typography
            sx={{ fontSize: 14, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
          location:
           <TextField
            variant="outlined"
            fullWidth
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          /></Typography>  
            
          <Button
                 variant="outlined"
                 size="small"
                 color="info"
                 type="external"    
                 style ={{marginLeft:'380px',marginRight:"20px", marginTop:"20px"}}onClick={handleSave} >
            Save
          </Button>
           <Button
                 variant="outlined"
                 size="small"
                 color='info'
                 type="external"   
                 style ={{marginTop:"20px"  }} onClick={handleClose} >
            Cancel
          </Button>
        </div>
      </div>
    </Fade>
  </Modal>
  );
}



ProfileModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ProfileInformation: PropTypes.string.isRequired,
    setProfileInformation: PropTypes.func.isRequired,
    organisation: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    setorganisation: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    profilePicture:PropTypes.string.isRequired,
    setprofilePicture: PropTypes.func.isRequired,


  };

export default ProfileModal;
