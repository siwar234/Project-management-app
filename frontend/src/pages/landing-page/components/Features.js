import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { alpha } from "@mui/material/styles";
import image1 from "../../../assets/images/agile2.gif";
import image2 from "../../../assets/images/kanban.gif";
import { useInView } from "react-intersection-observer"; 


const items = [
  {
    icon: <GroupRoundedIcon />,
    title: "Scrum Dashboard",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    imageLight: image1,
    imageDark: image1,
  },
  {
    icon: <AssignmentIcon   />,
    title: "Kanban",
    description:
      "This item could provide information about the mobile app version of the product.",
    imageLight: image2,
    imageDark: image2,
  },
  {
    icon: <MapIcon />,
    title: "MindMap",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    imageLight:
      'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [ref, inView] = useInView();

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Box
      id="features"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(to left,#5084bc, #f3f6f4, #FFF)"
            : `linear-gradient(to up,#02294F, ${alpha("#090E10", 0.0)})`,

        backgroundSize: "100% 100%", // Adjust the background size accordingly
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container id="features" sx={{ py: { xs: 10, sm: 7 } }}>
      <Grid container spacing={6}>
    <Typography
      variant="h1"
      sx={{
        color: "#0f457b",
        fontFamily: "'Inter', sans-serif",
        marginTop: "50px",
        marginLeft: { xs: '100px', sm: '266px' },
        marginBottom: "38px",
        fontSize: { xs: "30px", sm: "35px" },
      }}
    >
      A complete reference for your development needs.
    </Typography>
    <Typography
      variant="body1"
      textAlign="center"
      color="text.secondary" 
      sx={{
        fontFamily: "'Inter', sans-serif",
        fontWeight:'400',
        fontSize: "20px",
        lineHeight: 1.43,
        marginLeft: { xs: "50px", sm: "195px" },
        display: { sm: "flex" },
      }}
    >
      Manage your projects with ease, stay connected and move forward together. An agile project management tool.
    </Typography>
  
          <Grid item xs={12} md={6}>
            <Grid
              container
              item
              gap={2}
              sx={{
                display: { xs: "auto", sm: "none" },
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {items.map(({ title }, index) => (
                 <Chip
                 key={index}
                 label={title}
                 onClick={() => handleItemClick(index)}
                 sx={{
                   borderColor: (theme) => {
                     if (theme.palette.mode === 'light') {
                       return selectedItemIndex === index ? 'primary.light' : '';
                     }
                     return selectedItemIndex === index ? 'primary.light' : '';
                   },
                   background: (theme) => {
                     if (theme.palette.mode === 'light') {
                       return selectedItemIndex === index ? 'none' : '';
                     }
                     return selectedItemIndex === index ? 'none' : '';
                   },
                   backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                   '& .MuiChip-label': {
                     color: selectedItemIndex === index ? '#fff' : '',
                   },
                 }}
               />
              ))}
            </Grid>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                display: { xs: "auto", sm: "none" },
                mt: 4,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Box
                sx={{
                  
                  backgroundImage: selectedFeature.imageLight,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 280,
                
                }}
              />
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography
                  color="text.primary"
                  variant="body2"
                  fontWeight="bold"
                >
                  {selectedFeature.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ my: 0.5 }}
                >
                  {selectedFeature.description}
                </Typography>
                <Link
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "& > svg": { transition: "0.2s" },
                    "&:hover > svg": { transform: "translateX(2px)" },
                  }}
                >
                  <span>Learn more</span>
                  <ChevronRightRoundedIcon
                    fontSize="normal"
                    sx={{ mt: "1px", ml: "2px" }}
                  />
                </Link>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              useFlexGap
              sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
            >
              {items.map(({ icon, title, description, imageLight }, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 3,
                    height: "fit-content",
                    width: "100%",
                    background: "none",
                    backgroundColor:
                      selectedItemIndex === index
                        ? "action.selected"
                        : undefined,
                    borderColor: (theme) => {
                      if (theme.palette.mode === "light") {
                        return selectedItemIndex === index
                          ? "primary.light"
                          : "grey.200";
                      }
                      return selectedItemIndex === index
                        ? "primary.dark"
                        : "grey.800";
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      textAlign: "left",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { md: "center" },
                      gap: 2.5,
                    }}
                  >
                      <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                    <Box sx={{ textTransform: "none" }}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          fontSize: "18px", 
                          fontFamily: '"Inter", sans-serif',
                          lineHeight: 1.43,
                          color: "#131B20", 
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{
                          fontSize: "15px", 
                          fontFamily: '"Inter", sans-serif',
                          lineHeight: 1.43, 
                          color: "#4C5967", 
                          my: 0.5
                        }}
                      >
                        {description}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          "& > svg": { transition: "0.2s" },
                          "&:hover > svg": { transform: "translateX(2px)" },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>Learn more</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: "1px", ml: "2px" }}
                        />
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
          >
            <Box
                          ref={ref}

              sx={{
                mt: { xs: 4, sm: 1 },
                height: { xs: 200, sm: 400 },
                width: "100%",
                backgroundImage: `url(${selectedFeature.imageDark})`,
                backgroundSize: "cover",
                borderRadius: "10px",
                outline: "1px solid",
                outlineColor: alpha("#BFCCD9", 0.5),
                boxShadow: `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                animation: inView ? "popOut 0.9s ease-out backwards" : "",
                "@keyframes popOut": {
                  "0%": {
                    transform: "scale(0.8)",
                    opacity: 0,
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },}
              }}
           
              

            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
