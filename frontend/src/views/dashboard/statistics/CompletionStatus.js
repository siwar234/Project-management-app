import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Box, Card, CardContent, Typography, CardActions } from "@mui/material";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CompletionStatus = () => {
    const tasks = useSelector((state) => state.tasksReducer.alltasks);

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

        const donePercentage = ((doneCount / totalCount) * 100).toFixed(0);
        const inProgressPercentage = ((inProgressCount / totalCount) * 100).toFixed(0);

        return {
            labels: ['Completed', 'In Progress'],
            datasets: [{
                data: [donePercentage, inProgressPercentage],
                backgroundColor: ['#8a72aedb', '#a482dab8']
            }]
        };
    };

    const taskCompletionData = getTaskCompletionData(tasks);
    const donePercentage = taskCompletionData.datasets[0].data[0];
    const inProgressPercentage = taskCompletionData.datasets[0].data[1];

    return (
        <DashboardCard title="All tasks by Completion status">
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
  {tasks.reduce((total, task) => total + task.tickets.length, 0) > 0 ? `${donePercentage}%` : '0%'}
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
  {tasks.reduce((total, task) => total + task.tickets.length, 0) > 0 ? `${inProgressPercentage}%` : '0%'}
</Typography>
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#a482dab8", height: "10px" }}>
                                <Typography style={{ marginBottom: '25px', marginLeft: "15px", color: "#fff", fontWeight: "bold", fontSize: "12px" }}>Incompleted</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </DashboardCard>
    );
};

export default CompletionStatus;
