import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { IoFlagSharp } from 'react-icons/io5';

import EditIcon from '@mui/icons-material/Edit';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Button, TextField, MenuItem, Menu, Typography } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CreateTastsModal from './Tasks/CreateTastsModal';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getprojectbyid, updateProjects } from 'src/JS/actions/project';
import { useParams } from 'react-router';
import LongMenu from 'src/components/Menu/menu';
import { createTickets, updatetickets, updateticketsFeature } from 'src/JS/actions/Tickets';
import { close, getTasks, unrelatedtask, updateSecondGrid, updateTicketInTask } from 'src/JS/actions/tasks';

import AddIcon from '@mui/icons-material/Add';
import WorkflowMenu from './Tickets/WorkflowMenu';
import image from '../../assets/images/checking.webp';
import image1 from '../../assets/images/bugging.png';
import PriorityMenu from './Tickets/PriorityMenu';
import { GrClose, GrCheckmark } from 'react-icons/gr';
import UpdateTaskModal from './Tasks/UpdateTaskModal';
import DeleteTaskModal from './Tasks/DeleteTaskModal';
import { set } from 'lodash';
import TerminateTask from './Tasks/TerminateTask';
import ResponsibleMenu from './Tickets/ResponsibleMenu';

import FeaturesMenu from './Features/FeaturesMenu';
import MenuFeature from './Features/MenuFeature';
import Featureupdate from './Features/Featureupdate';
import TicketDetail from './Tickets/TicketDetail';
import { FcLink } from 'react-icons/fc';
import io from 'socket.io-client';

const socket = io('http://localhost:4101'); 

