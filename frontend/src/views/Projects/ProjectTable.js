import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DashboardCard from '../../components/shared/DashboardCard';
import { useSelector, useDispatch } from 'react-redux';
import { archiveProject, getprojectbyuser } from 'src/JS/actions/project';
import image5 from '../../assets/images/icons/projection.png'

import ArchiveProjectModal from '../dashboard/components/ArchiveProject/ArchiveModal';

const ProductPerformance = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const userId = useSelector((state) => state.userReducer.user?._id);

  useEffect(() => {
    if (userId) {
      dispatch(getprojectbyuser(userId));
    }
  }, [dispatch, userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ITEM_HEIGHT = 48;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const projects = useSelector((state) => state.projectReducer.projects);

  const activeProjects = projects.filter(project => !project?.archiver);

  const paginatedProjects = activeProjects.slice(startIndex, endIndex);

  const handleAvatarClick = (event) => {};

  const handlenavigate = (projectId) => {
    window.location.href = `/projects/details/${projectId}`;
  };

  const handleClick = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleArchive = () => {
    if (selectedProjectId) {
      dispatch(archiveProject(selectedProjectId));
      handleCloseModal();
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const options = ['Project settings', 'move to trash', 'archive project'];

  return (
    <Box sx={{ width: '100%' }}>
      <DashboardCard title="Projects">
        <Box sx={{ overflow: 'auto', width: { xs: '300px', sm: 'auto' } }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ paddingRight: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={{ paddingLeft: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Type
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Leader
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ borderTop: '2px solid #9B9A9A' }}>
              {paginatedProjects.map((project) => (
                <TableRow key={project?._id}>
                  <TableCell sx={{ paddingLeft: 0 }}>
                    <Box display={'flex'} flexDirection={'row'}>
                      <img
                        src={project.Icon || image5}
                        alt="projectimg"
                        style={{ width: '30px', height: '30px' }}
                      />
                      <Link
                        component={RouterLink}
                        to={`/dashboard/${project?._id}`}
                        variant="subtitle2"
                        fontWeight={600}
                        style={{ marginTop: '8px', marginLeft: '13px' }}
                      >
                        {project?.projectName}
                      </Link>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ paddingLeft: 0 }} align="left">
                    <Typography color="subtitle2" variant="subtitle2" fontWeight={400}>
                      {project?.type}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      <div style={{ display: 'flex', alignItems: 'right' }}>
                        <Avatar
                          src={project.Responsable?.profilePicture}
                          sx={{
                            bgcolor: '#42a5f5',
                            width: 30,
                            height: 30,
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                          onClick={handleAvatarClick}
                        >
                          {project.Responsable.firstName &&
                            project.Responsable.firstName.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <span style={{ marginLeft: '10px', marginTop: '5px' }}>
                          {project.Responsable.firstName}
                        </span>
                      </div>
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={anchorEl ? 'long-menu' : undefined}
                      aria-expanded={anchorEl ? 'true' : undefined}
                      onClick={(event) => handleClick(event, project._id)} 
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{ 'aria-labelledby': 'long-button' }}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' } }}
                    >
                      {options
                        .filter((option) => {
                          if (option === 'archive project') {
                            const project = projects.find(project => project._id === selectedProjectId);
                            return project && !project.archiver && project.Responsable._id === userId;
                          }
                          return true;
                        })
                        .map((option) => (
                          <MenuItem
                            key={option}
                            selected={option === 'Project settings'}
                            onClick={() => {
                              if (option === 'Project settings') {
                                handlenavigate(selectedProjectId);
                              } else if (option === 'archive project') {
                                handleOpenModal(); // Open modal instead of archiving directly
                              }
                              handleCloseMenu();
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <Pagination
            count={Math.ceil(projects.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </DashboardCard>
      <ArchiveProjectModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleArchive={handleArchive}
      />
    </Box>
  );
};

export default ProductPerformance;
