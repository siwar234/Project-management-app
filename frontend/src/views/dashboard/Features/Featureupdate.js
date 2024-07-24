import React, { useState } from 'react';
import { MenuItem, ListItem, Typography, Menu ,Box, Tooltip} from '@mui/material';
import {useSelector } from 'react-redux';

export default function Featureupdate({ ticketid,  ticket,typographyStyle ,handleFeatureSelect,isSecondGridOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null); 
    };

    
    const features = useSelector((state) => state.featureReducer.features);


    return (
        <>
        {isSecondGridOpen ? (
            <Tooltip title={ticket.Feature?.titleF}>
    <Box
        onClick={handleClick}
        sx={{
            ...typographyStyle,
            backgroundColor: ticket.Feature?.iconF,
            width: '20px', 
            height: '20px', 
            marginRight:isSecondGridOpen && '-100px' ,

        }}
        noWrap
    >
    </Box></Tooltip>
) : <Typography
onClick={handleClick}
sx={{
    ...typographyStyle
}}
noWrap
>
{ ticket.Feature?.titleF}

</Typography>}
     

            <Menu
                id="feature"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                
            >
                {features.map((feature, index) => (
                    <ListItem key={index} >
                        <MenuItem
                            sx={{
                                '&:hover': {
                                    borderLeft: '2px solid #7caaff',
                                    backgroundColor: 'rgb(231 236 251 / 85%)',
                                    width: '190px'
                                }
                            }}
                            onClick={() => handleFeatureSelect(feature._id)}
                        >
                            <div style={{ backgroundColor: feature.iconF ? feature.iconF : '#7ca1f35e', width: '18px', height: '18px', marginRight: '10px', borderRadius: "2px" }} />
                            {feature.titleF}
                        </MenuItem>
                       
                    </ListItem>
                ))}
                
            </Menu>
           
        </>
    );
}
