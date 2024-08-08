import React, { useEffect } from 'react';
import { Button, MenuItem, Divider, Menu, Typography } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import image1 from '../../../assets/images/groupteam.png';
import image5 from '../../../assets/images/icons/projection.png';

import image3 from '../../../assets/images/creationproject.png';
import image2 from '../../../assets/images/loupe.png';
import { useMediaQuery, Box, Drawer } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from '../sidebar/SidebarItems';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  getprojectbyuser } from 'src/JS/actions/project';
import { Link,  } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import image from '../../../assets/images/checking.webp';
import img from '../../../assets/images/bugging.png';
import {  getallticket } from 'src/JS/actions/Tickets';
import { getFavorites, removeFavorites } from 'src/JS/actions/Favorites';
import { StarOutline, Star } from '@mui/icons-material';

const NavBarMenu = ({
  isMobileSidebarOpened,
  onSidebarClosed,
  handleOpenDescription,
  handleClosed,
  opened,
  handleClick1,
  anchorEl,
  handleClose,
  handleClick,
  handleOpen,
  handleNavigate,
  buttonBgColor,
  buttoncolor,
  buttonBgColorr,
  buttoncolorr,
  opening,
  handleClosing,
  handleClicking,
  buttonBgColorring,
  buttoncoloor,
  handleStatClosed,
  statAnchorEl,
  handleOpenStat,
  buttoncoloored,
  buttonBgColorred

}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const sidebarWidth = '270px';
  const user = useSelector((state) => state.userReducer.user);
  const userRole = user?.Roles?.find((role) => role.name === 'user');
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectReducer.projects || []);
  const unactiveProjects = projects.filter(project => !project?.archiver );

  const [value, setValue] = React.useState('1');
  const alltickets = useSelector((state) => state.ticketsReducer.alltickets);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const id = user?._id;

  useEffect(() => {
    dispatch(getprojectbyuser(id));
    dispatch(getallticket(id));
    dispatch(getFavorites(id));

  }, [dispatch]);

  const  favorites  = useSelector((state) => state.favouritesReducer.favourites);

  // const handleonclick = () => {
  //   dispatch(getprojectbyid(userId));
  // };

  const handlenavigate = () => {
    window.location.href = '/projects/viewprojects';
  };


  const handleremovefavourite = (ticketid) => {
    
      dispatch(removeFavorites(ticketid, id));
  
  };
  
  if (lgUp) {
    return (
      <div style={{ marginLeft: '20px' }}>
        {userRole && (
          <>
           <Button
              id="fade-but"
              className="menuitems"
              aria-controls={opening ? 'fade-menuuu' : undefined}
              aria-haspopup="true"
              onClick={handleClicking}
              style={{
                backgroundColor: buttonBgColorring,
                color: buttoncoloor,
                fontWeight: '800',
                marginRight: '28px',
              }}
            >
             My Workspace{' '}
              <IoIosArrowDown
                style={{
                  marginLeft: '3px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                  transform: opening ? 'rotateX(180deg)' : 'none',
                }}
              />
            </Button>


            <Menu
              id="fade-menuuu"
              anchorEl={opening}
              open={Boolean(opening)}
              onClose={handleClosing}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiMenu-paper': {
                  width: '290px',
                  height:   '160',
                  marginTop: '40px',
                },
              }}
            >
              <MenuItem>
              <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
          <TabList onChange={handleChange} >
            <Tab label="assigned to me" value="1" />
            <Tab label="Favorites" value="2" />
          </TabList>
     
     
                    <TabPanel value="1">
                    <Typography
                    mb={4}
                    variant="body1"
                    style={{
                      fontSize: '13px',
                      color: '#636161',
                      fontWeight: 'bold',
                      marginLeft: '0px',
                    }}
                  >
                    In progress </Typography>
    {alltickets
       
       .map(ticket => (
        <div key={ticket?._id}>
            <div style={{ display: 'flex', alignItems: 'center',marginBottom:"15px"}}>
                <img
                    src={ticket?.Type === 'Bug' ? img : image}
                    alt="icon"
                    style={{
                        width: '18px',
                        height: '18px',
                        marginRight: '15px',
                        marginTop:"2px"
                    }}
                />
                <div>
                    <div style={{
                     
                      fontFamily:"sans-serif"
                    }}>{ticket?.Description}</div>
                    <div  style={{
                      fontSize:"11.5px",
                      color:"gray",
                      fontFamily:"sans-serif",
                      


                    }}>{ticket.projectId && ticket.projectId.projectName}</div>
                </div>
            </div>
        </div>
    ))
}
</TabPanel>

      <TabPanel value="2">
      <Typography
                    mb={4}
                    variant="body1"
                    style={{
                      fontSize: '13px',
                      color: '#636161',
                      fontWeight: 'bold',
                      marginLeft: '0px',
                    }}
                  >
                    Favorites </Typography>
                    {Array.isArray(favorites) && favorites.map(ticket => (
  <div key={ticket._id}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
      <img
        src={ticket.ticketId?.Type === 'Bug' ? img : image}
        alt="icon"
        style={{
          width: '18px',
          height: '18px',
          marginRight: '15px',
          marginTop: "2px"
        }}
      />
      <div style={{ fontFamily: "sans-serif" }}>{ticket.ticketId?.Description}</div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
        <Star
        onClick={()=>(handleremovefavourite(ticket.ticketId._id))}
         style={{ color: "#c2c251", marginRight: "10px" }}
         />
      </div>
    </div>
  </div>
))}

      </TabPanel>
      </TabContext>
    </Box>
                
              </MenuItem>
              <MenuItem>

            
              </MenuItem>
              <Divider />
              <MenuItem
                component={Link}

                to={'/workspace'}

              >
               
               Access the page my Workspace
              </MenuItem>

            
            </Menu>

              







            <Button
              id="fade-button"
              className="menuitems"
              aria-controls={anchorEl ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              style={{
                backgroundColor: buttonBgColor,
                color: buttoncolor,
                fontWeight: '800',
                marginRight: '28px',
              }}
            >
              Teams{' '}
              <IoIosArrowDown
                style={{
                  marginLeft: '3px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                  transform: anchorEl ? 'rotateX(180deg)' : 'none',
                }}
              />
            </Button>

            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiMenu-paper': {
                  width: '270px',
                  height: '150px',
                },
              }}
            >
              <MenuItem>
                <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1500px' }}>
                  Teams
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleOpen();
                }}
              >
                <img src={image1} alt="addteam" style={{ marginRight: '15px', width: '30px' }} />{' '}
                Create a new team
              </MenuItem>

              <MenuItem onClick={handleNavigate}>
                <img src={image2} alt="addteam" style={{ marginRight: '15px', width: '23px' }} />{' '}
                search teams
              </MenuItem>
            </Menu>

            <Button
              id="fade-buttonn"
              className="menuitems"
              aria-controls={opened ? 'fade-menuu' : undefined}
              aria-haspopup="true"
              onClick={handleClick1}
              style={{
                backgroundColor: buttonBgColorr,
                color: buttoncolorr,
                fontWeight: '800',
                marginRight: '28px',
              }}
            >
              projects{' '}
              <IoIosArrowDown
                style={{
                  marginLeft: '3px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                  transform: opened ? 'rotateX(180deg)' : 'none',
                }}
              />
            </Button>

            <Menu
              id="fade-menuu"
              anchorEl={opened}
              open={Boolean(opened)}
              onClose={handleClosed}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiMenu-paper': {
                  width: '290px',
                  height: unactiveProjects && unactiveProjects.length > 0 ? '290px ' : '180',
                  marginTop: '45px',
                },
              }}
            >
              <MenuItem>
                <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1500px' }}>
                  Projects
                </Typography>
              </MenuItem>
              <Divider />
              {unactiveProjects && unactiveProjects.length > 0 && ( 
                <>
                  <Typography
                    mb={1}
                    variant="body1"
                    style={{
                      fontSize: '13px',
                      color: '#636161',
                      fontWeight: 'bold',
                      marginLeft: '17px',
                    }}
                  >
                    Recent
                  </Typography>
                  {unactiveProjects && unactiveProjects.slice(0, 5).map((project) => (
                    <MenuItem
                      key={project?._id}
                      style={{ display: 'flex', alignItems: 'center' }}
                      component={Link}

                      to={`/dashboard/${project?._id}`}

                    >
                      <img
                        src={project.Icon || image5}
                        alt="teamimg"
                        style={{ width: '28px', marginRight: '10px',marginLeft:"5px" }}
                      />
                      <Box display={'flex'} flexDirection="column">
                     
    <Typography style={{ fontSize: '13px', fontWeight: '200' }}>
        {project.projectName}
    </Typography>

                        <Typography style={{ fontSize: '13px', fontWeight: '400' }}>
                          {project?.type}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  <Divider />
                </>
              )}

              <MenuItem
                style={{ marginTop: '30px' }}
                onClick={() => {
                  handleClosed();
                  handleOpenDescription();
                }}
              >
                <img src={image3} alt="addteam" style={{ marginRight: '15px', width: '22px' }} />{' '}
                Create a project
              </MenuItem>

              <MenuItem onClick={handlenavigate}>
                <img src={image2} alt="addteam" style={{ marginRight: '15px', width: '23px' }} />{' '}
                view projects
              </MenuItem>
            </Menu>
          </>
        )}

        {userRole && (
          <>
         <Button
              id="fade-buttonnnn"
              className="menuitems"
              aria-controls={statAnchorEl ? 'fade-menuuuuuu' : undefined}
              aria-haspopup="true"
              style={{ color: buttoncoloored, fontWeight: '800', marginRight: '28px',backgroundColor:buttonBgColorred,
               }}
              onClick={handleOpenStat}
            >
              statistics
              <IoIosArrowDown style={{ marginLeft: '3px', marginTop: '5px', fontWeight: 'bold',
                                  transform: statAnchorEl ? 'rotateX(180deg)' : 'none',

               }} />
            </Button>
            <Menu
              id="fade-menuuuuuu"
              anchorEl={statAnchorEl}
              open={Boolean(statAnchorEl)}
              onClose={handleStatClosed}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiMenu-paper': {
                  position: 'relative',
                  width: '320px',
                  marginTop: '45px',
                  padding: 0,
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderImage: 'linear-gradient(to bottom, rgb(85, 191, 240), violet) 1', 
                },
              }}
            >
               <MenuItem
    sx={{
      padding: 0,
      backgroundImage: 'url(https://assets.website-files.com/5a6bf38e863f2000017780d9/6189dd82d733577161d0abeb_AL%20FY22Q1%20Benefits%20of%20Atlassian%20Cloud%20vs%20Server%201.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '120px',
      width: '100%',
    }}
  />
              <Divider  />
              <MenuItem
                style={{ marginTop: '5px' }}
                component={Link}

                to={'/statistic'}

              >View all statistics</MenuItem>

            </Menu>


            {/* <Button
              id="fade-button"
              className="menuitems"
              aria-controls={anchorEl ? 'fade-menu' : undefined}
              aria-haspopup="true"
              
              style={{ color: 'rgb(60 73 95)', fontWeight: '800', marginRight: '28px' }}
            >
              filters{' '}
              <IoIosArrowDown style={{ marginLeft: '3px', marginTop: '5px', fontWeight: 'bold' }} />
            </Button> */}
          </>
        )}
      </div>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={isMobileSidebarOpened}
      onClose={onSidebarClosed}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems   />
    </Drawer>
  );
};

export default NavBarMenu;
