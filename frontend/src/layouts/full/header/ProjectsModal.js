import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Fade, TextField, Typography, Button, Box, Select, MenuItem } from '@mui/material';
import image from '../../../assets/images/scrum.gif';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from 'src/JS/actions/project';
import { fetchequipes } from 'src/JS/actions/equipe';

const ProjectsModal = ({ openProject, handleCloseProject }) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [customProjectType, setCustomProjectType] = useState('');

  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSubmit = async () => {
    try {
      const formData = {
        projectName,
        type: selectedProjectType || customProjectType,
        equipeId: selectedTeam,
      };

      await dispatch(createProject(formData));

      setProjectName('');
      setSelectedProjectType('');
      setCustomProjectType('');
      setSelectedTeam('');
      handleCloseProject();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchequipes());
  }, [dispatch]);

  const user = useSelector((state) => state.userReducer.user);
  const equipes = useSelector((state) => state.equipeReducer.allEquipes);

  const userEquipes = equipes.filter((equipe) => equipe.owner === user._id);

  return (
    <Modal open={openProject}>
      <Fade in={openProject}>
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
              height: '530px',
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
                Create a New Project
              </Typography>
              <div style={{ marginRight: '20px', flex: 'column' }}>
                <Typography variant="body1" gutterBottom mt={5} mb={4} fontWeight={'150'}>
                  Explore what's possible when you collaborate with your team. Edit project details
                  anytime in project settings.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Project Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  rows={1}
                  placeholder="Try a project Name, project goal, milestone ..."
                  variant="outlined"
                  InputLabelProps={{ shrink: true, style: { color: 'black' } }}
                  fullWidth
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  helperText={
                    projectName.trim() === '' && projectName !== '' ? 'Team Name is required' : ''
                  }
                />
                <Typography mt={2} variant="body1" gutterBottom>
                  Choose your Project Type <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Select
                  fullWidth
                  value={selectedProjectType}
                  onChange={(e) => {
                    if (e.target.value === 'Other') {
                      setCustomProjectType(''); 
                    }
                    setSelectedProjectType(e.target.value);
                  }}
                  displayEmpty
                  variant="outlined"
                  style={{ marginBottom: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select Project Type
                  </MenuItem>
                  <MenuItem value="Software development">Software development</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {selectedProjectType === 'Other' && (
                  <TextField
                    fullWidth
                    placeholder="Enter custom project type"
                    variant="outlined"
                    value={customProjectType}
                    onChange={(e) => setCustomProjectType(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                )}

               
                <Typography mt={2} variant="body1" gutterBottom>
                  Assign a team <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Select
                  fullWidth
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  style={{ marginBottom: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select a Team
                  </MenuItem>
                  {userEquipes.map((equipe) => (
                    <MenuItem key={equipe._id} value={equipe._id}>
                      {equipe.NameEquipe}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={image} alt="teamimg" style={{ width: '350px', marginTop: '35px' }} />
              <Box
                maxWidth="100%"
                maxHeight={'90%'}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '70px',
                  paddingRight: '20px',
                }}
              >
                <Button
                  color="inherit"
                  variant="contained"
                  size="small"
                  onClick={handleCloseProject}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: '10px', backgroundColor: 'rgb(52, 71, 103)' }}
                  onClick={handleSubmit}
                >
                  Create a New Project
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

ProjectsModal.propTypes = {
  openProject: PropTypes.bool.isRequired,
  handleCloseProject: PropTypes.func.isRequired,
};

export default ProjectsModal;
