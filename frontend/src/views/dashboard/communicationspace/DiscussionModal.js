import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import image from '../../../assets/images/Group discussion.gif';
import { useDispatch } from 'react-redux';
import { createCommunicationSpace } from 'src/JS/actions/CommunicartionSpace';

const DiscussionSpaceModal = ({ open, handleClose, task, projectId }) => {
  const [privacy, setPrivacy] = useState('public');
  const [discussionSpace, setDiscussionSpace] = useState('');
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };

  const handleCreate = () => {
    dispatch(createCommunicationSpace(task?._id, discussionSpace, privacy, projectId));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isSmallScreen ? '90%' : 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <Box sx={{ flex: 1, marginRight: isSmallScreen ? '0' : '16px', marginBottom: isSmallScreen ? '16px' : '0' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Start a new discussion
          </Typography>
          <TextField
            fullWidth
            label="Search for a task..."
            variant="outlined"
            defaultValue={task?.TaskName || ''}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name your discussion space"
            variant="outlined"
            margin="normal"
            value={discussionSpace}
            onChange={(e) => setDiscussionSpace(e.target.value)}
          />
          <Typography variant="subtitle1" mt={2} mb={1}>
            Privacy and permissions
          </Typography>
          <RadioGroup value={privacy} onChange={handlePrivacyChange}>
            <FormControlLabel value="public" control={<Radio />} label="Public" />
            <FormControlLabel value="private" control={<Radio />} label="Private" />
          </RadioGroup>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleCreate}>
            Create
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={image} alt="group discussion" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        </Box>
      </Box>
    </Modal>
  );
};

export default DiscussionSpaceModal;
