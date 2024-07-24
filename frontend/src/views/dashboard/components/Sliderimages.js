import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const Sliderimages = ({ images, isSecondGridOpen, taskId, ticketId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const slideNum = 3; 

  const openFullScreen = (index) => {
    setSelectedImage(index);
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  const goToNextSlide = () => {
    const nextIndex = currentIndex + slideNum;
    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
    } else {
      const nextSetIndex = currentIndex + slideNum;
      if (nextSetIndex < isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD.length) {
        setCurrentIndex(nextSetIndex);
      } else {
        setCurrentIndex(0); 
      }
    }
  };
  
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideNum < 0 ? Math.floor((images.length - 1) / slideNum) * slideNum : prevIndex - slideNum));
  };

  const goToNextImage = () => {
    setSelectedImage((prevIndex) => {
      if (!isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD || prevIndex === null) {
        return null;
      } else if (prevIndex + 1 < isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD.length) {
        return prevIndex + 1;
      } else {
        const nextSetIndex = currentIndex + slideNum;
        if (nextSetIndex < images.length) {
          setCurrentIndex(nextSetIndex);
          return nextSetIndex;
        } else {
          return null;
        }
      }
    });
  };
  
  const goToPrevImage = () => {
    setSelectedImage((prevIndex) => {
      if (prevIndex === null || prevIndex === 0) {
        return null; // No previous image available
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <>
      <div className="container" style={{ height: '200px', display: 'flex', justifyContent: 'left', position: 'relative' }}>
        <div className="wrapper" style={{ display: 'flex', flexDirection: 'row', }}>
          {isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD && isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD.slice(currentIndex, currentIndex + slideNum).map((image, index) => (
            <Card
              key={index}
              sx={{ width: '110px', minWidth: '100px', height: '100px', margin: '0 8px', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.09)' } }}
              onClick={() => openFullScreen(currentIndex + index)}
            >
              <CardActionArea>
                <CardMedia height="100" width="fit-content" component="img" image={image} alt={`Image ${currentIndex + index + 1}`} style={{ width: '100%' }} />
              </CardActionArea>
            </Card>
          ))}
        </div>
        {isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD && isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD.length > 0 && (
          <>
            <IconButton onClick={goToPrevSlide}   disabled={currentIndex === 0}

             style={{ position: 'absolute', top: '25%', left: '-2px', transform: 'translateY(-50%)',backgroundColor:"white",width:"25px",height:"25px" }}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={goToNextSlide} style={{ position: 'absolute', bottom: '64%', right: '40px', transform: 'translateY(-50%)',backgroundColor:"white",width:"25px",height:"25px" }}>
              <ChevronRight />
            </IconButton>
          </>
        )}
      </div>
      {isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD && isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD.length > 0 && (
        <>
          <Dialog open={selectedImage !== null} onClose={closeFullScreen} fullWidth maxWidth="md">
            <DialogContent>
              <DialogContentText>
                <img src={isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD[selectedImage]} alt='selected' style={{ width: '100%' }} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {selectedImage !== null && (
                <>
                  <IconButton onClick={goToPrevImage} disabled={selectedImage === 0}><ChevronLeft /></IconButton>
                  <IconButton onClick={goToNextImage} disabled={!isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD || selectedImage === null}><ChevronRight /></IconButton>
                </>
              )}
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};
