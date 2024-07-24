import React ,{useState} from 'react';
import {
  Typography,
  Modal,
  Fade,
  Button,
  Box,
  Select,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import image from "../../../assets/images/blob.jpg"
import { deletetasks, getTasks, moveTicket } from 'src/JS/actions/tasks';
import { useParams } from 'react-router';

const TerminateTask = ({
  openTerminate,
  handleCloseTerminate,
  taskname,
  openLength,
  donelenght,
  taskid,
  openTickets
}) => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasksReducer.tasks);
  const filteredTasks = tasks.filter((task) => task._id !== taskid);
  const [selectedTask, setSelectedTask] = useState('');
 const {projectid}=useParams()

  const handleSelectTask = (event) => {
    const selectedTaskId = event.target.value;
    setSelectedTask(selectedTaskId);
  };
  
  const handleTerminateTask = async () => {
    const openTicketIds = openTickets.map((ticket) => ticket._id);
    console.log("Open Ticket IDs:", openTicketIds);
  
    try {
      if (selectedTask) {
         await dispatch(moveTicket(openTicketIds, taskid, selectedTask));
        //  await dispatch(getTasks(projectid))
        
      } else {
        await dispatch(deletetasks(taskid));
      }
  
      handleCloseTerminate();
    } catch (error) {
      console.error('Error moving or deleting tasks:', error.message);
    }
  };
  
  
  

  return (
    <Modal open={openTerminate} onClose={handleCloseTerminate}>
      <Fade in={openTerminate}>
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
              width: '180%',
              maxWidth: '600px',
              padding: '20px',
              background: '#fff',
              borderRadius: '5px',
              height: '400px',
            }}
          >
            <Typography
              sx={{ fontSize: 20, fontWeight: 'bold', marginBottom: '20px' }}
              color="rgb(52, 71, 103)"
              fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            >
              Terminate {taskname}{' '}
            </Typography>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div>
                <Typography
                  gutterBottom
                  mt={2}
                  mb={2}
                  fontWeight={'150'}
                  style={{
                    fontSize: '14px',
                    marginLeft: '5px',
                    color: '#363541',
                    fontFamily: "'Plus Jakarta Sans'",
                  }}
                >
                  This Task includes :
                </Typography>
                <Box display="flex" alignItems="center" flexDirection={'column'}>
                  <ListItem disableGutters style={{ marginLeft: '40px' }}>
                    <ListItemIcon style={{ minWidth: '20px' }}>
                      <span style={{ color: '#363541', fontSize: '13px' }}>•</span>
                    </ListItemIcon>
                    <ListItemText primary={`${openLength} open tickets`} />
                  </ListItem>
                  <ListItem disableGutters style={{ paddingLeft: '0', marginLeft: '40px' }}>
                    <ListItemIcon style={{ minWidth: '20px' }}>
                      <span style={{ color: '#363541', fontSize: '13px' }}>•</span>
                    </ListItemIcon>
                    <ListItemText primary={`${donelenght} done tickets`} />
                  </ListItem>
                </Box>

                <Typography
                  gutterBottom
                  mt={5}
                  mb={0}
                  fontWeight={'150'}
                  style={{ fontSize: '13px', marginLeft: '5px', color: '#191d59' }}
                >
                  Move open tickets to
                </Typography>
                <Select
                  sx={{ marginRight: '20px', minWidth: '200px' }}
                  defaultValue={filteredTasks.length > 0 ? filteredTasks[0].TaskName : ''}
                  value={selectedTask}
                  onChange={handleSelectTask} 
                >
                  {filteredTasks.map((task, index) => (
                    <MenuItem key={task.id} value={task._id}>
                      {task.TaskName}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <img
                style={{ width: '300px', height: '250px', marginLeft: '45px' }}
                src={image}
                alt="Warning"
              />
            </div>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleCloseTerminate}
                variant="contained"
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
                              onClick={handleTerminateTask}

                variant="contained"
                sx={{
                  border: 'none',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  color: 'black',
                  backgroundColor: '#3498db',
                  minWidth: '10px',
                  MaxHeight: '5px',
                  fontcolor: 'black',
                  padding: '1 px',
                  marginTop: ' 15px',
                }}
              >
                Terminate  Task
              </Button>
            </Box>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

TerminateTask.propTypes = {
  openTerminate: PropTypes.bool.isRequired,
  handleCloseTerminate: PropTypes.func.isRequired,
};

export default TerminateTask;
