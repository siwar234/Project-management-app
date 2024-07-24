import React, { useState, useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { Slider } from './Tickets/Slider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getprojectbyuser } from 'src/JS/actions/project';
import { ArchivedProjects } from './components/ArchiveProject/ArchivedProjects';
import { getallticket } from 'src/JS/actions/Tickets';
import SamplePage from '../sample-page/SamplePage';

function Workspace() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const dispatch = useDispatch();

  const handleOpening = () => {
    setOpen(true);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const user = useSelector((state) => state.userReducer.user);
  const projects = useSelector((state) => state.projectReducer.projects);
  const tickets = useSelector((state) => state.ticketsReducer.alltickets);

  const unactiveProjects = projects.filter(project => !project?.archiver);
  const activeProjects = projects.filter(project => project?.archiver);

  const userId = user._id;

  useEffect(() => {
    dispatch(getprojectbyuser(userId));
    dispatch(getallticket(userId));
  }, [dispatch, userId]);

  // Check if the user is an admin
  const isAdmin =  user?.Roles?.find(role => role.name === 'admin');
  

  return (
    <PageContainer title="Workspace" description="This is workspace">
      {isAdmin ? (
        <SamplePage /> 
      ) : (
        <DashboardCard title="Your Workspace">
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography style={{ fontWeight: "bold", fontSize: "15px" }}>Recent Projects</Typography>
            <Link to="/projects/viewprojects" style={{ textDecoration: "none", color: "blue" }}>
              <Typography style={{ fontSize: "14px" ,color:"#5D87FF"}}>View All Projects</Typography>
            </Link>
          </Box>

          <Box
            sx={{
              width: { sm: '500%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
              height: '250px',
              marginTop: '45px',
              marginLeft: '50px',
            }}
          >
            <Slider
              handlecreate={handleOpening}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              projects={unactiveProjects}
              userId={userId}
              user={user}
              tickets={tickets}
            />
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="project tabs">
              <Tab label="Archived Projects" />
              <Tab label="Assigned to Me" />
              <Tab label="Favorites" />
            </Tabs>
          </Box>

          <Box sx={{ padding: 2 }}>
            {activeTab === 0 && (
              <>
                {activeProjects.filter(
                  project => project.archiver === true && project.Responsable?._id === userId
                ).length === 0 ? (
                  <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <img src="https://atlassianblog.wpengine.com/wp-content/uploads/2018/05/archiving-in-jira_featured@2x.png" alt="No Archived Projects" style={{ width: '250px', height: '150px' }} />
                    <Typography style={{fontSize:"15px" ,color:"#27459d"}}>No archived projects yet</Typography>
                  </Box>
                ) : (
                  <ArchivedProjects
                    user={user}
                    projects={activeProjects.filter(
                      project => project.archiver === true && project.Responsable?._id === userId
                    )}
                    userId={userId}
                    tickets={tickets}
                  />
                )}
              </>
            )}
            {activeTab === 1 && <Typography>Assigned to Me Content</Typography>}
            {activeTab === 2 && <Typography>Favorites Content</Typography>}
          </Box>
        </DashboardCard>
      )}
    </PageContainer>
  );
}

export default Workspace;
