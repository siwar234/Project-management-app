import React, { useState,useEffect } from "react";
import { Task, ViewMode, Gantt, StylingOption } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import "gantt-task-react/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTasks, updatetasks } from "src/JS/actions/tasks";
import { getAllFeatures, updatefeatures } from "src/JS/actions/feature";
import { blue } from "@mui/material/colors";
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const TaskListTable = ({
  rowWidth,
  rowHeight,
  onExpanderClick,
  handleAddTask
}) => {
  const features = useSelector((state) => state.featureReducer.features.filter(feature => feature.startDate && feature.endDate));
  const tasks = useSelector((state) => state.tasksReducer.tasks);

  return (
    <div style={{ border: "1px solid #dfe1e5" }}>
      {/* Rendering tasks */}
      {tasks.map((task, i) => (
        <div
          key={task._id} 
          style={{
            height: rowHeight,
            width: rowWidth,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            cursor: "auto",
            fontFamily: "sans-serif",
            background: "#ffffff",
            padding: 10,
            paddingLeft: 40,
            borderTop: "1px solid #dfe1e5"
          }}
        >
          <p>{task.TaskName}</p>
        </div>
      ))}
      
      {/* Rendering features */}
      {features.map((feature, i) => (
        <div
          key={feature._id} // Ensure each element has a unique key
          style={{
            height: rowHeight,
            width: rowWidth,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            cursor: "auto",
            fontFamily: "sans-serif",
            background: "#ffffff",
            padding: 10,
            paddingLeft: 40,
            borderTop: "1px solid #dfe1e5"
          }}
          onClick={() => onExpanderClick(feature)}
        >
          <p>{feature.titleF}</p>
        </div>
      ))}
    </div>
  );
};




