import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLink } from 'src/JS/actions/equipe';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UpdateLinkModal = ({ opened, closelink, equipeId, links }) => {
  const [webAddress, setWebAddress] = useState(links.webAddress || '');
  const [title, setTitle] = useState(links.title || '');
  const [description, setDescription] = useState(links.description || '');
  const dispatch = useDispatch();

  const handleModify = () => {
    const updatedLinkData = {
      webAddress,
      title,
      description,
    };
    dispatch(updateLink(equipeId, links._id, updatedLinkData));
    closelink(); 
  };

  return (
    <Modal
      open={opened}
      onClose={closelink}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Change your Link info
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Adresse web"
          placeholder="for ex. https:/Teamsyn/"
          value={webAddress}
          onChange={(e) => setWebAddress(e.target.value)}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Titre"
          placeholder="add a website "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={closelink} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleModify}>
            Modify
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateLinkModal;
