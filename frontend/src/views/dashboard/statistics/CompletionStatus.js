import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Box, Card, CardContent, Typography, CardActions, IconButton, Menu, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import image5 from '../../../assets/images/icons/projection.png';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CompletionStatus = () => {
    const tasks = useSelector((state) => state.tasksReducer.alltasks);
    const projects = useSelector((state) => state.projectReducer.projects);
    
    const [selectedProject, setSelectedProject] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProjectSelection = (projectId) => {
        setSelectedProject(projectId);
        handleClose();
    };

    const filteredTasks = selectedProject ? tasks.filter(task => task.projectId._id === selectedProject) : tasks;

    const getTaskCompletionData = (tasks) => {
        let doneCount = 0;
        let inProgressCount = 0;
        let totalCount = tasks.length;

        tasks.forEach(task => {
            const hasDoneTickets = task.tickets.some(ticket => ticket.Etat === 'DONE');
            const hasInProgressTickets = task.tickets.some(ticket => ticket.Etat === 'IN_PROGRESS');

            if (hasDoneTickets) {
                doneCount++;
            } else if (hasInProgressTickets) {
                inProgressCount++;
            }
        });

        const donePercentage = totalCount > 0 ? ((doneCount / totalCount) * 100).toFixed(0) : '0';
        const inProgressPercentage = totalCount > 0 ? ((inProgressCount / totalCount) * 100).toFixed(0) : '0';

        return {
            labels: ['Completed', 'In Progress'],
            datasets: [{
                data: [donePercentage, inProgressPercentage],
                backgroundColor: ['#8a72aedb', '#a482dab8']
            }]
        };
    };

    const taskCompletionData = getTaskCompletionData(filteredTasks);
    const donePercentage = taskCompletionData.datasets[0].data[0];
    const inProgressPercentage = taskCompletionData.datasets[0].data[1];

    return (
        <DashboardCard title="All tasks by Completion status">
                    <div style={{ backgroundColor: "#cebbea5c",   borderRadius: "5px" ,width:'fit-content'}}>
        <IconButton
            style={{ backgroundColor: "transparent", width: "auto", }}
            aria-controls="project-menu"
            aria-haspopup="true"
            onClick={handleOpen}
        >
            <FilterListIcon  style={{ fontSize: "18px", color: "#8f5bde" }} />
        </IconButton>
        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#8f5bde", marginLeft: "3px" ,marginRight:"10px"}}>Filter</span>
    </div>
            <Box style={{ width: "460px", height: "320px", display: 'flex', justifyContent: 'space-between', marginLeft: "10px" }}>
                
                <Box style={{ marginTop: "30px" }}>
                    <Doughnut
                        height={250}
                        data={taskCompletionData}
                        options={{ maintainAspectRatio: false, responsive: false, plugins: { legend: { display: false } } }}
                    />
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', marginTop: "50px" }}>
                    <Card style={{ marginBottom: '10px', border: '2px solid #8a72aedb' }}>
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography style={{ marginTop: '10px', marginBottom: "10px", marginLeft: "10px", color: "#3b1b6cdb", fontWeight: "bold", fontSize: "20px" }}>
                                {filteredTasks.reduce((total, task) => total + task.tickets.length, 0) > 0 ? `${donePercentage}%` : '0%'}
                            </Typography>
                        </CardActions>
                        <CardContent style={{ backgroundColor: "#8a72aedb", height: "10px" }}>
                            <Typography style={{ marginBottom: '25px', marginLeft: "18px", color: "#fff", fontWeight: "bold", fontSize: "12px" }}>Completed</Typography>
                        </CardContent>
                    </Card>

                    <Box style={{ marginLeft: '20px', marginTop: "20px" }}>
                        <Card style={{ marginBottom: '10px', border: '2px solid #a482dab8' }}>
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ marginTop: '10px', marginBottom: "10px", marginLeft: "10px", color: "#9d7dd0ed", fontWeight: "bold", fontSize: "20px" }}>
                                    {filteredTasks.reduce((total, task) => total + task.tickets.length, 0) > 0 ? `${inProgressPercentage}%` : '0%'}
                                </Typography>
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#a482dab8", height: "10px" }}>
                                <Typography style={{ marginBottom: '25px', marginLeft: "15px", color: "#fff", fontWeight: "bold", fontSize: "12px" }}>Incompleted</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
       
            <Menu
                id="project-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem style={{fontFamily:'sans-serif', fontSize:"14px" }} onClick={() => handleProjectSelection('')}>
                    All Projects
                </MenuItem>
                {projects.map((project) => (
                    <MenuItem style={{fontFamily:'sans-serif', fontSize:"14px" }} key={project._id} onClick={() => handleProjectSelection(project._id)}>
                        <span style={{marginTop:"5px"}}>   
                            <img src={project.Icon || image5} alt="teamimg" style={{ width: '20px', marginRight: '10px', marginLeft: "5px" }} />
                        </span>   
                        {project.projectName}
                    </MenuItem>
                ))}
            </Menu>
        </DashboardCard>
    );
};

export default CompletionStatus;
