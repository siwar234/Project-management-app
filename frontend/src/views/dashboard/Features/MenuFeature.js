import React, { useState } from 'react';
import { Button, MenuItem, ListItem, Tooltip, Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import {  updateticketsFeature } from 'src/JS/actions/Tickets';
import { useParams } from 'react-router';

export default function MenuFeature({ticketid,feature,isSecondGridOpen}) {
    const [openmenu, setIsMenuOpen] = useState(false);
    const [anchorEl, setopeningmenu] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null); 

    const dispatch = useDispatch();
    

    const handleCloseMenu = () => {
        console.log("Closing menu");
        setopeningmenu(false);
    };

    const handleMenuopen = (event) => {
        setIsMenuOpen((prevOpen) => !prevOpen);
        setopeningmenu(event.currentTarget);
    };
    const { projectId } = useParams();


    const handleFeatureSelect = (featureid) => {
        setSelectedFeature(featureid);
        dispatch(updateticketsFeature(projectId,ticketid,{Feature:featureid})); 
        
        handleCloseMenu(); 
    };



    

    const features = useSelector((state) => state.featureReducer.features);



    return (
        <>
        {!feature && (
           <Tooltip title="add feature">
               <Button
                onClick={handleMenuopen}
                id="menu-feature-button"
                aria-controls={openmenu ? 'menu-feature' : undefined}
                aria-expanded={openmenu}
                aria-haspopup="true"
                style={{
                    backgroundColor:  'rgb(227 226 226 / 55%)',
                    color: '#5a6b78',
                    fontWeight: '700',
                    marginLeft: isSecondGridOpen ? "8px" : "150px" ,
                    marginRight: isSecondGridOpen ? "5px" :"0px",
                    fontSize :"12.5px",
                    fontFamily: 'sans-serif',

                    marginTop: '-2px'
                }}
            >
               <AddIcon
                    style={{
                        marginRight: '3px',
                        marginTop: '0px',
                        fontWeight: 'bold',
                        fontSize :"20px"

                    }}
                />  Feature{' '}
               
            </Button>
            </Tooltip>

            )}
            {features.length > 0 && (
            <Menu
                id="menu-feature"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '190px',
                        height: '130px' ,
                        overflow:"auto",
                        maxHeight:"100px"
                    },
                }}
            >
               
                    {features.map((feature, index) => (
                        <ListItem key={index} disablePadding>
                            <MenuItem  sx={{ '&:hover': {
          borderLeft: '2px solid #7caaff',
          backgroundColor:'rgb(231 236 251 / 85%)',
          width:'190px'
        }}}
         onClick={() => handleFeatureSelect(feature._id)}>
<div style={{ backgroundColor: feature.iconF ? feature.iconF : '#7ca1f35e', width: '18px', height: '18px', marginRight: '10px', borderRadius: "2px" }} />
                            {feature.titleF} 
                            </MenuItem>
                        </ListItem>
                    ))}
              
                {/* <Divider sx={{
                    borderBottomWidth: '2px',
                    marginTop: '12px',
                   
                }} />

                <Typography sx={{ color: "#1C1B3E", fontSize: "13.5px", marginLeft: "15px",marginTop:"8px",fontWeight:"bold" }} noWrap>
                    View all Features </Typography> */}
            </Menu>
            )}
        </>
    );
}
