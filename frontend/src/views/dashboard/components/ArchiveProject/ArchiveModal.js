import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ArchiveProjectModal = ({ open, handleClose, handleArchive }) => {
  return (
    <Modal open={open} onClose={handleClose}>
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
          Archive project?
        </Typography>
        <Typography sx={{ mt: 2 }}>
          The project along with its Tasks, tickets and  attachments,  will be archived. Archived projects won't appear in filters or Sidebar Or Project Lists and their Tickets won't appear in search. Only Project Manager can restore the project.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleArchive}>
            Archive
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ArchiveProjectModal;
