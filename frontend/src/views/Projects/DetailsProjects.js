import React, { useState, useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box, Button, Typography,Avatar, TextField, MenuItem, Select } from '@mui/material';
import IconModal from './IconModal';
import image1 from '../../assets/images/icons/projection.png';

import { useDispatch, useSelector } from 'react-redux';
import { deleteproject, getprojectbyid, updateProject } from 'src/JS/actions/project';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteProjectModal from './DeleteProjectModal';
import {  useNavigate } from 'react-router-dom';

const options = [
  'move to trash'
];

const ITEM_HEIGHT = 48;

function DetailsProjects() {
 const dispatch = useDispatch();
 const navigate = useNavigate();

  const [openIcon, setopenIcon] = useState(false);
  const { projectId } = useParams();
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [customProjectType, setCustomProjectType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const [selectedResponsible, setSelectedResponsible] = useState('');
  const handleopenIcon = () => {
    setopenIcon(true);
  };



  const handleCloseIcon = () => {
    setopenIcon(false);
  };

  //deleteconfirmModal

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleOpenConfirmation = () => {
    setOpenDeleteConfirmation(true);
    
  };

  const handleCloseConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };



  //

//MENU delete
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDeleteproject = (projectId) => {
    dispatch(deleteproject(projectId));
  };

  const handleDeleteConfirmed = () => {
    handleDeleteproject(projects?._id); 
  };
//
  //

  useEffect(() => {
    dispatch(getprojectbyid(projectId));
  }, [dispatch]);



 const handleTypeChange = (event) => {
    setSelectedProjectType(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomProjectType('');
    }
  };


 
const user = useSelector((state) => state.userReducer.user);
const userid=user._id

  const handleSave = () => {
    const updatedData = {
        projectName: projectName,
        type: selectedProjectType === 'Other' ? customProjectType : selectedProjectType,
        Responsable: selectedResponsible,
        Icon: selectedIcon, 
    };
    dispatch(updateProject(projectId, updatedData,userid));
};

const handleSelectIcon = (iconUrl) => {
    setSelectedIcon(iconUrl);
  };


  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value); 
  };


  const projects = useSelector((state) => state.projectReducer.project);
  const equipes = projects?.Equipe
  const ownerFirstName = equipes?.owner ? equipes.owner?.firstName : '';
  const OwnerProfilePicture = equipes?.owner ? equipes.owner?.profilePicture : '';
  const ownerid = equipes?.owner ? equipes.owner?._id : '';
  useEffect(() => {
    if (projects) {
      setProjectName(projects.projectName || '');
      setSelectedProjectType(projects.type || ''); 
      setSelectedResponsible(projects.Responsable  || ''); 
      setSelectedIcon(projects.Icon  || ''); 


    }
  }, [projects]);

  if (!projects) {
    navigate('/projects/viewprojects');
  }

  return (
    <PageContainer backgroundColor="#EEEEEE">
      <DashboardCard style={{ width: '10px' }} backgroundColor="#EEEEEE">
        <Box position="relative" mb={5}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="10.75rem"
            borderRadius="1rem"
            sx={{
              backgroundImage: ` url(${'https://www.onyxcsg.com/wp-content/uploads/2020/01/sld-7.jpg'})`,
              backgroundSize: 'cover',

              backgroundPosition: '80%',
              overflow: 'hidden',
            }}
          />
        </Box>
        <Box display={'flex'} flexDirection={"row"}>
        <Typography variant="h4" color marginLeft={'50px'} marginBottom={'20px'}>
          Details
        </Typography>
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ marginLeft:"900px"}}
       
      >
        <MoreVertIcon />
      </IconButton>

      {
  projects.Responsable._id === userid && (
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
          },
        }}
      >
      {options.map((option) => (
    <MenuItem key={option} selected={option === 'move to trash'} onClick={handleOpenConfirmation}>
      {option}
    </MenuItem>
  
))}

      </Menu>)}
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <img alt="projectimage" src={ selectedIcon || image1} style={{ width: '140px', height: '140px' }} />
          <Button
            onClick={handleopenIcon}
            variant="contained"
            sx={{
              border: 'none',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              fontSize: '12px',
              color: 'black',
              backgroundColor: '#e3e4e6',
              minWidth: '5px',
              width: '140px',
              height: '35px',
              MaxHeight: '5px',
              padding: '1px',
              marginTop: '15px',
            }}
          >
            Change Icon
          </Button>
          <Box display="flex" flexDirection={'column'} justifyContent={'left'} alignItems={'left'}>
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: '#575757', marginTop: '15px' }}
            >
              Required fields are marked with an asterisk *
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: '10px', marginBottom: '5px' }}
            >
              Name <span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={projectName}
              variant="outlined"
              style={{ width: '320px' }}
              onChange={handleProjectNameChange}
            />
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: '10px', marginBottom: '5px' }}
            >
              Type <span style={{ color: 'red' }}>*</span>
            </Typography>
            
            <Select
    fullWidth
    value={selectedProjectType} 
  
    variant="outlined"
    style={{ marginBottom: '10px' ,color: "black"}}
    onChange={handleTypeChange}

