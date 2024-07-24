import React, { useEffect ,useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import ProjectperMonth from './ProjectperMonth';
import { Card, Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getallTasks } from 'src/JS/actions/tasks';
import MenuItem from '@mui/material/MenuItem';
import { getprojectbyuser } from 'src/JS/actions/project';
import {  IconButton, Menu } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import image5 from '../../../assets/images/icons/projection.png';
import { addDays } from 'date-fns';
import CompletionStatus from './CompletionStatus';
import TicketsPerFeature from './ChartComponent';

import TicketsPerPriority from './TicketsPerPriority ';
// import TaskChart from './TaskChart ';

const Statistics = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksReducer.alltasks);
  //filter by project
  const [selectedProjectCompleted, setSelectedProjectCompleted] = useState('');
  const [selectedProjectIncompleted, setSelectedProjectIncompleted] = useState('');


  const projects = useSelector((state) => state.projectReducer.projects);
  const user = useSelector((state) => state.userReducer.user);
  const userid=user._id

  useEffect(() => {
    dispatch(getallTasks(userid));
  }, [dispatch]);


  useEffect(() => {
    dispatch(getprojectbyuser(userid));

  }, [dispatch]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [otherAnchorEl, setotherAnchorEl] = useState(null);

  //menu2
  const handleOpen = (event) => {
    setotherAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setotherAnchorEl(null);
};

//menu1
  const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
      setAnchorEl(null);
  };

  const totalCount = tasks.length;

  //completed tasks

const totalDoneTicketsAll = tasks.reduce((total, task) => {
    return total + task.tickets.filter(ticket => ticket.Etat === 'DONE').length;
}, 0);

const totalDoneTickets = selectedProjectCompleted ? tasks
    .filter(task => task.projectId._id === selectedProjectCompleted)
    .reduce((total, task) => total + task.tickets.filter(ticket => ticket.Etat === 'DONE').length, 0)
    : 0;
    const handleProjectSelection = (projectId) => {
      setSelectedProjectCompleted(projectId);
        handleCloseMenu();
    };


      //incompleted tasks

      
const totalunDoneTicketsAll = tasks.reduce((total, task) => {
  return total + task.tickets.filter(ticket => ticket.Etat === 'IN_PROGRESS').length;
}, 0);

const totalUNDoneTickets = selectedProjectIncompleted ? tasks
  .filter(task => task.projectId._id === selectedProjectIncompleted)
  .reduce((total, task) => total + task.tickets.filter(ticket => ticket.Etat === 'IN_PROGRESS').length, 0)
  : 0;
  

  const handleProject = (projectId) => {
    setSelectedProjectIncompleted(projectId);
    handleClose();
};

//ovedue
const countTasksWithCriteria = () => {

  const filteredTasks = tasks.filter(task => {
    // Check if any ticket associated with the task is not "DONE"
    const hasIncompleteTickets = task.tickets.some(ticket => ticket.Etat !== 'DONE');
    
    if (!hasIncompleteTickets) {
      return false;
    }

    // Calculate EndDate if it's null using StartDate and Duration
    let endDate = task.EndDate ? new Date(task.EndDate) : null;
    
    if (!endDate && task.StartDate && task.Duration) {
      const startDate = new Date(task.StartDate);
      endDate = addDays(startDate, task.Duration);
    }

    // Check if endDate is valid
    if (endDate) {
      return true;
    }

    return false;
  });

  return filteredTasks.length;
};

const count = countTasksWithCriteria();

    
    
  return (
    
    <PageContainer title="statistics" description="This is statistics" 
>
      <DashboardCard title="All Statistics">
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '50px', flexWrap: 'wrap' }}>

         <Card
            sx={{ padding: 0, backgroundColor: "#F9F9FA", width: "250px", borderRadius: "5px" }}
            elevation={9}
            variant={undefined}
        >
            <Typography style={{ fontSize: "0.95rem", fontWeight: "bold", fontFamily: "sans-serif", marginTop: "10px", marginLeft: "10px" }}>
                Completed Tasks
            </Typography>
           
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    <div>
        <Typography
            style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '30px',
                marginLeft: '15px',
            }}
        >
            {selectedProjectCompleted ? totalDoneTickets : totalDoneTicketsAll}
        </Typography>
        <Typography
            style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginLeft: '15px',
                color: '#7b7575',
            }}
        >
            Task count
        </Typography>
    </div>
    <div style={{ display: "flex", alignItems: "left" ,marginLeft: "auto",marginTop:"30px",marginRight:"15px"}}>
    <div style={{ backgroundColor: "#E6F7FF",   borderRadius: "5px",height:"35px" }}>
        <IconButton
            style={{ backgroundColor: "transparent", width: "auto" }}
            aria-controls="project-menu"
            aria-haspopup="true"
            onClick={handleOpen}
        >
            <FilterListIcon  style={{ fontSize: "18px", color: "#55bff0", }} />
        </IconButton>
        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#55bff0", marginLeft: "3px" ,marginRight:"10px"}}>Filter</span>
    </div>

    <Menu
        id="project-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
    >
        <MenuItem style={{fontFamily:'sans-serif', fontSize:"14px" }} onClick={() => handleProject('')}>
            All Projects
        </MenuItem>
        {projects.map((project) => (
            <MenuItem  style={{fontFamily:'sans-serif', fontSize:"14px" }} key={project._id} onClick={() => handleProject(project._id)}>
             <span style={{marginTop:"5px"}}>   <img
                        src={project.Icon || image5}
                        alt="teamimg"
                        style={{ width: '20px', marginRight: '10px',marginLeft:"5px" }}
                      /></span>   {project.projectName}
            </MenuItem>
        ))}
    </Menu>

