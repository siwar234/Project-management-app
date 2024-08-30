import React from 'react';
import { Divider, MenuItem, Menu } from '@mui/material';

export default function TicketTypeMenu({ menuAnchor, handleMenuClose, setTicketType, image, image1, image2, ticketType }) {
    return (
        <>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                {ticketType !== 'story' && (
                    <MenuItem
                        style={{ width: '150px' }}
                        onClick={() => setTicketType('story')}
                    >
                        <img
                            src={image2}
                            alt="icon"
                            style={{
                                width: '21px',
                                height: '21px',
                                marginRight: '10px',
                            }}
                        />
                        <span
                            style={{
                                color: '#29292b',
                                fontFamily: 'sans-serif',
                            }}
                        >
                            Story
                        </span>
                    </MenuItem>
                )}

                {ticketType !== 'Task' && (
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
                            Task
                        </span>
                    </MenuItem>
                )}

                {ticketType !== 'Bug' && (
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
                            Bug
                        </span>
                    </MenuItem>
                )}

                <Divider />
                
                <MenuItem
                    onClick={handleMenuClose}
                    style={{ fontFamily: 'sans-serif' }}
                >
                    Manage ticket types
                </MenuItem>
            </Menu>
        </>
    );
}
