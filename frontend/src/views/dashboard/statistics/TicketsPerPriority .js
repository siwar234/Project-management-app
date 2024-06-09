import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { Box } from "@mui/material";

const TicketsPerPriority = () => {
    const tasks = useSelector((state) => state.tasksReducer.alltasks);
    const firstTaskName = tasks.length > 0 ? tasks[0].TaskName : '';

    const [selectedTask, setSelectedTask] = useState(firstTaskName);

    useEffect(() => {
        if (tasks.length > 0) {
            const firstTaskName = tasks[0].TaskName;
            setSelectedTask(firstTaskName);
            updateChartData(firstTaskName);
        } else {
            // If tasks array is empty, handle it here (optional)
            setSelectedTask('');
            setChartData({
                categories: [],
                series: [{ name: 'Number of Tickets', data: [] }]
            });
        }
    }, [tasks]);
    

    const [chartData, setChartData] = useState({
        categories: [],
        series: [{ name: 'Number of Tickets', data: [] }]
    });

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
            background: '#f4f4f4',
            foreColor: '#333'
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                horizontal: false,
                dataLabels: { position: 'top' }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}`,
            offsetY: -20,
            style: { fontSize: '12px', colors: ['#304758'] }
        },
        xaxis: {
            categories: [],
            position: 'bottom',
            labels: {
                offsetY: 0,
                style: { colors: ['#304758'], fontSize: '12px' }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            title: { text: 'Priority', style: { fontSize: '14px', color: '#304758' } }
        },
        yaxis: {
            min: 0,
            max: 0,
            forceNiceScale: false,
            tickAmount: 1,
            labels: { style: { colors: ['#304758'], fontSize: '12px' } },
            title: { text: 'Number of Tickets', style: { fontSize: '14px', color: '#304758' } }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            }
        },
        colors: ['#55bff0'],
        tooltip: { theme: 'dark', x: { show: true }, y: { formatter: (val) => `${val}` } }
    });

    useEffect(() => {
        if (tasks.length > 0) {
            const firstTaskName = tasks[0].TaskName;
            setSelectedTask(firstTaskName);
            updateChartData(firstTaskName);
        }
    }, [tasks]); 

    useEffect(() => {
        if (selectedTask) {
            updateChartData(selectedTask);
        }
    }, [selectedTask]);

    const handleChangeTask = (event) => {
        const taskName = event.target.value;
        setSelectedTask(taskName);
    };

    const updateChartData = (taskName) => {
        const filteredTickets = tasks.find(task => task.TaskName === taskName)?.tickets || [];
        const ticketsWithoutDone = filteredTickets.filter(ticket => ticket.Etat !== 'DONE');
        const uniquePriorities = [...new Set(ticketsWithoutDone.map(ticket => ticket.Priority))];
        const ticketCountsByPriority = uniquePriorities.map(priority => ({
            priority,
            count: ticketsWithoutDone.filter(ticket => ticket.Priority === priority).length
        }));

        const categories = ticketCountsByPriority.map(data => data.priority);
        const data = ticketCountsByPriority.map(data => data.count);
        const maxTickets = Math.max(...data, 0);

        setChartData({
            categories: categories,
            series: [{ name: 'Number of Tickets', data: data }]
        });

        setChartOptions(prevOptions => ({
            ...prevOptions,
            xaxis: { ...prevOptions.xaxis, categories: categories },
            yaxis: { ...prevOptions.yaxis, max: maxTickets }
        }));
    };

    const tasksWithTickets = tasks.filter(task =>
        task.tickets.length > 0 && task.tickets.some(ticket => ticket.Etat !== 'DONE')
    );

    const taskOptions = tasksWithTickets.map((task, index) => (
        <MenuItem key={index} value={task.TaskName}>{task.TaskName}</MenuItem>
    ));

    return (
        <Box style={{ width: "550px", marginRight: '50px', marginLeft: "80px", marginTop: "20px" }}>
            <DashboardCard title="Tickets Per Priority" action={
         <Select
         labelId="taskk-dd"
         id="taskk-dd"
         defaultValue={selectedTask} // Use defaultValue instead of value
         size="small"
         onChange={handleChangeTask}
     >
         {taskOptions}
     </Select>
           
            }>
                <Chart
                    options={chartOptions}
                    series={chartData.series}
                    type="bar"
                    height="350px"
                    width="100%"
                />
            </DashboardCard>
        </Box>
    );
};

export default TicketsPerPriority;