</div>

</div>





        </Card>
          <Card
            sx={{ padding: 0, backgroundColor: '#F9F9FA', width: '250px', borderRadius: '5px' }}
            elevation={9}
            variant={undefined}
          >
            {' '}
            <Typography
              style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '10px',
                marginLeft: '10px',
              }}
            >
              Overdue Tasks
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <div>
        <Typography
            style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '30px',
                marginLeft: '15px',
            }}
        >
            {count}
        </Typography>
        <Typography
            style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginLeft: '15px',
                color: '#7b7575',
            }}
        >
            Task count
        </Typography>
    </div></div>
          </Card>
          <Card
            sx={{ padding: 0, backgroundColor: '#F9F9FA', width: '250px', borderRadius: '5px' }}
            elevation={9}
            variant={undefined}
          >
            {' '}
            <Typography
              style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '10px',
                marginLeft: '10px',
              }}
            >
              Incompleted Tasks
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <div>
        <Typography
            style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '30px',
                marginLeft: '15px',
            }}
        >
            {selectedProjectIncompleted ? totalUNDoneTickets : totalunDoneTicketsAll}
        </Typography>
        <Typography
            style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginLeft: '15px',
                color: '#7b7575',
            }}
        >
            Task count
        </Typography>
    </div>
    <div style={{ display: "flex", alignItems: "left" ,marginLeft: "auto",marginTop:"20px",marginRight:"15px"}}>
    <div style={{ backgroundColor: "#cebbea5c",   borderRadius: "5px" }}>
        <IconButton
            style={{ backgroundColor: "transparent", width: "auto", }}
            aria-controls="project-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
        >
            <FilterListIcon  style={{ fontSize: "18px", color: "#8f5bde" }} />
        </IconButton>
        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#8f5bde", marginLeft: "3px" ,marginRight:"10px"}}>Filter</span>
    </div>

    <Menu
    id="other-menu"
    anchorEl={otherAnchorEl}
    open={Boolean(otherAnchorEl)}
    onClose={handleClose}
>
        <MenuItem style={{fontFamily:'sans-serif', fontSize:"14px" }} onClick={() => handleProjectSelection('')}>
            All Projects
        </MenuItem>
        {projects.map((project) => (
            <MenuItem  style={{fontFamily:'sans-serif', fontSize:"14px" }} key={project._id} onClick={() => handleProjectSelection(project._id)}>
             <span style={{marginTop:"5px"}}>   <img
                        src={project.Icon || image5}
                        alt="teamimg"
                        style={{ width: '20px', marginRight: '10px',marginLeft:"5px" }}
                      /></span>   {project.projectName}
            </MenuItem>
        ))}
    </Menu>
</div>

</div>
          </Card>
          <Card
            sx={{ padding: 0, backgroundColor: '#F9F9FA', width: '250px', borderRadius: '5px' }}
            elevation={9}
            variant={undefined}
          >
            <Typography
              style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '10px',
                marginLeft: '10px',
              }}
            >
              Total Tasks
            </Typography>

            <Typography
              style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginTop: '30px',
                marginLeft: '15px',
              }}
            >
              {totalCount}{' '}
            </Typography>
            <Typography
              style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginLeft: '10px',
                color: '#7b7575',
              }}
            >
              Task count{' '}
            </Typography>
          </Card>
        </Box>
        <div style={{display:"flex", flexDirection:"row"}}>
        <ProjectperMonth />
        <CompletionStatus />
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>

       <TicketsPerFeature/>
    <TicketsPerPriority/> </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default Statistics;