const Dashboard = () => {
  const [openTasks, setOpenTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setopenUpdateModal] = useState(false);

  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [ticketText, setTicketText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [ticketType, setTicketType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [anchorEls, setAnchorEls] = useState({});

  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(getprojectbyid(projectId));
      dispatch(getTasks(projectId)); 
    
      socket.on('ticketUpdated', (updatedTicket) => {
        // console.log('Updated Ticket Received:', updatedTicket);
        dispatch(updateTicketInTask(updatedTicket));
      });
    socket.on('updateProjects', (updatedProjects) => {
      dispatch(updateProjects(updatedProjects));
    });


    return () => {
      socket.off('updateProjects');
    };
  }, [dispatch, projectId]);
  const options = ['edit task', 'delete task','Add To a discussion space' ,'relate task'];

  const handleClicked = (event, ticketId) => {
    setAnchorEls({ ...anchorEls, [ticketId]: event.currentTarget });
  };

  const handleCloseing = (ticketId) => {
    setAnchorEls({ ...anchorEls, [ticketId]: null });
  };

  //update responsible
  const [responsible, setResponsible] = useState('');

  const handleAssignResponsible = (userId, ticketId) => {
    setResponsible(userId);
    dispatch(updatetickets(projectId, userid, ticketId, { ResponsibleTicket: userId }));
    handleclosedResponsible();
  };

  //
  //menu responsible
  const [MenuResponsible, setMenuResponsible] = useState({});

  const handleResponsible = (event, ticketId) => {
    setMenuResponsible({ ...MenuResponsible, [ticketId]: event.currentTarget });
  };
  const handleclosedResponsible = (ticketId) => {
    setMenuResponsible({ ...MenuResponsible, [ticketId]: null });
  };

  //menu priority
  const [isopened, setisopened] = useState({});
  // const opened = Boolean(isopened);

  const handlePriority = (event, ticketId) => {
    setisopened({ ...isopened, [ticketId]: event.currentTarget });
  };

  const handleclosed = (ticketId) => {
    setisopened({ ...isopened, [ticketId]: null });
  };
  //

  const initialTaskData = {
    TaskName: '',
    Duration: '',
  };

  const [taskData, setTaskData] = useState({ initialTaskData });
  //create modal
  const handleopen = () => {
    setOpenModal(true);
  };

  const handleClosing = () => {
    setOpenModal(false);
    setTaskData(initialTaskData);
  };

  //update modal

  const [taskStarted, setTaskStarted] = useState(false);

  const handleopenUpdate = (taskId) => {
    setopenUpdateModal((prevState) => ({
      ...prevState,
      [taskId]: true,
    }));
  };

  const handleUpdateClosing = () => {
    setopenUpdateModal(false);
  };

  const handleTaskStart = (taskId) => {
    setTaskStarted((prevState) => ({
      ...prevState,
      [taskId]: true,
    }));
  };
  //
  const user = useSelector((state) => state.userReducer.user);
  const userid = user._id;
  const tasks = useSelector((state) => state.tasksReducer.tasks);

  const handleOpenTask = (taskId) => {
    setOpenTasks((prevOpenTasks) => {
      if (prevOpenTasks.includes(taskId)) {
        return prevOpenTasks.filter((id) => id !== taskId);
      } else {
        return [...prevOpenTasks, taskId];
      }
    });
  };

  const handleAddTicketClick = (taskId) => {
    setSelectedTask(taskId);
    setIsAddingTicket(true);
  };

  const handleTicketTextChange = (event, taskId) => {
    setTicketText({ ...ticketText, [taskId]: event.target.value });
  };

  const handleAddTicketSubmit = async (taskId, ticketType) => {
    const description = ticketText[taskId];

    if (!description) {
      console.error('Description is required');
      return;
    }

    const ticketData = {
      Description: description,
      Etat: 'TO DO',
      TaskId: taskId,
      Type: ticketType || '',
    };

    const dataWithProjectId = { ...ticketData, projectId: projectId };

    await dispatch(createTickets(dataWithProjectId, projectId));

    // dispatch(getTasks(projectId));

    setTicketText({ ...ticketText, [taskId]: '' });
  };

  const isTaskOpen = (taskId) => openTasks.includes(taskId);

  //emty
  const [showBacklog, setShowBacklog] = useState(false);
  const handleClick = () => {
    setShowBacklog(!showBacklog);
  };

  //typeticker
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  }; //
  //hover
  const [hoveredRow, setHoveredRow] = useState({ taskId: null, index: null });

  const handleMouseEnter = (taskId, index) => {
    setHoveredRow({ taskId, index });
  };

  const handleMouseLeave = () => {
    setHoveredRow({ taskId: null, index: null });
  };
  //edit ticket
  const [editModes, setEditModes] = useState({});
  const handleEditClick = (taskId, ticketIndex) => {
    const updatedEditModes = { ...(editModes || {}) };

    // Close all tickets in all tasks
    Object.keys(updatedEditModes).forEach((taskID) => {
      updatedEditModes[taskID] = Object.fromEntries(
        Object.keys(updatedEditModes[taskID]).map((index) => [index, false]),
      );
    });

    // Open the clicked ticket in the current task
    updatedEditModes[taskId] = updatedEditModes[taskId] || {};
    updatedEditModes[taskId][ticketIndex] = true;

    setEditModes(updatedEditModes);
  };

  const handleCancel = (taskId, ticketIndex) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [taskId]: {
        ...prevEditModes[taskId],
        [ticketIndex]: false,
      },
    }));
  };

  //delete Modal
  const [openDelete, setDeletemodal] = useState(false);

  const handleCloseDelete = () => {
    set(setDeletemodal(false));
  };

  const [etat, setEtat] = useState('');

  const handleupdateEtat = (ticketId, etatValue) => {
    setEtat((prevEtatMap) => ({
      ...prevEtatMap,
      [ticketId]: etatValue,
    }));
    dispatch(updatetickets(projectId, userid, ticketId, { Etat: etatValue }));
    // dispatch(getTasks(projectId));
  };

  //priortiy menu

  const [priority, setPriority] = useState('');

  const handleupdatePriority = (ticketId, PrioritytValue) => {
    setPriority((prevPriorityMap) => ({
      ...prevPriorityMap,
      [ticketId]: PrioritytValue,
    }));
    dispatch(updatetickets(projectId, userid, ticketId, { Priority: PrioritytValue }));
    // dispatch(getTasks(projectId));
  };

  //terminateModal
  const [openTerminate, setOpenTerminate] = useState(false);

  const handleOpenTerminate = (taskId) => {
    setOpenTerminate((prevState) => ({
      ...prevState,
      [taskId]: true,
    }));
  };

  const handleCloseTerminate = () => {
    setOpenTerminate(false);
  };

  //
  const [description, setDescription] = useState({});

  const handleUpdateDescription = (taskid, ticketIndex, ticketId) => {
    setDescription((prevPriorityMap) => ({
      ...prevPriorityMap,
      [ticketId]: description,
    }));
    dispatch(updatetickets(projectId, userid, ticketId, { Description: description }));
    // dispatch(getTasks(projectId));
    handleCancel(taskid, ticketIndex);
  };

  //checked features

  const [checkedFeatures, setCheckedFeatures] = useState([]);

  const handleFeatureCheckboxChange = (titleF) => {
    if (checkedFeatures.includes(titleF)) {
      setCheckedFeatures(checkedFeatures.filter((feature) => feature !== titleF));
    } else {
      setCheckedFeatures([...checkedFeatures, titleF]);
    }
  };

  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureSelect = (featureid, ticketid) => {
    setSelectedFeature(featureid);
    dispatch(updateticketsFeature(projectId, ticketid, { Feature: featureid }));
  };

  useEffect(() => {
    dispatch(close());
  }, [dispatch]);

  const isSecondGridOpen = useSelector((state) => state.tasksReducer.isSecondGridOpen);

  const toggleTicketGrid = (ticketId, taskId) => {
    const ticket = tasks
      .find((task) => task._id === taskId)
      ?.tickets.find((ticket) => ticket._id === ticketId);
    dispatch(updateSecondGrid(ticketId, taskId, ticket));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${day} ${month}`;
  };

  // Function to get end date from start date and duration

  const parseDuration = (durationStr) => {
    const weeks = parseInt(durationStr.split(' ')[0]);
    return weeks * 7 * 24 * 60 * 60 * 1000; // Convert weeks to milliseconds
  };

  const calculateEndDate = (startDateString, durationStr) => {
    const startDate = new Date(startDateString);
    const durationMilliseconds = parseDuration(durationStr);

    const endDate = new Date(startDate.getTime() + durationMilliseconds);

    return endDate; 
  };

  

  const handleUnrelatedTask = (taskId) => {
    dispatch(unrelatedtask(taskId, projectId));
  };

  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <DashboardCard title="BackLog">
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
      
          <FeaturesMenu
            onFeatureCheckboxChange={handleFeatureCheckboxChange}
            checkedFeatures={checkedFeatures}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        </Box>
        <Box mt={8} display={'flex'} flexDirection={'row'}>
          <Grid
            container
            spacing={3}
            display={'flex'}
            flexDirection={'row'}
            style={{
              overflowY: 'auto',
              flex: isSecondGridOpen ? '0.7' : '1',
              transition: 'flex 0.5s',
              maxHeight: '700px',
            }}
          >
            {tasks
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((task, key) => (
                <Box
                  key={task._id}
                  mb={4.5}
                  style={{
                    minWidth: '100%',
                    width: isSecondGridOpen ? '102%' : '95%',
                    flex: isSecondGridOpen ? '0.6' : '1',
                    transition: 'width 0.5s',
                    marginRight: '28px',
                  }}
                >
                  <Box display={'flex'} flexDirection={'row'}>
                    <Button
                      id="fade-button"
                      onClick={() => handleOpenTask(task._id)}
                      style={{
                        fontWeight: '800',
                        marginRight: '28px',
                        width: '900px',
                        height: '38px',
                        border: isTaskOpen(task._id)
                          ? '2px solid #7caaff'
                          : '2px solid transparent',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left',
                        marginLeft: '25px',
                        color: '#534747',
                        marginTop: '2px',
                      }}
                    >
                      <IoIosArrowDown
                        style={{
                          marginLeft: '9px',
                          marginTop: '0px',
                          fontWeight: 'bold',
                          transform: isTaskOpen(task._id) ? 'rotateX(180deg)' : 'none',
                        }}
                      />
                      <span style={{ marginRight: '8px', fontSize: isSecondGridOpen ? '12px' :'15px', marginLeft: '6px' }}>
                        {task.TaskName}{' '}
                        {task.StartDate && task.EndDate && (
                          <span style={{ fontSize: '12px', marginLeft: '12px', color: '#55576c' }}>
                            {formatDate(task.StartDate)} - {formatDate(task.EndDate)}
                          </span>
                        )}
                        {task.StartDate && !task.EndDate && task.Duration && (
                          <span style={{ fontSize: '12px', marginLeft: '12px', color: '#55576c' }}>
                            {formatDate(task.StartDate)} -{' '}
                            {formatDate(calculateEndDate(task.StartDate, task.Duration))}
                          </span>
                        )}
                        <span style={{ fontSize: '12px', marginLeft: '10px' }}>
                          ({task.tickets.filter((ticket) => ticket.TaskId === task._id).length}{' '}
                          tickets)
                        </span>
                      </span>{' '}
                      {task.related && (
                        <>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '25px',
                              marginLeft: '12px',
                              color: '#55576c',
                              marginTop: '2px',
                            }}
                          >
                            <FcLink
                              onClick={() => handleUnrelatedTask(task._id)}
                              style={{ marginRight: '5px' }}
                            />{' '}
                          </span>
                          {!isSecondGridOpen && (
                            <span style={{ fontSize: '12px', marginLeft: '10px' }}>
                              {'to'} {task.related && task.related.TaskName}
                            </span>
                          )}
                        </>
                      )}
                    </Button>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip
                        title={`To Do (${
                          task.tickets.filter((ticket) => ticket.Etat === 'TO DO').length
                        } of ${task.tickets.length})`}
                      >
                        <div
                          style={{
                            backgroundColor: '#42a5f5',
                            fontSize: '8px',
                            color: '#fff',
                            marginRight: '5px',
                            marginTop: '2px',
                            borderRadius: '8px',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '5px',
                          }}
                        >
                          {task.tickets.filter((ticket) => ticket.Etat === 'TO DO').length}
                        </div>
                      </Tooltip>
                      <Tooltip
                        title={`In Progress (${
                          task.tickets.filter((ticket) => ticket.Etat === 'IN_PROGRESS').length
                        } of ${task.tickets.length})`}
                      >
                        <div
                          style={{
                            backgroundColor: '#bbb2b3',
                            color: '#fff',
                            fontSize: '8px',
                            marginRight: '5px',
                            marginTop: '2px',
                            borderRadius: '8px',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '5px',
                          }}
                        >
                          {task.tickets.filter((ticket) => ticket.Etat === 'IN_PROGRESS').length}
                        </div>
                      </Tooltip>
                      <Tooltip
                        title={`Done (${
                          task.tickets.filter((ticket) => ticket.Etat === 'DONE').length
                        } of ${task.tickets.length})`}
                      >
                        <div
                          style={{
                            backgroundColor: '#9179c3',
                            color: '#fff',
                            fontSize: '8px',
                            marginRight: '5px',
                            marginTop: '2px',
                            borderRadius: '8px',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '5px',
                          }}
                        >
                          {task.tickets.filter((ticket) => ticket.Etat === 'DONE').length}
                        </div>
                      </Tooltip>
                    </div>
                    <Button
                      variant="contained"
                      onClick={
                        task.StartDate
                          ? () => handleOpenTerminate(task._id)
                          : () => handleopenUpdate(task._id)
                      }
                      sx={{
                        border: 'none',
                        fontWeight: 'bold',
                        fontFamily: 'inherit',
                        fontSize: isSecondGridOpen ? '12px' : '12px',
                        color: 'black',
                        backgroundColor: '#434a4f1f',
                        minWidth: '5px',
                        width: isSecondGridOpen ? '250px' : '150px',
                        height: '35px',
                        MaxHeight: '5px',
                        fontcolor: 'black',
                        padding: '1 px',
                        marginTop: '0px',
                        justifyContent: 'center',
                        marginLeft: '20px',
                      }}
                    >
                      {task.StartDate ? 'Terminate Task' : 'Start Task'}
                    </Button>
                    <LongMenu
                      setDeletemodal={setDeletemodal}
                      taskId={task?._id}
                      options={options}
                      projectId={projectId}
                      task={task}
                      
                    />
                  </Box>

                  {isTaskOpen(task._id) && (
                    <Box
                      mb={3}
                      mt={2}
                      style={{
                        marginLeft: '25px',
                        overflow: 'auto',
                        minWidth: '50%',
                        width: isSecondGridOpen ? '91%' : '95%',
                        flex: isSecondGridOpen ? '0.6' : '1',
                        transition: 'width 0.5s',
                      }}
                    >
                      <TableContainer style={{ minWidth: '100%' }}>
                        <Table
                          style={{ backgroundColor: '#fff', borderSpacing: 0, maxWidth: '100%' }}
                        >
                          <TableBody>
                            {task.tickets
                              .filter(
                                (ticket) =>
                                  selectedFeatures.length === 0 ||
                                  selectedFeatures.includes(ticket.Feature?.titleF),
                              )
                              .map((ticket, index) => (
                                <TableRow
                                  key={index}
                                  style={{
                                    border: '1px solid #d1d1d1',
                                    cursor: 'pointer',
                                    backgroundColor:
                                      hoveredRow.taskId === task._id && hoveredRow.index === index
                                        ? '#ebebebc7'
                                        : ticket.flag
                                        ? '#dde0f0d9'
                                        : 'transparent',
                                  }}
                                  onMouseEnter={() => handleMouseEnter(task._id, index)}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  <TableCell style={{ width: '100%', border: '1px solid #d1d1d1' }}>
                                    <Box
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      {editModes[task._id] && editModes[task._id][index] ? (
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <img
                                            src={ticket.Type === 'Bug' ? image1 : image}
                                            alt="icon"
                                            style={{
                                              width: '18px',
                                              height: '18px',
                                              marginRight: '15px',
                                            }}
                                          />
                                          <div
                                            style={{ position: 'relative', width: 'fit-content' }}
                                          >
                                            <TextField
                                              defaultValue={ticket.Description}
                                              onChange={(e) => setDescription(e.target.value)}
                                              fullWidth
                                              InputProps={{
                                                style: {
                                                  height: '40px',
                                                  width: isSecondGridOpen ? '120px' : '250px',
                                                  borderColor: 'blue',
                                                },
                                              }}
                                            />

                                            <div
                                              style={{
                                                position: 'absolute',
                                                bottom: '-35px',
                                                left: isSecondGridOpen ? '55px' : '190px',
                                                display: 'flex',
                                              }}
                                            >
                                              <Box display="flex" alignItems="center">
                                                <IconButton
                                                  style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    backgroundColor: '#e1e1e1',
                                                    borderRadius: '0',
                                                    opacity: 25,
                                                    marginRight: '8px',
                                                  }}
                                                  onClick={() => handleCancel(task._id, index)}
                                                >
                                                  <GrClose
                                                    style={{ color: 'black', fontSize: '20px' }}
                                                  />
                                                </IconButton>
                                                <IconButton
                                                  style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    backgroundColor: '#e1e1e1',
                                                    borderRadius: '0',
                                                    opacity: 50,
                                                  }}
                                                  onClick={() => {
                                                    handleUpdateDescription(
                                                      task._id,
                                                      index,
                                                      ticket._id,
                                                    );
                                                  }}
                                                >
                                                  <GrCheckmark
                                                    style={{ color: 'black', fontSize: '20px' }}
                                                  />
                                                </IconButton>
                                              </Box>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <Typography
                                          onClick={() => toggleTicketGrid(ticket._id, task._id)}
                                          style={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                              background: '#f0f0f0',
                                            },
                                            marginLeft: '15px',
                                            color: '#46545f',
                                            fontFamily: 'sans-serif',
                                            fontSize: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <img
                                            src={ticket.Type === 'Bug' ? image1 : image}
                                            alt="icon"
                                            style={{
                                              width: '18px',
                                              height: '18px',
                                              marginRight: '15px',
                                            }}
                                          />
                                          <Tooltip title={ticket.Description}>
                                            {ticket.Description.length > 26
                                              ? `${ticket.Description.substring(0, 26)}...`
                                              : ticket.Description}
                                          </Tooltip>

                                          {hoveredRow.taskId === task._id &&
                                            hoveredRow.index === index && (
                                              <>
                                                <IconButton>
                                                  <>
                                                    <Tooltip title={'edit icon'}>
                                                      <EditIcon
                                                        onClick={() =>
                                                          handleEditClick(task._id, index)
                                                        }
                                                        style={{
                                                          width: '15px',
                                                          height: '15px',
                                                          marginLeft: isSecondGridOpen
                                                            ? '5px'
                                                            : '15px',
                                                          borderRadius: '0',
                                                        }}
                                                      />
                                                    </Tooltip>
                                                  </>
                                                </IconButton>

                                                <MenuFeature
                                                  ticketid={ticket._id}
                                                  task={task.StartDate}
                                                  feature={ticket.Feature}
                                                  isSecondGridOpen={isSecondGridOpen}
                                                />
                                              </>
                                            )}
                                        </Typography>
                                      )}

                                      <Featureupdate
                                        ticket={ticket}
                                        ticketid={ticket._id}
                                        typographyStyle={{
                                          fontSize: '13px',
                                          width: '120px',
                                          textAlign: 'center',
                                          borderRadius: '3px',
                                          height: 'fit-content',
                                          fontWeight: 'bold',
                                          marginBottom: '3px',
                                          fontFamily: 'sans-serif',
                                          marginLeft: isSecondGridOpen ? '-95px' : '60px',
                                          color:
                                            ticket.Feature?.iconF === '#7CA1F3'
                                              ? '#385DB0'
                                              : ticket.Feature?.iconF === '#CDF7D4'
                                              ? '#51A15F'
                                              : ticket.Feature?.iconF === '#ffc0ca'
                                              ? '#CC596B'
                                              : '#878787',
                                          backgroundColor: ticket.Feature?.iconF,
                                        }}
                                        isSecondGridOpen={isSecondGridOpen}
                                        handleFeatureSelect={(featureid) =>
                                          handleFeatureSelect(featureid, ticket._id)
                                        }
                                      />

                                      <Box
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Button
                                          aria-controls={
                                            anchorEls[ticket._id] ? 'long-menu' : undefined
                                          }
                                          aria-expanded={Boolean(anchorEls[ticket._id])}
                                          aria-haspopup="true"
                                          onClick={(event) => handleClicked(event, ticket._id)}
                                          style={{
                                            fontSize: '10px',
                                            width: 'fit-content',
                                            textAlign: 'center',
                                            borderRadius: '3px',
                                            height: '25px',
                                            fontWeight: 'bold',
                                            backgroundColor:
                                              ticket.Etat === 'TO DO'
                                                ? '#7ca1f35e'
                                                : ticket.Etat === 'IN_PROGRESS'
                                                ? 'rgb(227 226 226 / 55%)'
                                                : 'rgb(214 247 210)',

                                            marginRight: isSecondGridOpen ? '30px' : '70px',

                                            color:
                                              ticket.Etat === 'TO DO'
                                                ? '#5d87ff'
                                                : ticket.Etat === 'IN_PROGRESS'
                                                ? 'rgb(107 107 107)'
                                                : 'rgb(12 119 26)',
                                            fontFamily: 'system-ui',
                                          }}
                                        >
                                          <span>{ticket.Etat}</span>
                                          <IoIosArrowDown
                                            style={{
                                              marginTop: '1px',
                                              fontSize: '12px',
                                              marginLeft: '5px',
                                              fontWeight: 'bolder',
                                            }}
                                          />
                                        </Button>
                                        <WorkflowMenu
                                          anchorEl={anchorEls[ticket._id]}
                                          handleCloseing={() => handleCloseing(ticket._id)}
                                          setEtat={(etatValue) =>
                                            handleupdateEtat(ticket._id, etatValue)
                                          }
                                          currentEtat={ticket.Etat}
                                        />
                                        {ticket.flag && (
                                          <IoFlagSharp
                                            style={{ color: '#c04747', marginRight: '10px' }}
                                          />
                                        )}
                                        <Button
                                          aria-controls={isopened[ticket._id] ? 'menu' : undefined}
                                          aria-expanded={Boolean(isopened[ticket._id])}
                                          aria-haspopup="true"
                                          onClick={(event) => handlePriority(event, ticket._id)}
                                          style={{
                                            width: 'fit-content',
                                            textAlign: 'center',
                                            borderRadius: '3px',
                                            height: '25px',
                                            fontWeight: 'bold',
                                            backgroundColor:
                                              ticket.Priority === 'Low'
                                                ? '#9f8fef7d'
                                                : ticket.Priority === 'High'
                                                ? '#cdf7d4'
                                                : '#ffc0ca',

                                            marginRight: '70px',

                                            color:
                                              ticket.Priority === 'Low'
                                                ? '#5b356fcc'
                                                : ticket.Priority === 'High'
                                                ? 'rgb(35 145 115)'
                                                : '#c1535c',
                                            fontFamily: 'system-ui',
                                          }}
                                        >
                                          <span style={{ fontSize: '13px' }}>
                                            {ticket.Priority}
                                          </span>
                                          <IoIosArrowDown
                                            style={{
                                              marginTop: '5px',
                                              fontSize: '10px',
                                              marginLeft: '5px',
                                              fontWeight: 'bold',
                                            }}
                                          />
                                        </Button>
                                        <PriorityMenu
                                          isopened={isopened[ticket._id]}
                                          handleclosed={() => handleclosed(ticket._id)}
                                          currentPriority={ticket.Priority}
                                          setPriority={(PrioritytValue) =>
                                            handleupdatePriority(ticket._id, PrioritytValue)
                                          }
                                        />
                                        <Tooltip
                                          title={`Responsible: ${
                                            ticket.ResponsibleTicket
                                              ? ticket.ResponsibleTicket.firstName
                                              : 'Not assigned'
                                          }`}
                                        >
                                          <Avatar
                                            src={ticket?.ResponsibleTicket?.profilePicture}
                                            onClick={(event) =>
                                              handleResponsible(event, ticket._id)
                                            }
                                            sx={{
                                              bgcolor: ticket?.ResponsibleTicket
                                                ? '#42a5f5'
                                                : '#3c597c',
                                              width: 30,
                                              height: 30,
                                              fontSize: '11px',
                                              marginRight: isSecondGridOpen ? '5px' : '10px',
                                            }}
                                          >
                                            {ticket?.ResponsibleTicket?.firstName &&
                                              ticket?.ResponsibleTicket?.firstName
                                                .substring(0, 2)
                                                .toUpperCase()}
                                          </Avatar>
                                        </Tooltip>
                                        <ResponsibleMenu
                                          ResponsibleTicket={ticket?.ResponsibleTicket?.firstName}
                                          responsible={ticket?.ResponsibleTicket}
                                          Responsibleid={ticket?.ResponsibleTicket?._id}
                                          projectId={projectId}
                                          ticketId={ticket._id}
                                          handleAssignResponsible={(userId) =>
                                            handleAssignResponsible(userId, ticket._id)
                                          }
                                          MenuResponsible={MenuResponsible[ticket._id]}
                                          handleclosedResponsible={() =>
                                            handleclosedResponsible(ticket._id)
                                          }
                                        />
                                      </Box>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}

                            <TableRow
                              style={{
                                border:
                                  !isAddingTicket || selectedTask !== task._id
                                    ? '2px dashed #d1d1d1'
                                    : 'none',
                              }}
                            >
                              <TableCell
                                style={{
                                  width: '100%',
                                  padding:
                                    isAddingTicket && selectedTask === task._id ? 0 : undefined,
                                }}
                              >
                                {isAddingTicket && selectedTask === task._id ? (
                                  <form
                                    onSubmit={(event) => {
                                      event.preventDefault();
                                      handleAddTicketSubmit(task._id, ticketType);
                                    }}
                                  >
                                    <TextField
                                      fullWidth
                                      placeholder="What am I supposed to do?"
                                      value={ticketText[task._id] || ''}
                                      onChange={(event) => handleTicketTextChange(event, task._id)}
                                      style={{ height: '100%', margin: 0, borderRadius: '0' }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <IconButton
                                              onClick={(event) => handleMenuOpen(event)}
                                              style={{
                                                backgroundColor: menuAnchor
                                                  ? 'rgb(231 236 251 / 85%)'
                                                  : 'transparent',
                                                borderRadius: '0',
                                              }}
                                            >
                                              <img
                                                src={ticketType === 'Bug' ? image1 : image}
                                                alt="icon"
                                                style={{ width: '18px', height: '18px' }}
                                              />
                                              {menuAnchor ? (
                                                <IoIosArrowUp
                                                  style={{
                                                    width: '14px',
                                                    height: '14px',
                                                    marginLeft: '4px',
                                                    color: '#252323',
                                                    marginTop: '3px',
                                                    fontWeight: 'bolder',
                                                  }}
                                                />
                                              ) : (
                                                <IoIosArrowDown
                                                  style={{
                                                    width: '14px',
                                                    height: '14px',
                                                    marginLeft: '4px',
                                                    color: '#252323',
                                                    marginTop: '3px',
                                                    fontWeight: 'bolder',
                                                  }}
                                                />
                                              )}
                                            </IconButton>
                                            <Menu
                                              anchorEl={menuAnchor}
                                              open={Boolean(menuAnchor)}
                                              onClose={handleMenuClose}
                                            >
                                              <MenuItem
                                                style={{ width: '150px' }}
                                                onClick={() => setTicketType('Task')}
                                              >
                                                <img
                                                  src={image}
                                                  alt="icon"
                                                  style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    marginRight: '10px',
                                                  }}
                                                />
                                                <span
                                                  style={{
                                                    color: '#29292b',
                                                    fontFamily: 'sans-serif',
                                                  }}
                                                >
                                                  {' '}
                                                  Task
                                                </span>
                                              </MenuItem>
                                              <MenuItem
                                                style={{ width: '150px' }}
                                                onClick={() => setTicketType('Bug')}
                                              >
                                                <img
                                                  src={image1}
                                                  alt="icon"
                                                  style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    marginRight: '10px',
                                                  }}
                                                />
                                                <span
                                                  style={{
                                                    color: '#29292b',
                                                    fontFamily: 'sans-serif',
                                                  }}
                                                >
                                                  {' '}
                                                  Bug
                                                </span>
                                              </MenuItem>

                                              <Divider />
                                              <MenuItem
                                                onClick={handleMenuClose}
                                                style={{ fontFamily: 'sans-serif' }}
                                              >
                                                {' '}
                                                Manage ticket types
                                              </MenuItem>
                                            </Menu>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </form>
                                ) : (
                                  <Typography
                                    variant="body1"
                                    style={{ color: '#656565', fontFamily: 'system-ui', margin: 0 }}
                                  >
                                    Plan and Start your task after adding a ticket or by dropping a
                                    ticket here
                                  </Typography>
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography
                        mt={2}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '20px',
                          color: '#647299',
                          fontFamily: 'system-ui',
                          fontWeight: 'bold',
                        }}
                      >
                        {isAddingTicket && selectedTask === task._id ? null : (
                          <span style={{ marginRight: '18px', width: '10px', marginTop: '5px' }}>
                            <AddIcon style={{ width: '25px' }} />
                          </span>
                        )}
                        {isAddingTicket && selectedTask === task._id ? (
                          <Typography component="span" variant="body1"></Typography>
                        ) : (
                          <Typography
                            component="span"
                            variant="body1"
                            onClick={() => handleAddTicketClick(task._id)}
                          >
                            Add a ticket ...
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  )}

                  <UpdateTaskModal
                    openUpdateModal={openUpdateModal[task._id]}
                    handleUpdateClosing={handleUpdateClosing}
                    taksname={task.TaskName}
                    taskduration={task.Duration}
                    taskId={task._id}
                    handleTaskS
                    tart={handleTaskStart}
                  />
                  <DeleteTaskModal
                    taskId={task._id}
                    openDelete={openDelete[task._id]}
                    handleCloseDelete={handleCloseDelete}
                    taksname={task.TaskName}
                  />

                  <TerminateTask
                    openTerminate={openTerminate[task._id]}
                    handleCloseTerminate={handleCloseTerminate}
                    taskname={task.TaskName}
                    taskid={task._id}
                    openLength={
                      task.tickets.filter((ticket) => ticket.Etat === 'IN_PROGRESS').length
                    }
                    donelenght={task.tickets.filter((ticket) => ticket.Etat === 'DONE').length}
                    openTickets={task.tickets.filter((ticket) => ticket.Etat === 'IN_PROGRESS')}
                  />
                </Box>
              ))}
            <Box
              display={'flex'}
              flexDirection={'row'}
              style={{
                minWidth: '100%',
                width: isSecondGridOpen ? '80%' : '95%',
                flex: isSecondGridOpen ? '0.6' : '1',
                transition: 'width 0.5s',
              }}
            >
              <Button
                id="fade-button"
                onClick={handleClick}
                style={{
                  fontWeight: '800',
                  marginRight: '28px',
                  width: isSecondGridOpen ? '350px' : '760px',
                  MaxHeight: '5px',
                  height: '38px',
                  border: showBacklog ? '2px solid #7caaff' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'left',
                  marginLeft: '25px',
                  color: '#534747',
                  marginTop: '15px',
                }}
              >
                <IoIosArrowDown
                  style={{
                    marginLeft: '9px',
                    marginTop: '0px',
                    fontWeight: 'bold',
                    transform: showBacklog ? 'rotateX(180deg)' : 'none',
                  }}
                />
                <span style={{ marginRight: '8px', fontSize: '15px', marginLeft: '6px' }}>
                  Tasks <span style={{ fontSize: '12px', marginLeft: '10px' }}>0 (tickets)</span>
                </span>
              </Button>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="To Do (0 of 0)">
                  <div
                    style={{
                      backgroundColor: '#42a5f5',
                      fontSize: '8px',
                      color: '#fff',
                      marginRight: '5px',
                      marginTop: '20px',
                      borderRadius: '8px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    0
                  </div>
                </Tooltip>
                <Tooltip title="In Progress (0 of 0)">
                  <div
                    style={{
                      backgroundColor: '#bbb2b3',
                      color: '#fff',
                      fontSize: '8px',
                      marginRight: '5px',
                      marginTop: '20px',
                      borderRadius: '8px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    0
                  </div>
                </Tooltip>
                <Tooltip title="Done (0 of 0)">
                  <div
                    style={{
                      backgroundColor: '#9179c3',
                      color: '#fff',
                      fontSize: '8px',
                      marginRight: '5px',
                      marginTop: '20px',
                      borderRadius: '8px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    0
                  </div>
                </Tooltip>
              </div>
              <Button
                onClick={handleopen}
                variant="contained"
                sx={{
                  border: 'none',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  color: 'black',
                  backgroundColor: '#434a4f1f',
                  minWidth: '5px',
                  width: '140px',
                  height: '35px',

                  MaxHeight: '5px',
                  fontcolor: 'black',
                  padding: '1 px',
                  marginTop: ' 15px',
                  justifyContent: 'center',
                  marginLeft: '28px',
                }}
              >
                create Task
              </Button>
            </Box>
            {!showBacklog && (
              <div
                style={{
                  border: '2px dashed #b5b5b5',
                  backgroundColor: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  color: 'black',
                  minWidth: '5px',
                  width: isSecondGridOpen ? '540px' : '850px',
                  height: '300px',
                  MaxHeight: '100px',
                  fontcolor: 'black',
                  padding: '1px',
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '100px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                  <img
                    src="https://images.prismic.io/wwwadaptavistcom/95bcb402-d158-44fc-b665-cb0b5cc77899_AB-470_Microscope+_Power_Audit_sharing-intel.png?auto=compress,format&fit=max&w=600"
                    alt="addteam"
                    style={{ marginRight: '15px', width: '360px', height: '200px' }}
                  />
                  <span
                    style={{
                      fontSize: '15px',
                      marginTop: '20px',
                      marginLeft: '100px',
                      alignItems: 'center',
                      color: '#4a4343',
                    }}
                  >
                    View your work in a Board
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      marginTop: '20px',
                      marginLeft: '55px',
                      alignItems: 'center',
                      color: '#4a4343',
                    }}
                  >
                    Start creating Your Tasks and Tickets
                  </span>
                </div>
              </div>
            )}
          </Grid>
          <CreateTastsModal
            openModal={openModal}
            handleClosing={handleClosing}
            setTaskData={setTaskData}
            taskData={taskData}
            initialTaskData={initialTaskData}
            projectId={projectId}
          />

          <TicketDetail isSecondGridOpen={isSecondGridOpen} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
