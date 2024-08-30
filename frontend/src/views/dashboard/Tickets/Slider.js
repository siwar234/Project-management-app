import { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import image2 from '../../../assets/images/portrait.jpg';
import image3 from '../../../assets/images/womenavatar.png';
import AvatarGroup from '@mui/material/AvatarGroup';
import ProjectDescription from 'src/layouts/full/header/ProjectDescription';
import image5 from '../../../assets/images/icons/projection.png';


export const Slider = ({ searchQuery, handlecreate,projects,user,tickets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openDescriptionModal, setopenDescriptionModal] = useState(false);

  const handleOpenDescription = () => {
    setopenDescriptionModal(true);
  };
  const closeDescription = () => {
    setopenDescriptionModal(false);
  };



  const handleOpen = (projectid) => {
    if (projectid) {
      window.location.href = `/projects/details/${projectid}`;
    } else {
      // console.log('projectid ID is not provided');
    }
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };
  

  const [openProject, setopenProject] = useState(false);

  const handleOpenProject = () => {
    setopenProject(true);
  };


  return (
    <>
      <div
        className="container"
        style={{ height: '200px', display: 'flex', justifyContent: 'left', position: 'relative' }}
      >
        <div
          className="wrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            transform: `translateX(-${currentIndex * 310}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          <Card
            sx={{
              width: '180px',
              minWidth: '200px',
              height: '220px',
              margin: '0 8px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.09)',
              },
            }}
          >
            {' '}
            <CardActionArea>
              <CardMedia
                sx={{
                  height: '100px',
                  backgroundImage: 'linear-gradient(to right, #B8EBED, #93c2cb)',
                  display: 'flex',
                }}
              >
                {' '}
                <AvatarGroup
                  style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '50px' }}
                  max={3}
                >
                  <Avatar
                    src={user?.profilePicture}
                    sx={{
                      bgcolor: '#42a5f5',
                      width: '35px',
                      height: '35px',
                      fontSize: '15px',
                      alignItems: 'center',
                    }}
                  >
                    {user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <Avatar
                    src={image2}
                    sx={{
                      width: '35px',
                      height: '35px',
                      alignItems: 'center',
                    }}
                  ></Avatar>
                  <Avatar
                    src={image3}
                    sx={{
                      bgcolor: '#fff',
                      width: '35px',
                      height: '35px',
                      alignItems: 'center',
                    }}
                  ></Avatar>
                </AvatarGroup>
              </CardMedia>
              <ProjectDescription
              openDescriptionModal={openDescriptionModal}
              closeDescription={closeDescription}
              handleOpenProject= {handleOpenProject}

            />
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  gutterBottom
                  style={{ fontSize: '15px', color: '#555555', justifyContent: 'center' }}
                >
                  {' '}
                  Create a new project {' '}
                </Typography>
                <br />
                <Button
                  variant="contained"
                  style={{
                    marginLeft: '10px',
                    fontWeight: 'bold',

                    fontSize: '12px',
                    width: '134px',
                    backgroundColor: '#e1dfdf',
                    color: 'rgb(39 22 22 / 84%)',
                    border: 'none',
                  }}
                  onClick={handleOpenDescription}
                >
                  Create a project
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
          {projects &&  projects
    .filter(project => project.projectName.toLowerCase().includes(searchQuery))
    .map((project, index) => {
      const filteredTickets = tickets.filter(ticket => {
        return ticket.projectId._id === project._id && ticket.Etat === "DONE";
    });
    const ticketss = tickets.filter(ticket => {
      return ticket.projectId._id === project._id && ticket.Etat === "IN_PROGRESS";
  });

      const doneTicketsCount = filteredTickets.length;
      const openTicketsCount = ticketss.length;
      const backgroundColor = index % 2 === 0 ? '#B8EBED' : '#ffe2cfd9';

     
      return (
        <Card
        onClick={() => handleOpen(project?._id)}
        key={project._id}
        sx={{
          display: 'flex',
          width: '220px',
          minWidth: '200px',
          height: '220px',
          margin: '0 8px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.09)',
          },
          position: 'relative', 
        }}
      >
          <div
            style={{
              width: '30px',
              backgroundColor: backgroundColor,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'top',
              justifyContent: 'top',
              marginRight: '25px',
            }}
          >
            <img
              style={{ width: '35px', height: '35px', marginTop: "20px", marginLeft: "5px" }}
              src={project.Icon || image5}
              alt="Warning"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: "15px" }}>
            <Typography
              gutterBottom
              component="div"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <span style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#555555',
                textAlign: 'left',
              }}>
                {project.projectName}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'black',
                textAlign: 'left',
              }}>
                {project.type}
              </span>
            </Typography>
            <Typography
              gutterBottom
              component="div"
              sx={{ display: 'flex', flexDirection: 'column', marginTop: "10px" }}
            >
              <span style={{
                color: "gray",
                fontWeight: "bold",
                fontSize: "13px",
                marginRight: "90px"
              }}>
                Quick links
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'black',
                textAlign: 'left',
                marginTop: '15px'
              }}>
                Open Tickets <Chip label={openTicketsCount} style={{ width: "35px", height: "15px", marginLeft: '40px', justifyContent: 'center', alignContent: "center" }}></Chip>
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'black',
                textAlign: 'left',
                marginTop: '15px'
              }}>
                Done Tickets <Chip label={doneTicketsCount} style={{ width: "35px", height: "15px", marginLeft: '40px', justifyContent: 'center', alignContent: "center" }}>{doneTicketsCount}</Chip>
              </span>
            </Typography>
          </div>
        </Card>
        );
    })}


        </div>
        <IconButton
          onClick={goToPrevSlide}
          style={{ position: 'absolute', top: '50%', left: '-50px', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '-350px',
          transform: 'translateY(-50%)',
        }}
      >
        <ChevronRight />
      </IconButton>
      </div>
      

      {/* <EquipeDetails ouvrir={ouvrir} handleClosee={close} /> */}
    </>
  );
};
