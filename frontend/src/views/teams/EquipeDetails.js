import * as React from 'react';
import { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box, Button, Typography, Tooltip, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEquipe, fetchEquipesbyId, getLinks, leaveEquipe } from 'src/JS/actions/equipe';
import Card from '@mui/material/Card';
import image from '../../assets/images/jira.png';
import { useParams } from 'react-router';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsExclamationCircleFill } from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import DeleteEquipeModal from './DeleteEquipeModal';
import InvitationModal from './InvitationModal';
import LeaveTeamModal from './LeaveTeamModal';
import {  useNavigate } from 'react-router-dom';
import { EquipeUpdate } from './EquipeUpdate';
import UpdateModal from './UpdateModal';
import LinkModal from './LinkModal';


const EquipeDetails = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //menu
  const options = ['team settings', 'delete a team', 'leave the team'];
  //
  const user = useSelector((state) => state.userReducer.user._id);
  const [emails, setEmails] = useState([]);
  

 
  //updtaModal
  const [openupdateModal, setOpenUpdateModal] = useState(false);

  const handleopenupdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleclosingModalUpdate = () => {
    setOpenUpdateModal(false);
    
  };


  //

  //invitation modal

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmails(['']); 
    
  };
  //


  //leave team modal
  const [leavemodal, setLeaveModal] = useState(false);

  const openleaveModal = () => {
    setLeaveModal(true);
  };

  const closing = () => {
    setLeaveModal(false);
  
  }


    const handleconfirmleaving = () => {
      handleLeaveEquipe(equipes._id,user);
      closing()
    };
  
   
    const handleLeaveEquipe = (equipeId,id) => {
      dispatch(leaveEquipe(equipeId,id));
    };
    

//
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  useEffect(() => {
    dispatch(fetchEquipesbyId(id))

  }, [dispatch]);



  const handleDeleteEquipe = (id) => {
    dispatch(deleteEquipe(id));
  };
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

 //delete team modal 
  const handleOpenConfirmation = () => {
    setOpenDeleteConfirmation(true);
    handleCloseMenu();
  };

  const handleCloseConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteEquipe(equipes?._id); 
    handleCloseConfirmation();
  };
