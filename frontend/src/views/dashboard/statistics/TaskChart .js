import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'; 
import { CircularProgress, Typography } from '@mui/material'; 

const TaskChart = () => {
  const tasks = useSelector((state) => state.tasksReducer.alltasks); 
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [chartInstance, setChartInstance] = useState(null); 
  const chartRef = useRef(null);

  useEffect(() => {
    if (tasks.length > 0) {
      // Filter tasks with state 'TO DO'
      const filteredTasks = tasks.filter(task => task.tickets && task.tickets.etat === 'TO DO'); 
      setFilteredTasks(filteredTasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (filteredTasks.length > 0 && chartRef.current) {
      const chartInstance = new window.Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Number of Tasks in "TO DO" State'],
          datasets: [{
            label: 'Number of Tasks',
            data: [filteredTasks.length],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                callback: (value, index, values) => {
                  return '';
                }
              }
            }
          },
          plugins: {
            avatarLabels: {
              render: (chart) => {
                renderAvatarsOnYAxis(chart, filteredTasks);
              }
            }
          }
        }
      });

      setChartInstance(chartInstance); 
    }
  }, [filteredTasks]);

  const renderAvatarsOnYAxis = (chart, tasks) => {
    const yAxis = chart.scales['y'];
    const tickLabels = yAxis.ticks.map((tick, index) => {
      const task = tasks[index];
      return task ? `<img src="${task.tickets.responsibleticket.profilePicture}" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%;" />` : '';
    });
    yAxis.ticks = tickLabels;
    chart.update();
  };

  return (
    <div className="task-chart">
      <Typography variant="h5" gutterBottom>
        Task Chart
      </Typography>
      {filteredTasks.length === 0 ? (
        <CircularProgress />
      ) : (
        <canvas ref={chartRef} width="400" height="400"></canvas>
      )}
    </div>
  );
};

export default TaskChart;
