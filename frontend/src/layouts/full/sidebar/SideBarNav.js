// import React, { useEffect } from 'react';
// import { Button, MenuItem, Divider, Menu, Typography, Drawer, Box } from '@mui/material';
// import { IoIosArrowDown } from 'react-icons/io';
// import { useMediaQuery } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { getprojectbyuser } from 'src/JS/actions/project';
// import { Link } from 'react-router-dom';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import image from '../../../assets/images/checking.webp';
// import img from '../../../assets/images/bugging.png';
// import { getallticket } from 'src/JS/actions/Tickets';
// import { getFavorites, removeFavorites } from 'src/JS/actions/Favorites';
// import { Star } from '@mui/icons-material';
// import image1 from '../../../assets/images/groupteam.png';

// const SideBarNav = ({
//   isMobileSidebarOpened,
//   onSidebarClosed,
//   handleOpenDescription,
//   handleClosed,
//   opened,
//   handleClick1,
//   anchorEl,
//   handleClose,
//   handleClick,
//   handleOpen,
//   handleNavigate,
//   buttonBgColor,
//   buttoncolor,
//   buttonBgColorr,
//   buttoncolorr,
//   opening,
//   handleClosing,
//   handleClicking,
//   buttonBgColorring,
//   buttoncoloor,
//   handleStatClosed,
//   statAnchorEl,
//   handleOpenStat,
//   buttoncoloored,
//   buttonBgColorred
// }) => {
//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
//   const user = useSelector((state) => state.userReducer.user);
//   const userRole = user?.Roles?.find((role) => role.name === 'user');
//   const dispatch = useDispatch();
//   const projects = useSelector((state) => state.projectReducer.projects || []);
//   const unactiveProjects = projects.filter(project => !project?.archiver);
//   const [value, setValue] = React.useState('1');
//   const alltickets = useSelector((state) => state.ticketsReducer.alltickets);
//   const favorites = useSelector((state) => state.favouritesReducer.favourites);
//   const id = user?._id;

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   useEffect(() => {
//     if (id) {
//       dispatch(getprojectbyuser(id));
//       dispatch(getallticket(id));
//       dispatch(getFavorites(id));
//     }
//   }, [dispatch, id]);

//   const handleremovefavourite = (ticketid) => {
//     dispatch(removeFavorites(ticketid, id));
//   };

//   return (
//     <Drawer
//       variant={lgUp ? 'permanent' : 'temporary'}
//       open={isMobileSidebarOpened}
//       onClose={onSidebarClosed}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: '270px',
//           boxSizing: 'border-box',
//         },
//       }}
//     >
//       <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
//         {userRole && (
//           <>
//             <Button
//               id="fade-but"
//               className="menuitems"
//               aria-controls={opening ? 'fade-menuuu' : undefined}
//               aria-haspopup="true"
//               onClick={handleClicking}
//               style={{
//                 backgroundColor: buttonBgColorring,
//                 color: buttoncoloor,
//                 fontWeight: '800',
//                 marginBottom: '10px',
//               }}
//             >
//               My Workspace{' '}
//               <IoIosArrowDown
//                 style={{
//                   marginLeft: '3px',
//                   marginTop: '5px',
//                   fontWeight: 'bold',
//                   transform: opening ? 'rotateX(180deg)' : 'none',
//                 }}
//               />
//             </Button>
//             <Menu
//               id="fade-menuuu"
//               anchorEl={opening}
//               open={Boolean(opening)}
//               onClose={handleClosing}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//               }}
//               transformOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 '& .MuiMenu-paper': {
//                   width: '290px',
//                   height: 'auto',
//                   marginTop: '40px',
//                 },
//               }}
//             >
//               <MenuItem>
//                 <Box sx={{ width: '100%', typography: 'body1' }}>
//                   <TabContext value={value}>
//                     <TabList onChange={handleChange}>
//                       <Tab label="Assigned to me" value="1" />
//                       <Tab label="Favorites" value="2" />
//                     </TabList>
//                     <TabPanel value="1">
//                       <Typography
//                         mb={4}
//                         variant="body1"
//                         style={{
//                           fontSize: '13px',
//                           color: '#636161',
//                           fontWeight: 'bold',
//                           marginLeft: '0px',
//                         }}
//                       >
//                         In progress
//                       </Typography>
//                       {alltickets.map(ticket => (
//                         <div key={ticket?._id}>
//                           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//                             <img
//                               src={ticket?.Type === 'Bug' ? img : image}
//                               alt="icon"
//                               style={{
//                                 width: '18px',
//                                 height: '18px',
//                                 marginRight: '15px',
//                                 marginTop: '2px',
//                               }}
//                             />
//                             <div>
//                               <div style={{ fontFamily: 'sans-serif' }}>{ticket?.Description}</div>
//                               <div style={{ fontSize: '11.5px', color: 'gray', fontFamily: 'sans-serif' }}>
//                                 {ticket.projectId && ticket.projectId.projectName}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </TabPanel>
//                     <TabPanel value="2">
//                       <Typography
//                         mb={4}
//                         variant="body1"
//                         style={{
//                           fontSize: '13px',
//                           color: '#636161',
//                           fontWeight: 'bold',
//                           marginLeft: '0px',
//                         }}
//                       >
//                         Favorites
//                       </Typography>
//                       {Array.isArray(favorites) && favorites.map(ticket => (
//                         <div key={ticket._id}>
//                           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//                             <img
//                               src={ticket.ticketId?.Type === 'Bug' ? img : image}
//                               alt="icon"
//                               style={{
//                                 width: '18px',
//                                 height: '18px',
//                                 marginRight: '15px',
//                                 marginTop: '2px',
//                               }}
//                             />
//                             <div style={{ fontFamily: 'sans-serif' }}>{ticket.ticketId?.Description}</div>
//                             <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
//                               <Star
//                                 onClick={() => handleremovefavourite(ticket.ticketId._id)}
//                                 style={{ color: '#c2c251', marginRight: '10px' }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </TabPanel>
//                   </TabContext>
//                 </Box>
//               </MenuItem>
//               <Divider />
//               <MenuItem component={Link} to={'/workspace'}>
//                 Access the page My Workspace
//               </MenuItem>
//             </Menu>
//             <Button
//               id="fade-button"
//               className="menuitems"
//               aria-controls={anchorEl ? 'fade-menu' : undefined}
//               aria-haspopup="true"
//               onClick={handleClick}
//               style={{
//                 backgroundColor: buttonBgColor,
//                 color: buttoncolor,
//                 fontWeight: '800',
//                 marginBottom: '10px',
//               }}
//             >
//               Teams{' '}
//               <IoIosArrowDown
//                 style={{
//                   marginLeft: '3px',
//                   marginTop: '5px',
//                   fontWeight: 'bold',
//                   transform: anchorEl ? 'rotateX(180deg)' : 'none',
//                 }}
//               />
//             </Button>
//             <Menu
//               id="fade-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 '& .MuiMenu-paper': {
//                   width: '270px',
//                   height: '150px',
//                 },
//               }}
//             >
//               <MenuItem>
//                 <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1500px' }}>
//                   Teams
//                 </Typography>
//               </MenuItem>
//               <Divider />
//               <MenuItem
//                 onClick={() => {
//                   handleClose();
//                   handleOpen();
//                 }}
//               >
//                 <img src={image1} alt="addteam" style={{ marginRight: '15px', width: '30px' }} /> Create a new team
//               </MenuItem>
//               <MenuItem onClick={handleClose}>Access the Teams page</MenuItem>
//             </Menu>
//             <Button
//               id="fade-button"
//               className="menuitems"
//               aria-controls={statAnchorEl ? 'fade-menu-stat' : undefined}
//               aria-haspopup="true"
//               onClick={handleOpenStat}
//               style={{
//                 backgroundColor: buttonBgColorred,
//                 color: buttoncoloored,
//                 fontWeight: '800',
//                 marginBottom: '10px',
//               }}
//             >
//               Statistics{' '}
//               <IoIosArrowDown
//                 style={{
//                   marginLeft: '3px',
//                   marginTop: '5px',
//                   fontWeight: 'bold',
//                   transform: statAnchorEl ? 'rotateX(180deg)' : 'none',
//                 }}
//               />
//             </Button>
//             <Menu
//               id="fade-menu-stat"
//               anchorEl={statAnchorEl}
//               open={Boolean(statAnchorEl)}
//               onClose={handleStatClosed}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 '& .MuiMenu-paper': {
//                   width: '270px',
//                   height: '150px',
//                 },
//               }}
//             >
//               <MenuItem>Stat 1</MenuItem>
//               <Divider />
//               <MenuItem>Stat 2</MenuItem>
//             </Menu>
//             <Button
//               className="menuitems"
//               onClick={handleNavigate}
//               style={{
//                 backgroundColor: buttonBgColorr,
//                 color: buttoncolorr,
//                 fontWeight: '800',
//                 marginBottom: '10px',
//               }}
//             >
//               Planning
//             </Button>
//             <Button
//               id="fade-button"
//               className="menuitems"
//               aria-controls={opened ? 'fade-menu' : undefined}
//               aria-haspopup="true"
//               onClick={handleClick1}
//               style={{
//                 backgroundColor: buttonBgColor,
//                 color: buttoncolor,
//                 fontWeight: '800',
//                 marginBottom: '10px',
//               }}
//             >
//               Projects{' '}
//               <IoIosArrowDown
//                 style={{
//                   marginLeft: '3px',
//                   marginTop: '5px',
//                   fontWeight: 'bold',
//                   transform: opened ? 'rotateX(180deg)' : 'none',
//                 }}
//               />
//             </Button>
//             <Menu
//               id="fade-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClosed}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 '& .MuiMenu-paper': {
//                   width: '270px',
//                   height: '300px',
//                 },
//               }}
//             >
//               <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1500px', marginBottom: '10px' }}>
//                 Projects
//               </Typography>
//               <Divider />
//               {unactiveProjects.map((project) => (
//                 <MenuItem
//                   key={project._id}
//                   onClick={() => {
//                     handleClosed();
//                     handleOpenDescription(project._id);
//                   }}
//                 >
//                   {project.projectName}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </>
//         )}
//       </Box>
//     </Drawer>
//   );
// };

// export default SideBarNav;