//
  const ITEM_HEIGHT = 48;

  const equipes = useSelector((state) => state.equipeReducer.equipe);
  const ownerFirstName = equipes?.owner ? equipes.owner?.firstName : '';
  const OwnerProfilePicture = equipes?.owner ? equipes.owner?.profilePicture : '';
  const ownerid = equipes?.owner ? equipes.owner?._id : '';
  const equipeId=equipes?._id

  if (!equipes) {
    navigate('/team/teams');
  }

  //link modal
  const [openLink, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClosed = () => setOpen(false);


   //fetch links
   const links = useSelector((state) => state.equipeReducer.links); 


   useEffect(() => {
    if (equipeId) {
      dispatch(getLinks(equipeId)); 
    }
  }, [dispatch, equipeId]);


  return (
    <PageContainer backgroundColor="#EEEEEE">
      <DashboardCard style={{ width: '10px' }} backgroundColor="#EEEEEE">
        <Box position="relative" mb={5}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="12.75rem"
            borderRadius="1rem"
            sx={{
              backgroundImage: ` url(${'https://atlassianblog.wpengine.com/wp-content/uploads/2023/02/1120x545@2x-1.png'})`,
              backgroundSize: 'cover',

              backgroundPosition: '50%',
              overflow: 'hidden',
            }}
          />
        </Box>
        <Box display="flex" flexDirection={'row'}>
          <Box display="flex" flexDirection={'column'}>
            <Typography
              marginLeft="30px"
              color={'black'}
              fontSize={'18px'}
              fontWeight={'bold'}
              mb={2}
            >
              {equipes?.NameEquipe}
            </Typography>
            <Box display={'flex'} flexDirection={'column'}>
           <EquipeUpdate equipeId={id}  />
              <Box display="flex" flexDirection={'row'}>
                <Button
                  variant="contained"
                  onClick={handleOpenModal}
                  sx={{
                    border: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '12px',
                    color: 'black',
                    backgroundColor: '#434a4f1f',
                    minWidth: '5px',
                    width: '220px',
                    MaxHeight: '5px',
                    fontcolor: 'black',
                    padding: '1 px',
                    marginTop: ' 15px',
                    justifyContent: 'center',
                    marginLeft: '20px',
                  }}
                >
                  invite people
                </Button>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  style={{ marginTop: '15px' }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                      borderRadius:"0"
                    },
                  }}
                >
                  {options.map((option) =>
    (option === 'delete a team' && ownerid !== user) || (option === 'leave the team' && ownerid === user) ? null : (
                      <MenuItem
                        key={option}
                        selected={option === 'team settings'}
                        onClick={() => {
                          if (option === 'delete a team') {
                            handleOpenConfirmation();
                          }if (option === 'leave the team') 
                            {
                              openleaveModal();}
                              if (option === 'team settings') 
                            {
                              handleopenupdateModal();}
                           else {
                            handleClose();
                          }
                        }}
                      >
                        {option}
                      </MenuItem>
                    ),
                  )}
                </Menu>
                
                <DeleteEquipeModal
                  open={openDeleteConfirmation}
                  handleClose={handleCloseConfirmation}
                  handleConfirm={handleDeleteConfirmed}
                />
                 <LeaveTeamModal
                  leavemodal={leavemodal}
                  closing={closing}
                  confirm={handleconfirmleaving}
                />
              </Box>
            </Box>
            <Card
              sx={{
                mt: 5.5,
                mb: 3,
                mx: 3,
                py: 2,
                px: 2,
                color: 'white',
                width: '250px',
                opacity: '5',
                borderRadius: '0.2rem',
                height: '300px',
                position: 'relative',
              }}
            >
              <Box style={{ width: '90%', float: 'left', marginLeft: '10px' }}>
                <Typography style={{ fontWeight: 'bold', color: 'black' }} mb={2}>
                  Members{' '}
                  <Tooltip
                    width="10px"
                    title="You must be invited or approved by the owner to join this team"
                    arrow
                    style={{ maxWidth: '50px' }} 
                  >
                    <span style={{ color: '#777777', marginLeft: '5px' }}>
                      <BsExclamationCircleFill style={{ marginLeft: '108px' }} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color={'gray'} mb={3} style={{ fontWeight: 'bold' }}>
                  {equipes?.members && equipes?.members.length !== undefined
                    ? equipes.members.length > 1
                      ? `${equipes.members.length} members`
                      : `${equipes.members.length} member`
                    : 'No members'}
                </Typography>
                <Divider fontWeight={'bold'} />
                <Typography
                  variant="body2"
                  color={'gray'}
                  mt={2}
                  mb={1}
                  style={{ fontWeight: 'bold' }}
                >
                  Team Owner
                </Typography>
                <Box display="flex" flexDirection={'column'}>
                  <Tooltip
                    className="customtooltip"
                    style={{ backgroundColor: 'rgba(231, 236, 251, 0.85)' }}
                    title={ownerFirstName}
                  >
                    <Avatar
                      justifyContent="left"
                      style={{ marginLeft: '2px', fontSize:"14px" ,backgroundColor: '#42a5f5',width:"35px",height:"35px"
                    }}
                      alt="Your Name"
                      src={OwnerProfilePicture}
                    >
                      {ownerFirstName?.substring(0, 2).toUpperCase()}
                      </Avatar>
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color={'gray'}
                    mt={2}
                    mb={0.5}
                    style={{ fontWeight: 'bold' }}
                  >
                    members
                  </Typography>
                  <Box display="flex" flexDirection={'row'}>
                    <AvatarGroup max={4} style={{ justifyContent: 'left', marginTop: '10px',width:"35px",height:"35px" }}>
                      {equipes?.members &&
                        equipes?.members?.map((member) => (
                          <Tooltip
                            className="customtooltip"
                            key={member.memberId._id}
                            style={{ backgroundColor: 'blue', opacity: 0.9 }}
                            title={member.memberId.firstName}
                          >
                            <Avatar
                              alt={member?.memberId.firstName}
                              src={member?.memberId.profilePicture}
                              justifyContent="left"
                              style={{ marginTop: '10px',fontSize:"14px" ,backgroundColor: 'rgb(78 123 159)',width:"35px",height:"35px" }}
                            >
                               {member?.memberId?.firstName.substring(0,2).toUpperCase()}
                            </Avatar>
                          </Tooltip>
                        ))}
                    </AvatarGroup>{' '}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box display="flex" flexDirection={'column'}>
            <Card
              sx={{
                mt: 5.5,
                mb: 3,
                mx: 3,
                py: 2,
                px: 2,
                color: 'black',
                width: '480px',
                opacity: '0.8',
                borderRadius: '0.2rem',
                height: '110px',
                marginLeft: '210px',
                background: 'linear-gradient(to right, #F3E5AB, #f3a298)',
              }}
            >
              <Box display={'flex'} flexDirection="row">
                <Box style={{ width: '50%', float: 'left', marginTop: '3px' }}>
                  <img
                    src={image}
                    alt="Team"
                    style={{ width: '175px', height: '70px', marginRight: '15px' }}
                  />{' '}
                </Box>
                <Box style={{ width: '90%', float: 'left', marginLeft: '10px' }}>
                  <Typography style={{ fontWeight: 'bold', color: 'black' }} mb={2}>
                    Your team is ready to start
                  </Typography>
                  <Typography variant="body2" color={'black'} style={{ fontWeight: 'bold' }}>
                    You can start exploring your team’s activity and members.
                  </Typography>
                </Box>
              </Box>
            </Card>
            {links && links.length > 0 ? (
        links.map((link, index) => (
            <Card
              sx={{
                mt: 2.5,
                mb: 2,
                mx: 3,
                py: 2,
                px: 2,
                color: 'white',
                width: '480px',
                opacity: '2',
                borderRadius: '0.2rem',
                height: '149px',
                marginLeft: '210px',
                background: 'white',
              }}
            >
              <Box display={'flex'} flexDirection="row">
                <Box style={{ width: '50%', float: 'left', marginTop: '1px' }}>
                  <img
                    src={
                      'https://wac-cdn.atlassian.com/dam/jcr:a332fab9-95b5-41f3-9007-3d729316ba1d/build-brand-spot-illo-02.svg?cdnVersion=1529'
                    }
                    alt="Team"
                    style={{ width: '194px', height: '111px', marginRight: '10px' }}
                  />{' '}
                </Box>
                <Box style={{ width: '90%', float: 'left', marginLeft: '10px' }}>
               
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6" color={'black'} fontWeight={'bold'}>
              {link.title}
            </Typography>
            <Typography variant="body2" color={'black'}>
              {link.description}
            </Typography>
            <Box display="flex" alignItems="center">
              <img src="link-icon.png" alt="Link Icon" style={{ width: '24px', marginRight: '8px' }} />
              <a href={link.webAddress} target="_blank" rel="noopener noreferrer">
                {link.webAddress}
              </a>
            </Box>
          </Box>
        ))
      ) : ( 
        <>
                  <Typography color={'black'} fontWeight={'bold'} mb={2}>
                    Share the knowledge
                  </Typography>
                  <Typography variant="body2" color={'black'} fontWeight={'bold'}>
                    Add links to let your team know where your works.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                      border: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: '#434a4f1f',
                      minWidth: '10px',
                      MaxHeight: '5px',
                      fontcolor: 'black',
                      padding: '1 px',
                      marginTop: ' 15px',
                    }}
                  >
                    add a link
                  </Button>
                  <LinkModal open={openLink} handleClose={handleClosed} equipeId={equipes._id} />
                  </>
               </Box> 
              </Box>
            </Card>)} 
          </Box>
        </Box>
        <InvitationModal openModal={openModal} handleclosing={handleCloseModal} id={id} />
        <UpdateModal  openupdateModal={openupdateModal}  equipeId={id} handleclosingModalUpdate={handleclosingModalUpdate}/>
      </DashboardCard>
    </PageContainer>
  );
};

export default EquipeDetails;