>

    <MenuItem value="">Select Project Type</MenuItem>
    <MenuItem value="Software development">Software development</MenuItem>
    <MenuItem value="Marketing">Marketing</MenuItem>
    <MenuItem value="Design">Design</MenuItem>
    <MenuItem value="Human Resources">Human Resources</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
    </Select>
            
    {selectedProjectType === 'Other' && (
            <TextField
            
            style={{marginTop:"10px"}}
            fullWidth
              value={customProjectType}
              onChange={(e) => setCustomProjectType(e.target.value)}
              placeholder="Enter custom project type"
            />
          )}

            <Typography
              variant="body1"

              gutterBottom
              style={{ marginTop: '10px', marginBottom: '5px' }}
            >
              Project lead <span style={{ color: 'red' }}>*</span>
            </Typography>

            {equipes && equipes.members && (
  <Select
    fullWidth
    onChange={(e) => setSelectedResponsible(e.target.value)}
    value={selectedResponsible?.firstName}
    style={{ marginBottom: '10px', color: "black" }}
    // renderValue={(selected) => (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <Avatar
    //         src={selected.profilePicture}
    //         sx={{
    //           bgcolor: '#42a5f5',
    //           width: 30,
    //           height: 30,
    //           marginRight: 1,
    //           fontSize: "13px"
    //         }}
    //       >
    //         {selected.firstName && selected?.firstName.substring(0, 2).toUpperCase()}
    //       </Avatar>
    //       <span>{selected.firstName}</span>
    //     </div>
    //   )}
  >
    <MenuItem value={ownerid} sx={{ display: 'flex', alignItems: 'left'}}>
  <Avatar
    src={OwnerProfilePicture}
    sx={{
      bgcolor: '#42a5f5',
      width: 30,
      height: 30,
      fontSize: '13px',
      marginRight:"10px"
    }}
  >
    {ownerFirstName && ownerFirstName.substring(0, 2).toUpperCase()}
  </Avatar>
  <span>{ownerFirstName}</span>
</MenuItem>

    {equipes.members.map((member) => (
      <MenuItem key={member.memberId._id} value={member.memberId._id}>
          <Avatar
        src={member.memberId?.profilePicture}
          sx={{
            bgcolor: '#42a5f5',
            width: 30,
            height: 30,
            fontSize:'13px'
          }}
        >{member.memberId.firstName && member.memberId.firstName.substring(0, 2).toUpperCase()}</Avatar>  
         <span>   {member.memberId.firstName}</span>

      </MenuItem>
    ))}
  </Select>
)}

            <Button
                      onClick={handleSave}

              variant="contained"
              sx={{
                border: 'none',
                fontWeight: 'bold',
                fontFamily: 'inherit',
                fontSize: '12px',
                color: 'black',
                backgroundColor: '#e3e4e6',
                minWidth: '5px',
                width: '100px',
                height: '35px',
                MaxHeight: '5px',
                padding: '1px',
                marginTop: '15px',
              }}
            >
              save
            </Button>
            <IconModal openIcon={openIcon} handleCloseIcon={handleCloseIcon} handleSelectIcon={handleSelectIcon} />
          </Box>
        </Box>
        <DeleteProjectModal
                  open={openDeleteConfirmation}
                  handleClose={handleCloseConfirmation}
                  handleConfirm={handleDeleteConfirmed}
                />
      </DashboardCard>
    </PageContainer>
  );
}

export default DetailsProjects;
