import React, { useEffect,useState} from 'react';
import { Avatar, Box, IconButton, TextField, Tooltip, Typography ,MenuItem, ListItem, Checkbox,Menu,Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getListTicketsByproject, updatingtickets } from 'src/JS/actions/Tickets';
import { useParams } from 'react-router';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import image from '../../assets/images/checking.webp';
import image1 from '../../assets/images/bugging.png';
import ResponsibleMenu from './ResponsibleMenu';
import { FcApproval } from "react-icons/fc";
import Featureupdate from './Featureupdate';
import { getprojectbyid } from 'src/JS/actions/project';
import { getAllFeatures } from 'src/JS/actions/feature';
import PriorityMenu from './PriorityMenu';
import EditIcon from '@mui/icons-material/Edit';
import { GrClose, GrCheckmark } from 'react-icons/gr';
import LongMenu from 'src/components/Menu/menu';
import DeleteTicketModal from './DeleteTicketModal';
import FeatureMenu  from 'src/components/Menu/FeatureMenu';
import TasksMenu from 'src/components/Menu/TasksMenu';
import { set } from 'lodash';
import { IoFlagSharp  } from "react-icons/io5";


export default function Table() {
  const dispatch = useDispatch();
    const { projectId } = useParams();
    const [MenuResponsible, setMenuResponsible] = useState({});
    const [editModes, setEditModes] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isopening, setisopening] = useState({});

    //menu feature
    const handleMenuToggle = (event) => {
        setIsMenuOpen((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget); 
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false); 
        setAnchorEl(null); 
    };



    const allTickets = useSelector((state) => state.ticketsReducer.tickets.filter((ticket) => ticket.TaskId?.StartDate != null));


    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedTasks, setselectedTasks] = useState([]);



    //edit mode
    const [description, setDescription] = useState({});

    const handleUpdateDescription = (ticketId) => {
        setDescription((prevPriorityMap) => ({
            ...prevPriorityMap,
            [ticketId]: description,
        }));
        dispatch(updatingtickets(projectId,ticketId, { Description: description }));
        handleCancel(ticketId);
    };

    const handleEditClick = (ticketid) => {
        const updatedEditModes = { ...(editModes || {}) };

        Object.keys(updatedEditModes).forEach((otherTicketId) => {
            updatedEditModes[otherTicketId] = false;
        });

        // Open the clicked ticket for editing
        updatedEditModes[ticketid] = true;

        setEditModes(updatedEditModes);
    };

    const handleCancel = () => {
        setEditModes((prevEditModes) => {
            const updatedEditModes = { ...prevEditModes };
            Object.keys(prevEditModes).forEach((ticketIndex) => {
                updatedEditModes[ticketIndex] = false;
            });
            return updatedEditModes;
        });
    };

    const handleResponsible = (event, ticketId) => {
        setMenuResponsible({ ...MenuResponsible, [ticketId]: event.currentTarget });
    };
    
    const handleclosedResponsible = (ticketId) => {
        setMenuResponsible({ ...MenuResponsible, [ticketId]: null });
    };

    useEffect(() => {
        dispatch(getListTicketsByproject(projectId));
        dispatch(getprojectbyid(projectId));
        dispatch(getAllFeatures(projectId));

       
    }, [dispatch, projectId, ]);

    const handleAssignResponsible = (userId, ticketId) => {
        dispatch(updatingtickets(projectId,ticketId, { ResponsibleTicket: userId }));

        handleclosedResponsible(ticketId);
    };

    const toDoTickets = allTickets.filter(ticket => ticket.Etat === 'TO DO' );
    const InprogressTickets = allTickets.filter(ticket => ticket.Etat === 'IN_PROGRESS');
    const doneTickets = allTickets.filter(ticket => ticket.Etat === 'DONE');

    

    const handleFeatureSelect = (featureid, ticketid) => {
        dispatch(updatingtickets(projectId,ticketid, { Feature: featureid }));

    };

    const handleupdatePriority = (ticketId, PrioritytValue) => {
        dispatch(updatingtickets(projectId,ticketId, { Priority: PrioritytValue }));

    };

    const handlePriority = (event, ticketId) => {
        setisopening({ ...isopening, [ticketId]: event.currentTarget });
    };

    const handleclosing = (ticketId) => {
        setisopening({ ...isopening, [ticketId]: null });
    };
    const options = ['delete ticket','delete indicator'];

    const [openDeleting, setDeletemodall] = useState(false);

    const handleCloseDeleting = () => {
      set(setDeletemodall(false));
    };
  

 
    const renderTicketBlock = (ticket) => (
        <Box style={{  borderRadius: '1px', marginTop: '20px', width: '280px', height: '170px', opacity: "500%" ,backgroundColor:editModes[ticket._id]  ? '#F0F3FC' : 'white'}}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                {ticket.Priority === 'Low' && <KeyboardDoubleArrowDownIcon style={{ width: "15px", marginRight: "5px", marginLeft: "10px", marginTop: "10px", color: "#5b356fcc" }} />}
                {ticket.Priority === 'High' && <KeyboardDoubleArrowUpIcon style={{ width: "15px", marginRight: "5px", marginLeft: "10px", marginTop: "10px", color: "rgb(35 145 115)" }} />}
                {ticket.Priority !== 'Low' && ticket.Priority !== 'High' && <DensityMediumIcon style={{ width: "15px", marginRight: "5px", marginLeft: "10px", marginTop: "10px", color: "#c1535c" }} />}
                <Typography sx={{ fontSize: '13px', color: ticket.Priority === 'Low' ? '#5b356fcc' : ticket.Priority === 'High' ? 'rgb(35 145 115)' : '#c1535c', fontFamily: 'revert', fontWeight: 'bold', marginRight: '8px', marginTop: "10px" }}
                                                        onClick={(event) => handlePriority(event, ticket._id)}
                                                        >{ticket.Priority} Priority</Typography>
                                                   
                           <LongMenu   options={options} MoreVertIconstyle={{marginLeft:"125px",marginTop:"10px"}}  setDeletemodall={setDeletemodall} ticketId={ticket._id} /> 

           </span>

          
            <PriorityMenu  isopened={isopening[ticket._id]}
                                        handleclosed={() => handleclosing(ticket._id)}
                                        currentPriority={ticket.Priority}
                                        setPriority={(PrioritytValue) =>
                                          handleupdatePriority(ticket._id, PrioritytValue)
                                        }/>
                                         { editModes[ticket._id] ? (
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                       
                                        <div style={{ position: 'relative', width: 'fit-content' }}>
                                          <TextField
                                            defaultValue={ticket.Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            
                                            InputProps={{
                                              style: {
                                                height: '40px',
                                                width: '260px',
                                                border: ' 1px solid #5283FD',
                                                marginLeft:"10px",
                                                marginTop:"10px",
                                              },
                                            }}
                                          />

                                          <div
                                            style={{
                                              position: 'absolute',
                                              bottom: '-35px',
                                              left: '210px',
                                              display: 'flex',
                                              
                                            }}
                                          >
                                            <Box display="flex" alignItems="center">
                                              <IconButton
                                                style={{
                                                  width: '25px',
                                                  height: '25px',
                                                  backgroundColor: 'white',
                                                  borderRadius: '0',
                                                  opacity: 2000,
                                                  marginRight: '8px',
                                                }}
                                                onClick={() => handleCancel( ticket._id)}
                                              >
                                                <GrClose
                                                  style={{ color: 'black', fontSize: '20px' }}
                                                />
                                              </IconButton>
                                              <IconButton
                                                style={{
                                                  width: '25px',
                                                  height: '25px',
                                                  backgroundColor: 'white',
                                                  borderRadius: '0',
                                                  opacity: 2000,

                                                }}
                                                onClick={() => {
                                                  handleUpdateDescription(ticket._id);
                                                  
                                                }}>                                             
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
  sx={{
    cursor: 'pointer',
    '&:hover': {
      background: '#f0f0f0',
      '& .edit-icon': {
        display: 'flow', 
      }
    },
    fontSize: '13px',
    color: 'black',
    fontFamily: 'revert',
    fontWeight: '200',
    marginRight: '8px',
    marginLeft: '15px',
    marginTop: '10px',
    position: 'relative' 
  }}
>
  {ticket.Description}
  <Tooltip title="edit ticket">
    <IconButton className="edit-icon" sx={{ display: 'none', position: 'absolute', top: '50%', left: '100%', transform: 'translate(-100%, -50%)' }}>
      <EditIcon  onClick={() => handleEditClick(ticket._id)}
       style={{ width: '15px', height: '13px', borderRadius: '0',marginTop:"10px" }} />
    </IconButton>
  </Tooltip>
</Typography>)}


<Featureupdate ticket={ticket} ticketid={ticket._id} 
    handleFeatureSelect={(featureid) => handleFeatureSelect(featureid, ticket._id)}
    typographyStyle={{fontSize: '13px', width: '120px', textAlign: 'center', borderRadius: '3px', height: 'fit-content', fontWeight: 'bold', marginBottom: '3px', fontFamily: 'sans-serif', marginLeft: '10px', marginTop: "10px", color: ticket.Feature?.iconF === '#7CA1F3' ? '#385DB0' : ticket.Feature?.iconF === '#CDF7D4' ? '#51A15F' : ticket.Feature?.iconF === '#ffc0ca' ? '#CC596B' : 'black', backgroundColor: ticket.Feature?.iconF}}/>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: "20px", marginLeft: '15px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={ticket.Type === 'Bug' ? image1 : image} alt="icon" style={{ width: '15px', height: '15px', marginRight: '10px' }} />
        <Typography>{ticket.Type}</Typography>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {ticket.Etat === 'DONE' && (
            <div style={{ fontSize: '22px', marginRight: '10px' }}>
                <FcApproval />
            </div>
        )}
        {ticket.flag && (
            <IoFlagSharp style={{color:"#c04747", marginRight: '10px'}} />
        )}
        <Tooltip title={`Responsible: ${ticket.ResponsibleTicket ? ticket.ResponsibleTicket.firstName : 'Not assigned'}`}>
            <Avatar 
                onClick={(event) => handleResponsible(event, ticket._id)}
                src={ticket?.ResponsibleTicket?.firstName} sx={{ bgcolor: ticket?.ResponsibleTicket ? '#42a5f5' : "#3c597c", width: 25, height: 25, fontSize: '11px', marginRight: '10px'}}>
                {ticket?.ResponsibleTicket?.firstName && ticket?.ResponsibleTicket?.firstName.substring(0, 2).toUpperCase()}
            </Avatar>
        </Tooltip>
        <ResponsibleMenu
            ResponsibleTicket={ticket?.ResponsibleTicket?.firstName}
            Responsibleid={ticket?.ResponsibleTicket?._id}
            projectId={projectId}
            handleAssignResponsible={(userId) => handleAssignResponsible(userId, ticket._id)}
            MenuResponsible={MenuResponsible[ticket._id]}
            handleclosedResponsible={() => handleclosedResponsible(ticket._id)}
        />
        <DeleteTicketModal  openDeleting={openDeleting[ticket._id]} handleCloseDeleting={handleCloseDeleting} ticketId={ticket._id}  ticketname={ticket.Description}/> 
    </div>
</div>

        </Box>
    );

    return (
        <PageContainer title="Dashboard" description="This is Table">
            <DashboardCard title="All Tasks">
           
            <FeatureMenu handleMenuToggle={handleMenuToggle} handleMenuClose={handleMenuClose} isMenuOpen={isMenuOpen} anchorEl={anchorEl} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}/> 
            <TasksMenu selectedTasks={selectedTasks} setselectedTasks={setselectedTasks}  /> 
           
                <Box style={{ display: 'flex' ,overflow:"auto",maxHeight :"500px"}}>
                    <Box style={{ marginRight: '30px', }}>
                    <Box style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', marginBottom: '20px',width:"250px" }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '20px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#7ca1f35e', marginRight: '10px' , marginBottom: '10px'}}></div>
                                <Typography sx={{ fontSize: '13px', color: '#5d5d5d', fontFamily: 'revert', fontWeight: 'bold', marginBottom: '10px' }}>To Do <span style={{marginLeft:"5px"}}>  {toDoTickets.length} </span></Typography>
                            </div>
                        </Box>
                        {toDoTickets
   .filter(ticket => 
    (selectedFeatures.length === 0 || selectedFeatures.includes(ticket.Feature.titleF)) &&
    (selectedTasks.length === 0 || selectedTasks.includes(ticket.TaskId.TaskName))
  ).map(ticket => renderTicketBlock(ticket))}

                    </Box>

                    {/*  In Progress Tickets */}
                    <Box style={{ marginRight: '30px' }}>
                    <Box style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', marginBottom: '20px',width:"280px"  }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '20px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'rgb(227 226 226 / 55%)', marginRight: '10px' ,marginBottom: '10px'}}></div>
                                <Typography sx={{ fontSize: '13px', color: '#5d5d5d', fontFamily: 'revert', fontWeight: 'bold',marginBottom: '10px' }}>In Progress <span style={{marginLeft:"5px"}}>  {InprogressTickets.length}</span></Typography>
                            </div>
                        </Box>
                        {InprogressTickets   .filter(ticket => 
    (selectedFeatures.length === 0 || selectedFeatures.includes(ticket.Feature.titleF)) &&
    (selectedTasks.length === 0 || selectedTasks.includes(ticket.TaskId.TaskName))
  ).map(ticket => renderTicketBlock(ticket))}
                    </Box>

                    {/*  Completed Tickets */}
                    <Box>
                    <Box style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', marginBottom: '20px',width:"280px"  }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '20px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'rgb(214 247 210)', marginRight: '10px'  ,marginBottom: '10px' }}></div>
                                <Typography sx={{ fontSize: '13px', color: '#5d5d5d', fontFamily: 'revert', fontWeight: 'bold',marginBottom: '10px' }}>Completed  <span style={{marginLeft:"5px"}}>  {doneTickets.length}</span></Typography>
                            </div>
                        </Box>
                        {doneTickets.filter(ticket => 
    (selectedFeatures.length === 0 || selectedFeatures.includes(ticket.Feature.titleF)) &&
    (selectedTasks.length === 0 || selectedTasks.includes(ticket.TaskId.TaskName))
).map(ticket => renderTicketBlock(ticket))}

                    </Box>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
}