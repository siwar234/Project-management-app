import React, { useState } from 'react';
import image5 from '../../../../assets/images/icons/projection.png';
import { Chip, IconButton, Tooltip } from '@mui/material';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import UnarchiveProject from './UnarchiveProject';
import { unarchiveProject } from 'src/JS/actions/project';
import { useDispatch } from 'react-redux';

export const ArchivedProjects = ({ projects, tickets, onUnarchive }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();

  const handleOpenModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  

  const handleUnarchive = () => {
    if (selectedProjectId) {
      dispatch(unarchiveProject(selectedProjectId));
      handleCloseModal();
    }
  };

  return (
    <div>
      {projects && projects.map((project) => {
        const filteredTickets = tickets.filter(ticket => ticket.projectId._id === project._id && ticket.Etat === "DONE");
        const openTickets = tickets.filter(ticket => ticket.projectId._id === project._id && ticket.Etat === "IN_PROGRESS");

        const doneTicketsCount = filteredTickets.length;
        const openTicketsCount = openTickets.length;

        return (
          <div key={project._id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <img
              src={project.Icon || image5}
              alt={`${project.projectName} icon`}
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
            />
            <div style={{ marginRight: '20px' }}>
              <div style={{ fontWeight: 'bold' }}>{project.projectName}</div>
              <div style={{ color: 'gray', fontSize: "13px" }}>{project.type}</div>
              <div style={{ color: 'black' }}>
                Done Tickets:
                <Chip label={doneTicketsCount} style={{ width: "35px", height: "15px", marginLeft: '10px', marginRight: "10px", justifyContent: 'center' }} />
                Open Tickets:
                <Chip label={openTicketsCount} style={{ width: "35px", height: "15px", marginLeft: '10px', justifyContent: 'center' }} />
              </div>
            </div>
            <Tooltip title='Restore project'>
              <IconButton onClick={() => handleOpenModal(project._id)} style={{ marginLeft: 'auto', color: "#77c5c8" }}>
                <UnarchiveIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      })}
      <UnarchiveProject
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleUnarchive={handleUnarchive}
      />
    </div>
  );
};
