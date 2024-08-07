import React, { useState } from 'react';
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {  updatetasks } from 'src/JS/actions/tasks';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'; 
import { format } from 'date-fns';
import { useParams } from 'react-router';

const UpdateTaskModal = ({ openUpdateModal, handleUpdateClosing,taskduration,taksname,taskId,handleTaskStart }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();


  const [taskData, setTaskData] = useState({
    TaskName: taksname || '',
    Duration: taskduration || '',
    StartDate: new Date(),
    EndDate: null,
  });

  const handleDateTimeChange = (date, field) => {
    setTaskData({ ...taskData, [field]: date });
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updatetasks(taskId, taskData,projectId));
      handleTaskStart(taskId); 
      handleUpdateClosing();
    } catch (error) {
    }
  };


  

 

 
  return (
    <Modal open={openUpdateModal} onClose={handleUpdateClosing }>
    <Fade in={openUpdateModal}>
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
            width: '500px',
            height: '900px',
            padding: '20px',
            background: '#fff',
            borderRadius: '5px',
            overflow: 'auto',
            maxWidth: '95%',
            maxHeight: '80%',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }}
              color="rgb(52, 71, 103)"
              fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              gutterBottom
              mt={2}
              mb={5}
            >
              Edit  Task
            </Typography>

            <Typography mt={2} variant="body1" gutterBottom>
              Task Name <span style={{ color: 'red' }}>*</span>
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              name="TaskName"
              onChange={handleInputChange}

            value={taskData.TaskName}
              defaultValue={taksname}

            />

            <Typography mt={2} variant="body1" gutterBottom>
              Duration <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Select
              fullWidth
              name="Duration"
              onChange={handleInputChange}
              value={taskData.Duration}
              defaultValue={taskduration}
            >
              <MenuItem value="" disabled>
                Select Duration
              </MenuItem>
              <MenuItem value="1 week">1 week</MenuItem>
              <MenuItem value="2 weeks">2 weeks</MenuItem>
              <MenuItem value="3 weeks">3 weeks</MenuItem>
              <MenuItem value="4 weeks">4 weeks</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </Select>

            <Typography mt={2} variant="body1" gutterBottom>
              Start Date <span style={{ color: 'red' }}>*</span>
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ width: '400px' }}
            value={taskData.StartDate instanceof Date ? format(taskData.StartDate, 'MM/dd/yyyy hh:mm a') : ''}
          />
        )}
        value={taskData.StartDate}
        onChange={(date) => handleDateTimeChange(date, 'StartDate')}
      />
    </LocalizationProvider>

            <Typography mt={2} variant="body1" gutterBottom>
              End Date <span style={{ color: 'red' }}>*</span>
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                  disabled={ taskData.Duration !== 'Custom'}

  renderInput={(params) => (
    <TextField
      {...params}
      style={{ width: '400px' }}
      inputProps={{ placeholder: 'e.g. 12/38/2024   e.g.  1:00 PM' }}
      disabled={ taskData.Duration !== 'Custom'}
      value={taskData.EndDate ? taskData.EndDate.format('MM/DD/YYYY hh:mm A') : ''}
    />
                )}
                value={taskData.EndDate}
                onChange={(date) => handleDateTimeChange(date, 'EndDate')}
              />
            </LocalizationProvider>

            <Box display="flex" justifyContent="flex-end" mt={4.5}>
              <Button
                variant="contained"
                onClick={handleUpdateClosing }
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
                  marginRight: '10px',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
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
                Start Task
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </Fade>
  </Modal>
);
};

 

UpdateTaskModal.propTypes = {
    openUpdateModal: PropTypes.bool.isRequired,
    handleUpdateClosing: PropTypes.func.isRequired,
};

export default UpdateTaskModal;
