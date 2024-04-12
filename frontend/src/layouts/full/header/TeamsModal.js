import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Fade, TextField, Tooltip, Typography, Chip, Box, Button } from '@mui/material';
import image from '../../../assets/images/10590.jpg';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createEquipe } from 'src/JS/actions/equipe';

const TeamsModal = ({ ouvrir, handleClosee }) => {
  const dispatch = useDispatch();
  const [equipeName, setEquipeName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
   
  const handleInputChange = (event) => {
    setSelectedEmail(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && selectedEmail.trim() !== '') {
      setEmails([...emails, selectedEmail.trim()]);
      setSelectedEmail('');
    }
  };

  const handleDeleteEmail = (index) => {
    setEmails(emails.filter((_, idx) => idx !== index));
  };
  const user = useSelector((state) => state.userReducer.user);

  const handleSubmit = () => {
    if (equipeName.trim() === '') {
      console.error('Team Name is required');
      return;
    }
  
    const formData = {
      NameEquipe: equipeName,
      emails: emails,
    };
    dispatch(createEquipe(formData, user._id));
    setEmails([]);
    setEquipeName('');
  };

  return (
    <Modal open={ouvrir}>
      <Fade in={ouvrir}>
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
              height: '430px',
              padding: '20px',
              background: '#fff',
              borderRadius: '5px',
              overflow: 'auto', 
              maxWidth: '100%',
              maxHeight: '100%', 

            }}
          >
            <div style={{ marginRight: '20px' }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
                mt={2}
              >
                Create a Team
              </Typography>
              <img src={image} alt="teamimg" style={{ width: '350px', marginTop: '70px' }} />
            </div>
            <div style={{ marginRight: '20px', flex: 'column' }}>
              <Typography variant="body1" gutterBottom mt={10} mb={4} fontWeight={'150'}>
                Gather everyone into a single team that you can @mention, filter, and assign work
                to.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Team Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
  rows={1}
  placeholder="For ex, HR Team, Management Team ..."
  variant="outlined"
  InputLabelProps={{ shrink: true, style: { color: 'black' } }}
  fullWidth
  value={equipeName}
  onChange={(e) => setEquipeName(e.target.value)}
  error={equipeName.trim() === '' && equipeName !== ''} 
  helperText={equipeName.trim() === '' && equipeName !== '' ? 'Team Name is required' : ''} // Error message when the field is empty and has been interacted with
/>

              <Typography variant="body2" color={'#8D8B8B'} fontWeight={'200'}>
                Who can see your team name?{' '}
                <Tooltip
                  width="10px"
                  title="Your team name is visible to
                       all members of your organization."
                  arrow
                  style={{ maxWidth: '50px' }} // Set the maximum width
                >
                  <span style={{ color: '#777777', marginLeft: '5px' }}>
                    <BsExclamationCircleFill />
                  </span>
                </Tooltip>
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
              <Box             
                maxWidth="100%"
                maxHeight={'90%'}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end', 
                  
                  marginTop: '25px',
                  paddingRight: '20px', 
                }} >
                <Button
                  color="inherit"
                  variant="contained"
                  size="small"
                  type="submit"
                  onClick={handleClosee}
                >
                  close
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  style={{ marginLeft: '10px' }}
                  onClick={handleSubmit}
                >
                  Create a Team
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

TeamsModal.propTypes = {
  ouvrir: PropTypes.bool.isRequired,
  handleClosee: PropTypes.func.isRequired,
};

export default TeamsModal;
