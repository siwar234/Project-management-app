import React, { useState } from 'react';
import { Box, TextField, MenuItem, ListItem, Checkbox, Menu } from '@mui/material';
import Button from '@mui/material/Button';
import { IoIosArrowDown } from 'react-icons/io';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';

export default function FeatureMenu({ handleMenuToggle, isMenuOpen, anchorEl, handleMenuClose, selectedFeatures, setSelectedFeatures }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleFeatureCheckboxChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            setSelectedFeatures(selectedFeatures.filter((selectedFeature) => selectedFeature !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    const features = useSelector((state) => state.featureReducer.features);

    const filteredFeatures = features.filter((feature) =>
        feature.titleF.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    marginTop: '3px',
                    marginBottom: "25px",
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
                        height: '200px',
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
                        <MenuItem key={index} sx={{
                            width: "280px",
                            '&:hover': {
                                borderLeft: '2px solid #7caaff',
                                backgroundColor: 'rgb(231 236 251 / 85%)'
                            }
                        }}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={selectedFeatures.includes(feature.titleF)}
                                    onChange={() => handleFeatureCheckboxChange(feature.titleF)}
                                    size="small" />}
                                label={feature.titleF}
                            />
                        </MenuItem>
                    ))}
                </Box>
            </Menu>
        </>
    )
}
