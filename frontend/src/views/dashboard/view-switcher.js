import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Opacity } from "@mui/icons-material";

export const ViewSwitcher = ({ onViewModeChange }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = (mode) => {
    onViewModeChange(mode);
    setActiveButton(mode);
  };

  const toggleBox = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div>
      {!isOpen && (
        <Box className="ViewContainer"  style={{marginLeft: isOpen? "780px" :"1040px"
      }}>
                                <Box sx={{ marginLeft:"10px",backgroundColor: "#42526E", width: "20px",height:"20px", display: "flex", alignItems: "center",borderRadius:"10px",justifyContent:'center' }}>

          <ArrowBackIosNewIcon style={{color:"white",width:"12px",height:"12px"}} onClick={toggleBox} /></Box>
        </Box>
      )}
      {isOpen && (
        <Box className="ViewContainer" style={{marginLeft: isOpen? "780px" :"840px"
      }}>
                      <Box sx={{ marginLeft:"10px",marginRight:"5px", backgroundColor: "#42526E", width: "20px",height:"20px", display: "flex", alignItems: "center",borderRadius:"10px",justifyContent:'center' }}>

          <ArrowForwardIosIcon style={{color:"white",width:"12px",height:"12px"}} onClick={toggleBox}/> </Box>
          <button
            className="Button"
            style={{
              backgroundColor: activeButton === ViewMode.Day ? "rgb(231, 236, 251, 0.85)" : "white",
              color: activeButton === ViewMode.Day ? "#4D7ED3" : "#42526E"
            }}
            onClick={() => handleButtonClick(ViewMode.Day)}
          >
            Day
          </button>
          <button
            className="Button"
            style={{
              backgroundColor: activeButton === ViewMode.Week ? "rgb(231, 236, 251, 0.85)" : "white",
              color: activeButton === ViewMode.Week ? "rgb(60, 73, 95)" : "#42526E"
            }}
            onClick={() => handleButtonClick(ViewMode.Week)}
          >
            Week
          </button>
          <button
            className="Button"
            style={{
              backgroundColor: activeButton === ViewMode.Month ? "rgb(231, 236, 251, 0.85)" : "white",
              color: activeButton === ViewMode.Month ? "rgb(60, 73, 95)" : "#42526E"
            }}
            onClick={() => handleButtonClick(ViewMode.Month)}
          >
            Month
          </button>
          <button
            className="Button"
            style={{
              backgroundColor: activeButton === ViewMode.Year ? "rgb(231, 236, 251, 0.85)" : "white",
              color: activeButton === ViewMode.Year ? "rgb(60, 73, 95)" : "#42526E"
            }}
            onClick={() => handleButtonClick(ViewMode.Year)}
          >
            Year
          </button>
        </Box>
      )}
    </div>
  );
};
