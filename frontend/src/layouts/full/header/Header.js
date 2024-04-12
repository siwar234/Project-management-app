import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,

} from '@mui/material';
import Profile from './Profile';
import TeamsModal from './TeamsModal';
import { IconBellRinging, IconMenu } from '@tabler/icons';
import PropTypes from 'prop-types';
import menu from '../../../assets/images/menu.png';
import { CgSearch } from 'react-icons/cg';
import SidebarMenu from './SidebarMenu';
import ProjectsModal from './ProjectsModal';
import ProjectDescription from './ProjectDescription';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ouvrir, setouvrir] = useState(false);
  const [opened, setopen] = useState(null);
  const [openProject, setopenProject] = useState(false);
  const [openDescriptionModal, setopenDescriptionModal] = useState(false);


  //desciptionModal

  const handleOpenDescription = () => {
    setopenDescriptionModal(true);
  };

  const closeDescription = () => {
    setopenDescriptionModal(false);
  };



 
  //projectModal


  
  const handleCloseProject = () => {
    setopenProject(false);
  };

  const handleOpenProject = () => {
    setopenProject(true);
  };


  //


  //teamsModal

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  
  const handleClick1 = (event) => {
    setopen(event.currentTarget);

  };

  const handleClosed = () => {
  setopen(false); 
};

  const close = () => {
    setouvrir(false);
  };

  const handleOpen = () => {
    setouvrir(true);
  };

  const handleNavigate = () => {
    window.location.href = '/team/teams';
  };
  const buttonBgColor = anchorEl ? 'rgb(231 236 251 / 85%)' : '';
  const buttoncolor = anchorEl ? '' : 'rgb(60 73 95)';
  const buttonBgColorr = opened ? 'rgb(231 236 251 / 85%)' : '';
  const buttoncolorr = opened ? '' : 'rgb(60 73 95)';

  const [isMobileSidebarOpenned, setMobileSidebarOpened] = useState(false);

  const toggleMobileNavbar = () => {
    setMobileSidebarOpened(true);
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: 'white', display: 'flex' }} elevation={2}>
        <Toolbar
          style={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={props.toggleMobileSidebar}
              sx={{
                display: {
                  lg: 'none',
                  xs: 'inline',
                  color: 'rgb(60 73 95)',
                },
              }}
            >
              <IconMenu width="20" height="20" />
            </IconButton>

            {/* <CgSearch
              style={{ width: '20px', fontSize: '20px', marginRight: '15px' }}
              color="rgb(60 73 95)"
            /> */}

            <SidebarMenu

              isMobileSidebarOpened={isMobileSidebarOpenned}
              onSidebarClosed={() => setMobileSidebarOpened(false)}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleNavigate={handleNavigate}
              handleOpen={handleOpen}
              handleClick={handleClick}
              buttonBgColor={buttonBgColor}
              buttoncolor={buttoncolor}
              handleClick1={handleClick1}
              handleClosed={handleClosed}
              opened={opened}
              buttonBgColorr={buttonBgColorr}
              buttoncolorr={buttoncolorr}
              handleOpenDescription={handleOpenDescription}


            />
            <ProjectDescription
              openDescriptionModal={openDescriptionModal}
              closeDescription={closeDescription}
              handleOpenProject= {handleOpenProject}

            />
          </div>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileNavbar}
            sx={{
              display: {
                lg: 'none',
                xs: 'inline',
                color: 'rgb(60 73 95)',
              },
            }}
          >
            <img src={menu} alt="Menu" width="26" height="26" />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" aria-label="show 11 new notifications" color="#f8f8f8">
              <Badge variant="dot" color="primary">
                <IconBellRinging size="21" stroke="1.5" />
              </Badge>
            </IconButton>
            <Profile />
          </div>
        </Toolbar>
      </AppBar>
      <TeamsModal ouvrir={ouvrir} handleClosee={close} />
      <ProjectsModal openProject={openProject} handleCloseProject={handleCloseProject} />

    </>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