export default function Timeline() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [view, setView] = useState(ViewMode.Day);
    const [isChecked, setIsChecked] = useState(true);
    const tasks = useSelector((state) => state.tasksReducer.tasks.filter(task => task.StartDate ));
    const [initializedTasks, setInitializedTasks] = useState([]);
    const [initializedFeatures, setInitializedFeatures] = useState([]);
    const features = useSelector((state) => state.featureReducer.features.filter(feature => feature.startDate && feature.endDate));
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [expandedTaskEndDate, setExpandedTaskEndDate] = useState(null);
    const [expandfeatueid, setExpandedfeatueid] = useState(null);
    const [expandedFeatureEndDate, setexpandedFeatureEndDate] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            if (projectId) {
                await dispatch(getTasks(projectId));
            }
            dispatch(getAllFeatures(projectId));
        };

        fetchTasks();
    }, [projectId, dispatch]);

    useEffect(() => {
      const newInitializedTasks = tasks.map((task) => {
          let startDate = null; // Initialize startDate with null
          if (task.StartDate) {
              startDate = new Date(task.StartDate);
          }
          let endDate = null;
          if (task.EndDate) {
              endDate = new Date(task.EndDate);
          } else if (task.Duration && startDate) {
              const durationMatch = task.Duration.match(/(\d+)\s+weeks?/);
              const weeks = durationMatch ? parseInt(durationMatch[1]) : 0;
              endDate = new Date(startDate.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
          }
          return {
              id: task._id,
              name: task.TaskName,
              start: startDate,
              end: endDate,
              styles: {
                  backgroundColor: "#DEEBFF",
              }
          };
      });
      setInitializedTasks(newInitializedTasks);
  }, [tasks]);
  

    useEffect(() => {
      
        const newInitializedFeatures = features.map((feature) => ({
          
            id: feature._id,
            name: feature.titleF,
            start: new Date(feature?.startDate),
            end: new Date(feature?.endDate),
            progress:feature.iconF,
            styles: {
                backgroundColor: feature?.iconF,
                Color: feature?.iconF === '#7CA1F3' ? '#385DB0' :
                    feature?.iconF === '#CDF7D4' ? '#51A15F' :
                        feature?.iconF === '#ffc0ca' ? '#CC596B' : 'black',
            }

        }));
        setInitializedFeatures(newInitializedFeatures);
    }, [features]);

    const handleTaskClick = (taskId, featureId) => {
      if (taskId === expandedTaskId &&  featureId === expandfeatueid) {
        setExpandedTaskId(null);
        setExpandedTaskEndDate(null);
      } else if (taskId) {
        const clickedTask = initializedTasks.find((task) => task.id === taskId);
        setExpandedTaskId(taskId);
        setExpandedTaskEndDate(clickedTask.end);
      } else if (featureId) {
        const clickedFeature = initializedFeatures.find((feature) => feature.id === featureId);
        setExpandedfeatueid(featureId);
        setExpandedTaskEndDate(clickedFeature.end);
      }
    };
    
  
    const handleTaskChange = (taskOrFeature) => {
      if ('id' in taskOrFeature && 'start' in taskOrFeature && 'end' in taskOrFeature && !('progress' in taskOrFeature)) {
        // It's a task
        const updatedTasks = initializedTasks.map((t) =>
          t.id === taskOrFeature.id ? { ...t, start: taskOrFeature.start, end: taskOrFeature.end } : t
        );
        setInitializedTasks(updatedTasks);
        dispatch(updatetasks(taskOrFeature.id, { StartDate: taskOrFeature.start, EndDate: taskOrFeature.end }));
      } else if ('id' in taskOrFeature && 'start' in taskOrFeature && 'end' in taskOrFeature && 'progress' in taskOrFeature) {
        // It's a feature
        const updatedFeatures = initializedFeatures.map((f) =>
          f.id === taskOrFeature.id ? { ...f, start: taskOrFeature.start, end: taskOrFeature.end } : f
        );
        setInitializedFeatures(updatedFeatures);
        dispatch(updatefeatures(projectId, taskOrFeature.id, { startDate: taskOrFeature.start, endDate: taskOrFeature.end }));
      }
    };
    
  
  
  

    let columnWidth = 105;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    }  if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }
    const commonRowHeight = 50; 

    return (
      <PageContainer title="Timeline" description="This is Timeline">
      <DashboardCard title="Timeline">
          <div className="Wrapper">
              <ViewSwitcher
                  onViewModeChange={(viewMode) => setView(viewMode)}
                  onViewListChange={setIsChecked}
                  isChecked={isChecked}
              />

              {(initializedTasks.length > 0 || initializedFeatures.length > 0) && (
                  <div style={{ maxHeight: "500px", overflowY: "auto" }}> 
                      <Gantt
                          tasks={[...initializedTasks, ...initializedFeatures]}
                          viewMode={view}
                          taskStyle={{ fill: blue }}
                          listWidth={columnWidth}
                          TaskListTable={(props) => (
                             
                                  <TaskListTable {...props} rowHeight={commonRowHeight} />
                              
                          )}
                          TaskListHeader={({ headerHeight }) => (
                              <div
                                  style={{
                                      height: headerHeight,
                                      fontFamily: "sans-serif",
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                      margin: 0,
                                      marginBottom: -1,
                                      display: "flex",
                                      alignItems: "center",
                                      border: "1px solid #e5e5e5",
                                      backgroundColor: "#f3f3f3c9",
                                  }}
                              ></div>
                          )}
                          rowHeight={commonRowHeight} 
                          todayColor="rgba(239, 239, 239, 0.6)"
                          timeStep={100}
                          columnWidth={columnWidth}
                          expandedTaskId={expandedTaskId}
                          expandfeatueid={expandfeatueid}
                          expandedFeatureEndDate={expandedFeatureEndDate}
                          expandedTaskEndDate={expandedTaskEndDate}
                          onTaskClick={handleTaskClick}
                          onDateChange={handleTaskChange}
                      />
                  </div>
              )}

          </div>
      </DashboardCard>
  </PageContainer>
    );
}
