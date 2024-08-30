import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const UnarchiveProject = ({ openModal, handleCloseModal, handleUnarchive }) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Restore project?
        </Typography>
        <Typography sx={{ mt: 2 }}>
          The project along with its sprints, tickets, and attachments will be restored. Users can edit sprints and tickets. This project will appear in the workspace and project list, along with its tasks and tickets.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUnarchive}>
            Restore
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UnarchiveProject;
