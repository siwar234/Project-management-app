import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Fade, Typography, Box, IconButton,Button, } from '@mui/material';
import image from '../../../assets/images/kanban.png';
import image1 from '../../../assets/images/bug.png';

import CloseIcon from '@mui/icons-material/Close';

const ProjectDescription = ({ openDescriptionModal,closeDescription ,handleOpenProject,handleOpenDescription}) => {
  return (
    <Modal open={openDescriptionModal}>
      <Fade in={openDescriptionModal}>
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
              overflow: 'auto',

              flexDirection: 'column',
              alignItems: 'center',
              width: '820px',
              height: '2200px',
              background: '#fff',
              borderRadius: '5px',
              position: 'relative',
              maxWidth: '850px',
              maxHeight: '690px',
            }}
          >
            <img
              src="https://media.istockphoto.com/id/1386705180/fr/photo/abstrait-fond-bleu.jpg?b=1&s=612x612&w=0&k=20&c=9Mz_Y-fSeUkESuPmxfl9if_KGS1gOUqalK2opIKvLCU="
              alt="teamimg"
              style={{ width: '100%', maxHeight: '80px', marginBottom: '20px' }}
            />
            <Typography
              variant="h6"
              style={{
                position: 'absolute',
                top: '5%',
                left: '15%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                padding: '10px',
                fontSize: '20px',
              }}
            >
              Project Description
            </Typography>
            <IconButton
              size="small"
              style={{
                color: 'white',
                borderRadius: '0',
                top: '3%',
                right: '5%',
                position: 'absolute',
              }}
              onClick={closeDescription}
            >
              <CloseIcon />
            </IconButton>

            <Box display={'flex'} flexDirection={'row'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: '30',
                    justifyContent: 'left',
                    marginLeft: '30px',
                  }}
                  color="rgb(52, 71, 103)"
                  gutterBottom
                  mt={2.5}
                >
                  The Agile methodology fosters collaborative effort by dividing large projects into
                  smaller, value-driven increments. It advocates for team-driven learning through
                  iterative delivery and self-organization in problem-solving.
                </Typography>
                <Box display={'flex'} flexDirection={'row'}>
                  <img
                    src="https://wac-cdn.atlassian.com/dam/jcr:af6bd00d-6455-4f29-8de4-57f13d841653/portfolio-580x312.svg?cdnVersion=1290"
                    alt="teamimg"
                    style={{
                      width: '225px',
                      maxHeight: '250px',
                      marginTop: '30px',
                      marginLeft: '80px',
                      marginRight: '10px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: '30',
                      justifyContent: 'left',
                      marginLeft: '20px',
                      marginTop: '30px',
                    }}
                    color="rgb(52, 71, 103)"
                    gutterBottom
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      Organize forthcoming tasks within a backlog. </span> <br></br>
                   
                    Prioritize and plan your team's work on the backlog.
                     Break down work from your project timeline,
                      and order work items so your team knows what to deliver first.
                  </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: '30',
                      justifyContent: 'left',
                      marginLeft: '50px',
                      marginTop: '90px',
                    }}
                    color="rgb(52, 71, 103)"
                    gutterBottom
                    mt={1}
                  >
                    {' '}
                    <span style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '10px' }}>
                      Track work using a simple board
                      <br></br>
                    </span>
                    Work items are represented visually on your kanban board, allowing teams to track the status of work at any time.
                  </Typography>
                  <img
                    src={image}
                    alt="teamimg"
                    style={{
                      width: '250px',
                      maxHeight: '180px',
                      marginTop: '80px',
                      marginLeft: '60px',
                      paddingLeft:"5px"
                    }}
                  />
                </Box>
                <Box display={'flex'} flexDirection={'row'} style={{ marginBottom: '50px' }}>
                  <img
                    src="https://wac-cdn.atlassian.com/dam/jcr:4d91dbdb-c188-4fcb-897b-3865831d7355/templates-spot.svg?cdnVersion=1333"
                    alt="teamimg"
                    style={{
                      width: '225px',
                      maxHeight: '250px',
                      marginTop: '60px',
                      marginLeft: '50px',
                      marginRight: '20px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: '30',
                      justifyContent: 'left',
                      marginLeft: '30px',
                      marginTop: '90px',
                    }}
                    color="rgb(52, 71, 103)"
                    gutterBottom
                    mt={2}
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Identify and capture bugs
                      <br></br>
                    </span>
                    See all your bugs in one place.
                     Once you’ve identified a bug, 
                     capture its details by creating an issue from anywhere in your project. 
                  </Typography>
                 
                </Box>
              </Box>
              
              <Box
                display={'flex'}
                flexDirection={'column'}
                style={{ marginBottom: '50px', marginLeft: '2px' }}
              >
                <Typography
                  sx={{
                    justifyContent: 'left',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: '100px',
                    marginRight: '40px',
                  }}
                  color="#615353"
                  fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                  gutterBottom
                  mt={2}
                >
                  Recommended for
                </Typography>
                <Typography
                  sx={{
                    justifyContent: 'left',
                    fontSize: 13,
                    fontWeight: '100',
                    marginLeft: '100px',
                    marginRight: '40px',
                  }}
                  color="black"
                  fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                  gutterBottom
                  mt={1}
                >
                  Teams and projects that require adaptability, collaboration, and frequent
                  iterations to deliver value effectively
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      justifyContent: 'left',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginLeft: '100px',
                      marginRight: '40px',
                    }}
                    color="#615353"
                    fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                    gutterBottom
                    mt={5}
                  >
                    Workflow
                  </Typography>
                  <Box
                    style={{
                      display: 'flex',
                      marginLeft: '100px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '10px',
                        width: '50px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        height: '25px',
                        fontWeight: 'bold',
                        backgroundColor: '#7ca1f35e',
                        marginRight: '10px',
                        marginTop: '15px',
                        color: '#5d87ff',
                        fontFamily: 'system-ui',
                      }}
                    >
                      TO DO
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '10px',
                        width: '75px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        height: '25px',
                        backgroundColor: 'rgb(227 226 226 / 55%)',
                        marginRight: '10px',
                        marginTop: '15px',
                        color: 'rgb(107 107 107)',
                        fontWeight: 'bold',
                        fontFamily: 'system-ui',
                      }}
                    >
                      IN PROGRESS
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '11px',
                        fontFamily: 'system-ui',
                        width: '50px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        height: '25px',
                        backgroundColor: 'rgb(214 247 210)',
                        marginTop: '15px',
                        fontWeight: 'bold',
                        color: 'rgb(12 119 26)',
                      }}
                    >
                      DONE
                    </Typography>
                  </Box>
                 
                </Box>
              </Box>
            </Box>
            <Button
                
                onClick={() => {
                    closeDescription();
                    handleOpenProject()
                  }}
                  variant="contained"
                  size="small"
                  style={{ marginLeft: '620px',marginBottom:"20px",marginRight:"20px", backgroundColor: '#5d87ff' }}
                >
                  Create a New Project
                </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

ProjectDescription.propTypes = {
  openDescriptionModal: PropTypes.bool.isRequired,
  closeDescription:PropTypes.func.isRequired,
  handleOpenDescription:PropTypes.func.isRequired,
  

};

export default ProjectDescription;
