import React, { useState } from 'react';
import { Typography, Modal, Fade, Button, Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateEquipe } from 'src/JS/actions/equipe';

const UpdateModal = ({ openupdateModal, handleclosingModalUpdate, equipeId }) => {
  const dispatch = useDispatch();
  const equipe = useSelector((state) => state.equipeReducer.equipes);
  const [teamName, setTeamName] = useState(equipe.NameEquipe);
  const [teamDescription, setTeamDescription] = useState(equipe?.description);

  const handleSave = async () => {
    try {
      await dispatch(updateEquipe(equipeId, { NameEquipe: teamName, description: teamDescription }));
      handleclosingModalUpdate(); 
    } catch (error) {
      console.error('Failed to update team:', error);
      
    }
  };

  return (
    <Modal open={openupdateModal} onClose={handleclosingModalUpdate}>
      <Fade in={openupdateModal}>
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
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '400px',
              height: '430px',
              padding: '20px',
              background: '#fff',
              borderRadius: '5px',
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }} color="rgb(52, 71, 103)" fontFamily={'Roboto, Helvetica, Arial, sans-serif'} gutterBottom mt={2}>
              Team Settings
            </Typography>
            <div style={{ marginRight: '25px', flex: 'column', marginTop: '10px' }}>
              <Typography mt={2} variant="body1" gutterBottom>
                Team Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                style={{ width: '340px' }}
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <Typography mt={2} variant="body1" gutterBottom>
                Team Description <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                id="filled-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe your team"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
                 < Box display="flex" flexDirection="row" justifyContent={'right'} mt={4.5}  >
  
  <Button
              variant="contained"
              onClick={handleclosingModalUpdate} 
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
            onClick={handleSave}
              variant="contained"
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

 </Box>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

UpdateModal.propTypes = {
  openupdateModal: PropTypes.bool.isRequired,
  handleclosingModalUpdate: PropTypes.func.isRequired,
  equipeId: PropTypes.string.isRequired,
};

export default UpdateModal;
