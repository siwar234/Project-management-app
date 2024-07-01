import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addLink } from 'src/JS/actions/equipe';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid ',
  boxShadow: 24,
  p: 4,
};

const LinkModal = ({ open, handleClose, equipeId }) => {
    const [webAddress, setWebAddress] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createAnother, setCreateAnother] = useState(false);
    const dispatch = useDispatch();
  
    const handleAdd = () => {
      const linkData = {
        webAddress,
        title,
        description,
      };
  
      // Dispatch the addLink action
      dispatch(addLink(equipeId, linkData));
  
      if (!createAnother) {
        handleClose();
      }
  
      // Reset the form
      setWebAddress('');
      setTitle('');
      setDescription('');
    };
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Add a Link
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Let everyone know where and how the team works.
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
            placeholder="Add a description to your link so that everyone knows why it's important to the team."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={createAnother}
                onChange={(e) => setCreateAnother(e.target.checked)}
              />
            }
            label="Add another one"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
          </Box>
        </Box>
      </Modal>
    );
  };
    

export default LinkModal;
