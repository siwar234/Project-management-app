import React from 'react';
import {
  Typography,
  Modal,
  Fade,
  Button,
  Box,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { createTasks } from 'src/JS/actions/tasks';



const CreateTastsModal = ({ openModal, handleClosing, setTaskData,taskData,initialTaskData,projectId }) => {
  const dispatch = useDispatch();



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  // const handleDateTimeChange = (date, field) => {
  //   setTaskData((prevData) => ({
  //     ...prevData,
  //     [field]: date,
  //   }));
  // };

  const handleSubmit = async () => {
    try {
      const dataWithProjectId = { ...taskData, projectId: projectId }; 

      await dispatch(createTasks(dataWithProjectId));
      handleClosing();
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const resetForm = () => {
    setTaskData(initialTaskData);
  };

  return (
    <Modal open={openModal} onClose={handleClosing }>
      <Fade in={openModal}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',

          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '500px',
              height: '290px',
              padding: '20px',
              background: '#fff',
              borderRadius: '5px',
              overflow: 'auto',
              maxWidth: '95%',
              maxHeight: '80%',
            }}
          >
              <Typography
                variant="h6"
                sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
                mt={2}
                mb={5}
              >
                Add a new sprint
              </Typography>
         <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
  {/* First column */}
  <Box display="flex" flexDirection="column" flex="1" marginRight="20px">
    <Typography mt={2} variant="body1" gutterBottom>
      Sprint Name <span style={{ color: 'red' }}>*</span>
    </Typography>
    <TextField
      fullWidth
      variant="outlined"
      name="TaskName"
      value={taskData.TaskName}
      onChange={handleInputChange}
      placeholder='add a Task'
    />
  </Box>
  {/* Second column */}
  <Box display="flex" flexDirection="column" flex="1" marginLeft="20px">
    <Typography mt={2} variant="body1" gutterBottom>
      Duration <span style={{ color: 'red' }}>*</span>
    </Typography>
    <Select
      fullWidth
      name="Duration"
      value={taskData.Duration}
      onChange={handleInputChange}
    >
      <MenuItem value="" disabled>
        Select Duration
      </MenuItem>
      <MenuItem value="1 week">1 week</MenuItem>
      <MenuItem value="2 weeks">2 weeks</MenuItem>
      <MenuItem value="3 weeks">3 weeks</MenuItem>
      <MenuItem value="4 weeks">4 weeks</MenuItem>
    </Select>
  </Box>
</Box>
<Box display="flex" justifyContent="right" marginTop="30px" marginLeft={"310px"}>
  <Button
    variant="contained"
    onClick={handleClosing}
    sx={{
      fontWeight: 'bold',
      fontSize: '12px',
      color: 'black',
      backgroundColor: 'white',
      marginRight: '10px',
    }}
  >
    Cancel
  </Button>
  <Button
    variant="contained"
    onClick={handleSubmit}
    sx={{
      fontWeight: 'bold',
      fontSize: '12px',
      color: 'black',
      backgroundColor: '#434a4f1f',
    }}
  >
    Send
  </Button>
</Box>

          </div>
        </div>
      </Fade>
    </Modal>
  );
};

CreateTastsModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleClosing: PropTypes.func.isRequired,
};

export default CreateTastsModal;
