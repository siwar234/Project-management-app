import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Pie } from 'react-chartjs-2';
import { Box } from "@mui/material";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TicketsPerFeature = () => {
    const tasks = useSelector((state) => state.tasksReducer.alltasks);

    const firstTaskName = tasks.length > 0 ? tasks[0].TaskName : '';
    const [selectedTask, setSelectedTask] = useState(firstTaskName);
    const [selectedTicketStatus, setSelectedTicketStatus] = useState('');

    useEffect(() => {
        // Update selectedTask with the first task's name when component mounts
        setSelectedTask(firstTaskName);
    }, [tasks, firstTaskName]);

    const handleChangeTask = (event) => {
        setSelectedTask(event.target.value);
    };

    const handleChangeTicketStatus = (event) => {
        setSelectedTicketStatus(event.target.value);
    };

    const tasksWithFeaturesAndTickets = tasks.filter(task =>
        task.tickets.length > 0 && task.tickets.some(ticket => ticket.Feature && ticket.Feature.titleF)
    );

    const taskOptions = tasksWithFeaturesAndTickets.map((task, index) => (
        <MenuItem key={index} value={task.TaskName}>{task.TaskName}</MenuItem>
    ));

    const uniqueTicketStatuses = [...new Set(tasks.flatMap(task =>
        task.tickets.map(ticket => ticket.Etat)
    ))];

    const ticketStatusOptions = uniqueTicketStatuses.map((status, index) => (
        <MenuItem key={index} value={status}>{status}</MenuItem>
    ));

    const filteredTickets = tasks.find(task => task.TaskName === selectedTask)?.tickets || [];

    const filteredTicketsByStatus = selectedTicketStatus ?
        filteredTickets.filter(ticket => ticket.Etat === selectedTicketStatus) :
        filteredTickets;

    // Get unique feature titles for the selected task's tickets
    const uniqueFeatureTitles = [...new Set(filteredTicketsByStatus.flatMap(ticket =>
        ticket.Feature && ticket.Feature.titleF ? [ticket.Feature.titleF] : []
    ))];

    const chartData = {
        labels: uniqueFeatureTitles,
        datasets: [
            {
                data: uniqueFeatureTitles.map(featureTitle =>
                    filteredTicketsByStatus.filter(ticket => ticket.Feature && ticket.Feature.titleF === featureTitle).length
                ),
                backgroundColor: [
                    '#f8a2ca',
                    'rgb(85, 191, 240)',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#3F51B5',
                    '#00BCD4',
                    '#FF5722',
                ],
                hoverBackgroundColor: [
                    '#f8a2ca',
                    'rgb(85, 191, 240)',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#3F51B5',
                    '#00BCD4',
                    '#FF5722',
                ],
            },
        ],
    };

    return (
        <Box style={{ width: "390px", marginRight: '50px', marginTop: "25px" }}>
            <DashboardCard title="Tickets Per Feature" action={
                <>
                    <Select
                        labelId="task-dd"
                        id="task-dd"
                        value={selectedTask}
                        size="small"
                        onChange={handleChangeTask}
                    >
                        {taskOptions}
                    </Select>
                    <Select
                        labelId="ticket-status-dd"
                        id="ticket-status-dd"
                        value={selectedTicketStatus}
                        size="small"
                        onChange={handleChangeTicketStatus}
                    >
                        <MenuItem value="">All</MenuItem>
                        {ticketStatusOptions}
                    </Select>
                </>
            }>

                <Pie 
                    data={chartData}
                    width={50}  
                    height={50} 
                   
                />
            </DashboardCard>
        </Box>
    );
};

export default TicketsPerFeature;
