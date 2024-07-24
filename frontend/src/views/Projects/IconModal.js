import { useState } from 'react';
import { Button, Box, Modal, Fade, Typography } from '@mui/material';
import PropTypes from 'prop-types';


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../assets/images/icons', false, /\.(png)$/));

const IconModal = ({ openIcon, handleCloseIcon, handleSelectIcon }) => {
    const imageUrls = Object.values(images);
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleIconClick = (imageUrl) => {
        setSelectedIcon(imageUrl);
    };

    const handleSelect = () => {
        handleSelectIcon(selectedIcon);
        handleCloseIcon();
    };

    return (
        <Modal open={openIcon}>
            <Fade in={openIcon}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            width: '510px',
                            height: '300px',
                            padding: '20px',
                            background: '#fff',
                            borderRadius: '5px',
                            overflow: 'auto',
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <Typography
                                variant="h6"
                                sx={{ fontSize: 20, fontWeight: '550', marginLeft: '10px' }}
                                color="rgb(52, 71, 103)"
                                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                                gutterBottom
                                mb={5}
                            >
                                Choose an icon
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} >
                                {imageUrls.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`images ${index + 1}`}
                                        style={{ 
                                            width: '53px', 
                                            height: '53px', 
                                            objectFit: 'cover', 
                                            borderRadius: '5px', 
                                            cursor: 'pointer', 
                                            border: selectedIcon === imageUrl ? '2px solid #3498db' : 'none',
                                            borderWidth: '20px'
                                        }}
                                        onClick={() => handleIconClick(imageUrl)}
                                    />
                                ))}
                            </Box>
                            <Box mt={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "right" }} >
                                <Button
                                    color="inherit"
                                    variant="contained"
                                    size="small"
                                    onClick={handleCloseIcon}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{ marginLeft: '10px', backgroundColor: 'rgb(52, 71, 103)' }}
                                    onClick={handleSelect}
                                >
                                    Select
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

IconModal.propTypes = {
    openIcon: PropTypes.bool.isRequired,
    handleCloseIcon: PropTypes.func.isRequired,
    handleSelectIcon: PropTypes.func.isRequired,
};

export default IconModal;
