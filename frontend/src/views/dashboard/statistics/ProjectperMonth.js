import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { getprojectbyuser } from 'src/JS/actions/project';
import {Box} from "@mui/material"


const ProjectperMonth = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [selectedMonth, setSelectedMonth] = useState('');
    const [projectData, setProjectData] = useState([]);

    const user = useSelector((state) => state.userReducer.user);
    const projects = useSelector((state) => state.projectReducer.projects);

    useEffect(() => {
        if (user) {
            const userId = user._id;
            dispatch(getprojectbyuser(userId));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (selectedMonth === '') {
            setProjectData(projects);
        } else {
            const filteredProjects = projects.filter(project => {
                const projectDate = new Date(project.createdAt);
                const monthYear = projectDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                return monthYear === selectedMonth;
            });
            setProjectData(filteredProjects);
        }
    }, [projects, selectedMonth]);
    
    
    
    
    
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedMonth(selectedValue);
        console.log("Selected Month:", selectedValue);
    };
    
    const uniqueProjectMonths = [...new Set(projects.map(project => {
        const projectDate = new Date(project.createdAt);
        return projectDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }))];

    const monthOptions = uniqueProjectMonths.map((month, index) => {
        const monthYear = uniqueProjectMonths[index]; 
        return (
            <MenuItem key={monthYear} value={monthYear}>{month}</MenuItem>
        );
    });
    
    

    const chartData = projectData.reduce((acc, project) => {
        const projectDate = new Date(project.createdAt);
        const month = projectDate.getMonth() + 1; 
        const day = projectDate.getDate();
        const monthDay = `${day}-${month}`; 
    
        acc[monthDay] = (acc[monthDay] || 0) + 1;
        return acc;
    }, {});
    
    const maxProjects = Math.max(...Object.values(chartData));
    const tickAmount = Math.ceil(maxProjects);
    const chartOptions = {
        yaxis: {
            categories: Array.from({ length: tickAmount }, (_, i) => i),
            tickAmount: tickAmount,
        },
        colors: ['#55bff0'], 
    };
    
    console.log('Selected Month:', selectedMonth);
    console.log('Chart Data Keys:', Object.keys(chartData));
    
    const chartSeries = [{
        name: 'Number of Projects',
        data: Object.keys(chartData)
            .sort((a, b) => {
                const [monthA, dayA] = a.split('-').map(Number);
                const [monthB, dayB] = b.split('-').map(Number);
                // Sort by month first, then by day
                if (monthA !== monthB) {
                    return monthA - monthB;
                } else {
                    return dayA - dayB;
                }
            })
            .map(dateString => ({
                x: dateString,
                y: chartData[dateString]
            }))
    }];
    

    console.log('Chart Data:', chartData);

    return (
        <Box  style={{width:"460px",marginRight:'50px'}}>
        <DashboardCard title="Projects Per month"  action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={selectedMonth}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value="">All</MenuItem>
                {monthOptions}
            </Select>
        }>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height="320px"
            />
        </DashboardCard></Box>
    );
};

export default ProjectperMonth;
