import React, { useState } from 'react';
import { Typography, Modal, Fade, Button, Box, Divider, TextField, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sendInvitation } from 'src/JS/actions/equipe';
import image from '../../assets/images/Invite.gif';

const InvitationModal = ({ openModal, handleclosing, id, setEmails }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [emails, setEmailsLocal] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleInputChange = (event) => {
    setSelectedEmail(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && selectedEmail.trim() !== '') {
      setEmailsLocal([...emails, selectedEmail.trim()]);
      setSelectedEmail('');
    }
  };

  const handleDeleteEmail = (index) => {
    setEmailsLocal(emails.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    const formData = {
      emails: emails,
    };
    dispatch(sendInvitation(formData, id));
    setEmailsLocal([]);
    handleclosing(); // Call handleClose without passing emails
  };

  return (
    <Modal open={openModal} handleclosing={handleclosing}>
    <Fade  in ={openModal}   >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
      
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '920px',
            height: '500px',
            padding: '20px',
            background: '#fff',
            borderRadius: '5px',
            overflow: 'auto', 
            maxWidth: '90%',
            maxHeight: '55%', 

          }}
        >
          <div style={{ marginRight: '20px', }}>
            <Typography
              variant="h6"
              sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }}
              color="rgb(52, 71, 103)"
              fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              gutterBottom
              mt={2}
            >
              Add team members

            </Typography>
           
            <img src={image} alt="teamimg"  style={{ width: '335px',height:"320px", marginBottom:'400px' }} />
          </div>
          <div style={{ marginRight: '25px', flex: 'column' ,marginTop:'10px'}}>
            <Typography variant="body1" gutterBottom mt={10} mb={4} fontWeight={'150'}>
            Grow your team and work better together. Adding people to this team gives them access to all the team’s work
            </Typography>


            <Typography mt={2} variant="body1" gutterBottom>
              Invite people to join your team <span style={{ color: 'red' }}>*</span>
            </Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {emails.map((email, index) => (
              <Chip
                key={index}
                label={email}
                onDelete={() => handleDeleteEmail(index)}
                style={{ marginRight: '8px', marginBottom: '8px', minWidth: '50px' }} // Adjusted minWidth
              />
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter email addresses"
            value={inputValue.length > 0 ? `${inputValue}, ${selectedEmail}` : selectedEmail}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        
      < Box display="flex" flexDirection="row" justifyContent={'right'} mt={4.5}  >
  
      <Button
                  variant="contained"
                  onClick={handleclosing} 
                  sx={{
                    border: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '12px',
                    color: 'black',
                    backgroundColor: 'white',
                    minWidth: '10px',
                    MaxHeight: '5px',
                    fontcolor: 'black',
                    padding: '1 px',
                    marginTop: ' 15px',
                    marginRight:"10px"
                    
                  }}
                >
                  cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}    
                  // disabled={emailExists(selectedEmail)}               
                    sx={{
                    border: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '12px',
                    color: 'black',
                    backgroundColor: '#434a4f1f',
                    minWidth: '10px',
                    MaxHeight: '5px',
                    fontcolor: 'black',
                    padding: '1 px',
                    marginTop: ' 15px',
                    
                  }}
                >
                  send
                </Button>

     </Box></div></div></div>
     
     </Fade></Modal>
     
)};

InvitationModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleclosing: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setEmails: PropTypes.func,
};

export default InvitationModal;
