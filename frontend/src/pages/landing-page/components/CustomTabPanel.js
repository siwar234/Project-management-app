import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { alpha } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import image2 from "../../../assets/images/51ff46161194495.63c10003070ef.png";
import image1 from "../../../assets/images/image1.png";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: image1,
  },
  {
    imgPath: image2,
  },
  {
    imgPath: image1,
  },
  {
    imgPath: image2,
  },
];

export const CustomTabPanel = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  function CustomTabPanel({ value, index, children }) {
    return (
      <div hidden={value !== index}>
        {value === index && (
          <div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          display: "flex",
          justifyContent: "left",
          "& .MuiTabs-flexContainer": {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          },
        }}
      >
        <Tab
          label="Collaboration"
          sx={{
            fontSize: "20px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "primary.light",
            fontFamily: "arial",
            fontWeight: "600",
            letterSpacing: " -0.2px",
          }}
        />
        <Tab
          label="Planification"
          sx={{
            fontSize: "20px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "primary.light",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "600",
            letterSpacing: " -0.2px",
            justifyContent: "space-around",
          }}
        />
        <Tab
          label="Statistics"
          sx={{
            fontSize: "20px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "primary.light",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "600",
            letterSpacing: " -0.2px",
            justifyContent: "space-around",
          }}
        />
        <Tab
          label="Bugs"
          sx={{
            fontSize: "20px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "primary.light",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "600",
            letterSpacing: " -0.2px",
            justifyContent: "space-around",
          }}
        />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        {value === 0 && (
          <Box
            sx={{
              mt: { xs: 8, sm: 10 },
              height: "100%",
              width: "90%",
              position: "relative",
              borderRadius: "10px",
              marginLeft:'100px',
              outline: "1px solid",
              outlineColor: alpha("#BFCCD9", 0.5),
              boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
              overflow: "hidden",
            }}
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            ></Paper>

            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              interval={1415}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>

            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                width: "100%",
                mt: 2,
                fontSize: "10rem",
                justifyContent: "center",
                bgcolor: "transparent",
              }}
            />
          </Box>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {value === 1 && (
          <Box
            sx={{
              mt: { xs: 8, sm: 10 },
              height: { xs: 200, sm: 700 },
              width: "100%",
              backgroundImage: `url(${image2})`,
              backgroundSize: "cover",
              borderRadius: "10px",
              outline: "1px solid",
              outlineColor: alpha("#BFCCD9", 0.5),
              boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {value === 2 && (
          <Box
            sx={{
              mt: { xs: 8, sm: 10 },
              height: { xs: 200, sm: 700 },
              width: "100%",
              backgroundImage: `url(${image2})`,
              backgroundSize: "cover",
              borderRadius: "10px",
              outline: "1px solid",
              outlineColor: alpha("#BFCCD9", 0.5),
              boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        {value === 3 && (
          <Box
            sx={{
              mt: { xs: 8, sm: 10 },
              height: "100%",
              width: "100%",
              position: "relative",
              borderRadius: "10px",
              outline: "1px solid",
              outlineColor: alpha("#BFCCD9", 0.5),
              boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
              overflow: "hidden",
            }}
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            ></Paper>

            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              interval={1395}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>

            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                width: "100%",
                mt: 2,
                fontSize: "10rem",
                justifyContent: "center",
                bgcolor: "transparent",
              }}
            />
          </Box>
        )}
      </CustomTabPanel>
    </>
  );
};
