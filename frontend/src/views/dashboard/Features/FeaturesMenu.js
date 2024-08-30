import React, { useState } from 'react';
import { Divider, Menu, Typography, Button, TextField, MenuItem, Box, ListItem, Checkbox } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import EpicModal from './EpicModal';
import { useDispatch, useSelector } from 'react-redux';

export default function FeaturesMenu({checkedFeatures,selectedFeatures,setSelectedFeatures}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const [isTextFieldVisible, setTextFieldVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    
    const handleFeatureCheckboxChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            setSelectedFeatures(selectedFeatures.filter((selectedFeature) => selectedFeature !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    const handleMenuClose = () => {
        // console.log("Closing menu");
        setAnchorEl(false);
    };

    const handleMenuToggle = (event) => {
        setIsMenuOpen((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget);
    };

    const [openModal, setOpenModal] = React.useState(false);
    const [switchChecked, setSwitchChecked] = React.useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSwitchChecked(false);
        setTextFieldVisible(false);
        setOpenFeatureId(false)
    };

    const handleSwitchChange = () => {
        setSwitchChecked(!switchChecked);
        if (!switchChecked) {
            setOpenModal(true);
        }
    };

    const features = useSelector((state) => state.featureReducer.features);

    const filteredFeatures = features.filter((feature) =>
        feature.titleF.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [openFeatureId, setOpenFeatureId] = useState(null); 

    return (
        <>
            <Button
                onClick={handleMenuToggle}
                id="feature-menu-button"
                aria-controls={isMenuOpen ? 'feature-menu' : undefined}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                style={{
                    backgroundColor: anchorEl ? 'rgb(231 236 251 / 85%)' : '',
                    color: 'rgb(60, 73, 95)',
                    fontWeight: '800',
                    marginLeft: '28px',
                    marginTop: '15px'
                }}
            >
                Features{' '}
                <IoIosArrowDown
                    style={{
                        marginLeft: '5px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                        transform: isMenuOpen ? 'rotateX(180deg)' : 'none',
                    }}
                />
            </Button>
            <Menu
                id="feature-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
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
                        width: '280px',
                        height: '270px' ,
                    },
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search features"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        marginBottom: '8px',
                        marginLeft: "5px",
                        width: '259px',
                    }}
                />
                <Box style={{ overflow: "auto", maxHeight: "100px" }}>
                    {filteredFeatures.map((feature, index) => (
                        <ListItem key={index} disablePadding>
                            <MenuItem >
    
                            <FormControlLabel
                    control={<Checkbox
                        checked={selectedFeatures.includes(feature.titleF)}
                        onChange={() => handleFeatureCheckboxChange(feature.titleF)}
                        size="small" />}
                    label={feature.titleF}
                />
                            </MenuItem>
                        </ListItem>
                    ))}
                </Box>
                <Divider sx={{
                    borderBottomWidth: '2px',
                    marginTop: '8px',
                }} />

                <FormControlLabel
                    value="Features"
                    control={<Switch color="primary" checked={switchChecked} onChange={handleSwitchChange} />}
                    label="Features"
                    labelPlacement="start"
                    sx={{
                        fontFamily: 'sans-serif',
                        marginTop: '13px',
                    }}
                />

                <Typography sx={{ color: "gray", fontSize: "12px", marginLeft: "15px" }} noWrap>
                    Press <span style={{ color: "black", fontSize: "12px", marginLeft: "2px", fontWeight: "bold" }}>F</span> to open the features list
                </Typography>
            </Menu>
            <EpicModal openEpic={openModal} openFeatureId={openFeatureId} setOpenFeatureId={setOpenFeatureId} handleCloseEpic={handleCloseModal} isTextFieldVisible={isTextFieldVisible} setTextFieldVisible={setTextFieldVisible} />
        </>
    );
}
