import React from 'react';
import { Button, MenuItem, Divider, Menu, Typography } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";
import image1 from '../../../assets/images/group.png';
// import image3 from '../../../assets/images/creationprojet.png';
import image2 from '../../../assets/images/loupe.png';
import { useMediaQuery, Box, Drawer } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from '../sidebar/SidebarItems';
import { useSelector } from 'react-redux';

const SidebarMenu = ({ isMobileSidebarOpened, onSidebarClosed, handleOpenDescription, handleClosed, opened, handleClick1, anchorEl, handleClose, handleClick, handleOpen, handleNavigate, buttonBgColor, buttoncolor, buttonBgColorr, buttoncolorr }) => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const sidebarWidth = '270px';
    const user = useSelector((state) => state.userReducer.user);
    const userRole = user?.Roles?.find((role) => role.name === 'user');

    if (lgUp) {
        return (
            <div style={{ marginLeft: '20px' }}>
                {userRole && (
                    <>
                        <Button
                            id="fade-button"
                            className="menuitems"
                            aria-controls={anchorEl ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            style={{ backgroundColor: buttonBgColor, color: buttoncolor, fontWeight: '800', marginRight: '28px' }}
                        >
                            Teams  <IoIosArrowDown
                                style={{
                                    marginLeft: '3px',
                                    marginTop: '5px',
                                    fontWeight: 'bold',
                                    transform: anchorEl ? 'rotateX(180deg)' : 'none'
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
                                <img src={image1} alt="addteam" style={{ marginRight: '15px', width: '25px' }} />{' '}
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
                            style={{ backgroundColor: buttonBgColorr, color: buttoncolorr, fontWeight: '800', marginRight: '28px' }}
                        >
                            projects  <IoIosArrowDown
                                style={{
                                    marginLeft: '3px',
                                    marginTop: '5px',
                                    fontWeight: 'bold',
                                    transform: opened ? 'rotateX(180deg)' : 'none'
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
                                    width: '270px',
                                    height: '150px',
                                    marginTop: "45px"
                                },
                            }}
                        >
                            <MenuItem>
                                <Typography variant="body1" style={{ fontSize: '15px', fontWeight: '1500px' }}>
                                    Projects
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={() => {
                                    handleClosed();
                                    handleOpenDescription()
                                }}
                            >
                                <img src={image2} alt="addteam" style={{ marginRight: '15px', width: '23px' }} />{' '}
                                Create a project
                            </MenuItem>

                            <MenuItem onClick={handleNavigate}>
                                <img src={image2} alt="addteam" style={{ marginRight: '15px', width: '25px' }} />{' '}
                                search projects
                            </MenuItem>
                        </Menu>
                    </>
                )}

                {userRole && (
                    <>
                        <Button
                            id="fade-button"
                            className="menuitems"
                            aria-controls={anchorEl ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            style={{ color: 'rgb(60 73 95)', fontWeight: '800', marginRight: '28px' }}
                        >
                            dashboards <IoIosArrowDown style={{ marginLeft: "3px", marginTop: "5px", fontWeight: "bold" }} />
                        </Button>

                        <Button
                            id="fade-button"
                            className="menuitems"
                            aria-controls={anchorEl ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            style={{ color: 'rgb(60 73 95)', fontWeight: '800', marginRight: '28px' }}
                        >
                            filters <IoIosArrowDown style={{ marginLeft: "3px", marginTop: "5px", fontWeight: "bold" }} />
                        </Button>
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
            <SidebarItems />
        </Drawer>
    );
};

export default SidebarMenu;
