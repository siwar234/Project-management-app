import React, { useState,useEffect } from 'react';
import { Typography,Modal,Fade,Button ,Box, Divider , TableContainer,Table,TableCell,TableBody,TableRow, TableHead,TextField, Tooltip, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import PropTypes from "prop-types"; 
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add'; 

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { createFeature, getAllFeatures, updatefeatures } from 'src/JS/actions/feature';
import {  useSelector } from 'react-redux';
import image from '../../../assets/images/checking.webp';
import ProgressBar from 'react-bootstrap/ProgressBar';

import image1 from "../../../assets/images/feature.png"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useParams } from 'react-router';

const EpicModal = ({openEpic,handleCloseEpic,setTextFieldVisible,isTextFieldVisible,setOpenFeatureId,openFeatureId}) => {

     const dispatch=useDispatch()
    //  const blueImage = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMaPpZNMfpeRW2pvUdyvPCo25MpwrlFma3z29DkWQwQ&s`;

     const [featureTitle, setFeatureTitle] = useState('');
     const [isArrowclicked, setArrwoclicked] = useState(false);
     const { projectId } = useParams();
     console.log("projectId" ,projectId)

   
    

     const [anchorEl, setAnchorEl] = useState(null);

     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
   
     const handleClose = () => {
       setAnchorEl(null);
     };


     useEffect(() => {
        dispatch(getAllFeatures(projectId));
    }, [dispatch]);

    const handleOpenBox = (featureId) => {
        setOpenFeatureId(featureId);
    };


     const handleAddFeatureClick = () => {
        setTextFieldVisible(true);
      };

      const features = useSelector((state) => state.featureReducer.features)  || [] ;
      console.log("Feature:", features);

      const calculateProgress = (feature, etat) => {
        if (!feature.Tickets || feature.Tickets.length === 0) {
          return 0; 
        }
    
        const etatTickets = feature.Tickets.filter(ticket => ticket.Etat === etat);
        const totalTickets = feature.Tickets.length;
    
        return (etatTickets.length / totalTickets) * 100; 
      };

      const calculateDoneProgress = (feature) => {
        if (!feature.Tickets || feature.Tickets.length === 0) {
          return 0;
        }
      
        const doneTickets = feature.Tickets.filter(ticket => ticket.Etat === 'DONE');
        const totalTickets = feature.Tickets.length;
      
        return (doneTickets.length / totalTickets) * 100;
      };
      
      
    
    const handleAddFeature = () => {
        if (featureTitle.trim() !== '') {
            dispatch(createFeature({ projectId:projectId, titleF: featureTitle }));
            setFeatureTitle(''); 
            setTextFieldVisible(false)
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddFeature();
        }
    };
   
   
    const handleArrowClick = (clickedFeatureId) => {
      setArrwoclicked((prevState) => ({
        ...prevState,
        [clickedFeatureId]: !prevState[clickedFeatureId],
      }));
    };
    const tasks = useSelector((state) => state.tasksReducer.tasks);

  

     
    const handleFeatureTitleChange = (event) => {
        setFeatureTitle(event.target.value);
    };


    const [editingText, setEditingText] = useState(false);
    const [tittle, settitle] = useState({});

    const handleClickTitle = () => {
        setEditingText(true);
    };

    const handleUpdateFeatures = (featureId, data) => {
        return dispatch(updatefeatures(projectId,featureId, data))
            .then(() => {
                dispatch(getAllFeatures(projectId));
            })
            .catch((error) => {
                console.error('Error updating feature:', error);
                throw error; 
            });
    };
    
    const handleKeyPressing = (featureId, event) => {
        if (event.key === 'Enter') {
            handleUpdateFeatures(featureId, { titleF: tittle  })
                .then(() => {
                    setEditingText(false);
                })
                .catch(error => {
                    console.error('Error updating feature:', error);
                });
        }
    };
    
    const handleUpdate = (featureId, selectedImage) => {
        handleUpdateFeatures(featureId, { iconF: selectedImage });
    };
    

    
  return (

    <Modal
    open={openEpic}
      onClose={handleCloseEpic}
    
   
  >
    <Fade in={openEpic}>
   
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
       
      >
        
        <div
          style={{
            maxWidth: "1000px",
            padding: "20px",
            background: "#fff",
            borderRadius:'5px',
            width:'700px',
            height:  " 610px",

          }}
        >
            


    <Typography
             mb={4}
            sx={{ fontSize: 20, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
    Add a Feature


 
          </Typography> 

        <Typography marginLeft={'22px'} color='#4d4c4c' fontFamily="Roboto, Helvetica, Arial, sans-serif" id="alert-dialog-description">
        </Typography>

        <Box display="flex" flexDirection="row" justifyContent="space-between" mt={2}  >
        
        
      

          <Box  bgcolor={'#adadad1f'} p={2} borderRadius={2} height={'450px'} width={"270px"} overflow={'auto'}   display="flex"
      flexDirection="column" maxHeight={"350px"} 
  >
         <Typography
             mb={1}
            sx={{ fontSize: 15, fontWeight: '100' }}
            color="black"
            fontFamily="sans-serif"
            gutterBottom
          >
   Features


 
          </Typography> 
          {features && features.map((feature, index) => (
  <Box
    bgcolor={'white'}
    p={2}
    mt={2}
    width={'220px'}
    borderRadius={1}
    display="flex"
    flexDirection="column"
    style={{ height: isArrowclicked[feature._id] ? '400px' : 'auto' }} 
  >
   <Box key={index} display="flex" alignItems="left" flexDirection={'column'} style={{ marginBottom: isArrowclicked[feature._id] ? '50px' : 'auto' }} >
    <Box key={index} display="flex" alignItems="left" flexDirection={'row'} justifyContent="left">
        <div style={{ marginRight: "5px", marginLeft: "5px" }}>
            {isArrowclicked[feature._id] ? (
                <KeyboardArrowDownIcon
                    onClick={() => handleArrowClick(feature._id)}
                    style={{
                        width: "15px",
                        color: "black",
                    }} 
                />
            ) : (
                <KeyboardArrowRightIcon
                    onClick={() => handleArrowClick(feature._id)}
                    style={{
                        width: "15px",
                        color: "black"
                    }}  
                />
            )}
        </div>

        <div style={{ backgroundColor: feature.iconF ? feature.iconF : '#7ca1f35e', width: '18px', height: '18px', marginRight: '10px', borderRadius: "2px" }} />

        <Typography style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>{feature.titleF}</Typography>
        
    </Box>

    <Box display="flex" alignItems="center" flexWrap="wrap">
  {feature.Tickets && [...new Set(feature.Tickets.map(ticket => ticket.Etat))].map((etat, index) => {
    const etatTickets = feature.Tickets.filter(ticket => ticket.Etat === etat);
    const totalTickets = feature.Tickets.length;
    return (
      <div key={index} style={{ marginRight: '5px', marginBottom: '5px', width: `${90 / feature.Tickets.length}%` }}>
        <Tooltip 
          title={ ` ${etat} :  ${etatTickets.length} tickets of ${totalTickets}`}
          key={index}
        >
          <ProgressBar
            value={calculateProgress(feature, etat)}
            style={{
              height: '6px',
              backgroundColor: etat === 'IN_PROGRESS' ? 'rgb(227 226 226 / 55%)' : etat === 'TO DO' ? '#7ca1f35e' : 'rgb(214 247 210)',
            }}
          />
        </Tooltip>
      </div>
    );
  })}
</Box>

    {isArrowclicked[feature._id] && (
        <>   
<Typography mt={2} style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", marginLeft:'20px' }}>
  due date : <span>{feature.endDate !== null ? new Date(feature.endDate).toLocaleDateString() : 'none'}</span>
</Typography>

<Typography mt={2} style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", marginLeft:'20px' }}>
  start date : <span>{feature.startDate !== null ? new Date(feature.startDate).toLocaleDateString() : 'none'}</span>
</Typography>


        </>
    )}
</Box>

    {isArrowclicked[feature._id] && (
   <Button
   variant="contained"
   onClick={() => handleOpenBox(feature._id)}
   sx={{
       fontWeight: 'bold',
       fontSize: '12px',
       color: 'black',
       backgroundColor: '#F4F4F4',
       width: '200px',
       marginLeft: "30px",
       alignSelf: 'flex-end',
   }}
>
   Show all information
</Button>
    )}
  </Box>
))}

{features.length === 0 && (
    <>
        <img src={image1} alt="blue" width="220" height="140" style={{ marginRight: '10px', borderRadius: "2px", marginBottom: '20px' }} />
        <Typography style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: "400", color: "#777777", alignItems: "center" }}>
            <span style={{ alignItems: 'center', alignSelf: "center", fontWeight: "bold", fontSize: 12.5 }}> Plan and prioritize large blocks of work</span>
            <br /><br />
            <span style={{ fontWeight: "400", fontSize: 12, marginLeft: "18px" }}>Create your first epic to start recording </span>
            <br />
            <span style={{ fontWeight: "400", fontSize: 12, marginLeft: "25px" }}>and subdividing your team's work.</span>
        </Typography>
    </>
)}

          </Box>
          {isTextFieldVisible ? (
              <TextField
                label="how the feature will be called?"
                variant="outlined"
                onChange={handleFeatureTitleChange}
                onKeyPress={handleKeyPress}
                margin="normal"
                style={{
                position: 'absolute', bottom: 165,width:"265px"}}
              />
            ) : (
<Button
        variant="contained"
        onClick={handleAddFeatureClick}
        sx={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: 'black',
          backgroundColor: '#434a4f1f',
          width: '255px',
          alignSelf: 'flex-end',
          marginRight:"400px",
        
          position: 'absolute',
          bottom: 190,

        }}
        startIcon={<AddIcon />} 
      >
        Add a feature
      </Button>
            )}

{openFeatureId && features && features.map((feature, index) => (
    <React.Fragment key={index}>
        {openFeatureId === feature._id && (
            <Box bgcolor={'#adadad1f'} p={2} borderRadius={2} height={'450px'} width={"370px"} overflow={'auto'} display="flex" flexDirection="column" maxHeight={"350px"}>
                <Box display="flex" alignItems="center" flexDirection="row" marginRight='120px' justifyContent="left">
                   
                        <React.Fragment>
                            <Tooltip title="edit color">
                                <IconButton onClick={handleClick}>
                                <div style={{ backgroundColor: feature.iconF ? feature.iconF : '#7ca1f35e', width: '18px', height: '18px', marginRight: '10px', borderRadius: "2px" }} />

                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Box display="flex">

                                    <MenuItem onClick={() => handleUpdate(feature._id, '#7CA1F3')}>
                                        <div style={{ backgroundColor: '#7CA1F3', width: '24px', height: '24px' }} />
                                    </MenuItem>
                                    <MenuItem onClick={() => handleUpdate(feature._id, '#CDF7D4')}>
                                        <div style={{ backgroundColor: '#CDF7D4', width: '24px', height: '24px' }} />
                                    </MenuItem>
                                    <MenuItem onClick={() => handleUpdate(feature._id, '#ffc0ca')}>
                                        <div style={{ backgroundColor: '#ffc0ca', width: '24px', height: '24px' }} />
                                    </MenuItem>
                                    <MenuItem onClick={() => handleUpdate(feature._id, 'rgb(227 226 226 / 55%)')}>
                                        <div style={{ backgroundColor: 'rgb(227 226 226 / 55%)', width: '24px', height: '24px' }} />
                                    </MenuItem>
                                </Box>
                            </Menu>
                            {editingText ? (
                                <TextField
                                    defaultValue={feature.titleF}
                                    onChange={(e) => settitle(e.target.value)}
                                    onKeyPress={(event) => handleKeyPressing(feature._id,event)}
                                    margin="normal"
                                    autoFocus
                                    style={{ marginBottom: "25px" }}
                                />
                            ) : (
                                <Typography sx={{ fontSize: 15, fontWeight: '100' }} color="black" fontFamily="sans-serif" gutterBottom onClick={handleClickTitle}>
                                    {feature.titleF}
                                </Typography>)}
                                
                        </React.Fragment>
                </Box>
                <TableContainer style={{marginTop:"20px"}}>
                    <Table>
                       
                    <TableBody>
                    {feature.Tickets && (
  <Typography style={{ fontSize: "12px", color: "gray", marginLeft: '10px' }}>
    Progress : {calculateDoneProgress(feature).toFixed(0)}%
  </Typography>
)}


<Box display="flex" alignItems="center" flexWrap="wrap">
  {feature.Tickets && [...new Set(feature.Tickets.map(ticket => ticket.Etat))].map((etat, index) => {
    const progress = calculateProgress(feature, etat);
    const etatTickets = feature.Tickets.filter(ticket => ticket.Etat === etat);

    const totalTickets = feature.Tickets.length;

    // const progressLabel = etat === 'DONE' ? `Progress: ${progress.toFixed(0)}%` : ''; 
    return (
        
      <div key={index} style={{ marginRight: '5px', marginBottom: '5px', width: `${90 / feature.Tickets.length}%`, display: "flex", flexDirection: "column" }}>
            <Tooltip title={ ` ${etat} :  ${etatTickets.length} tickets of ${totalTickets}`}>
          <ProgressBar
            value={progress}
            style={{
              height: '6px',
              backgroundColor: etat === 'IN_PROGRESS' ? 'rgb(227 226 226 / 55%)' : etat === 'TO DO' ? '#7ca1f35e' : 'rgb(214 247 210)',
            }}
          />
        </Tooltip>
      </div>
);
  })}
  
</Box>

    {feature.Tickets.map(ticket => {
        const isInTasks = tasks.tickets && tasks.tickets.some(taskTicket => taskTicket._id === ticket._id);
        const descriptionStyle = isInTasks ? {} : { background: '#f0f0f0' };

        return (
            <TableRow style={{ border: '1px solid #d1d1d1' }} key={ticket._id}>
                <TableCell style={{ width: '100%', border: '1px solid #d1d1d1' }}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
<Tooltip title={ticket.Description}>
    

                        <Typography
                            style={{
                                cursor: 'pointer',
                                ...descriptionStyle, 
                                marginLeft: '2px',
                                color: '#46545f',
                                fontFamily: 'sans-serif',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={ticket.Type === 'Bug' ? image1 : image}
                                alt="icon"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    marginRight: '15px',
                                }}
                            />
  {ticket.Description.length > 20 ? `${ticket.Description.substring(0,10)}...` : ticket.Description}
                        </Typography></Tooltip>
                        
                        <Button
                            style={{
                                width: 'fit-content',
                                textAlign: 'center',
                                borderRadius: '3px',
                                height: '25px',
                                fontWeight: 'bold',
                                backgroundColor:
                                    ticket.Priority === 'Low'
                                        ? '#9f8fef7d'
                                        : ticket.Priority === 'High'
                                        ? '#cdf7d4'
                                        : '#ffc0ca',
                                marginRight: '20px',
                                marginLeft: '15px',
                                color:
                                    ticket.Priority === 'Low'
                                        ? '#5b356fcc'
                                        : ticket.Priority === 'High'
                                        ? 'rgb(35 145 115)'
                                        : '#c1535c',
                                fontFamily: 'system-ui',
                            }}
                        >
                            <span style={{ fontSize: '13px' }}>{ticket.Priority}</span>
                        </Button>
                        <Button
                            style={{
                                fontSize: '10px',
                                width: 'fit-content',
                                textAlign: 'center',
                                borderRadius: '3px',
                                height: '25px',
                                fontWeight: 'bold',
                                backgroundColor:
                                    ticket.Etat === 'TO DO'
                                        ? '#7ca1f35e'
                                        : ticket.Etat === 'IN_PROGRESS'
                                        ? 'rgb(227 226 226 / 55%)'
                                        : 'rgb(214 247 210)',
                                marginRight: '20px',
                                color:
                                    ticket.Etat === 'TO DO'
                                        ? '#5d87ff'
                                        : ticket.Etat === 'IN_PROGRESS'
                                        ? 'rgb(107 107 107)'
                                        : 'rgb(12 119 26)',
                                fontFamily: 'system-ui',
                            }}
                        >
                            <span>{ticket.Etat}</span>
                        </Button>
                        <Tooltip
                            title={`Responsible: ${
                                ticket.ResponsibleTicket
                                    ? ticket.ResponsibleTicket.firstName
                                    : 'Not assigned'
                            }`}
                        >
                            <Avatar
                                src={ticket?.ResponsibleTicket?.firstName}
                                sx={{
                                    bgcolor: ticket?.ResponsibleTicket ? '#42a5f5' : "#3c597c",
                                    width: 25,
                                    height: 25,
                                    fontSize: '11px',
                                    marginRight: '1px',
                                }}
                            >
                                {ticket?.ResponsibleTicket?.firstName &&
                                    ticket?.ResponsibleTicket?.firstName
                                        .substring(0, 2)
                                        .toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    </Box>
                </TableCell>
            </TableRow>
        );
    })}
</TableBody>



                    </Table>
                </TableContainer>
            </Box>
        )}
    </React.Fragment>
))}

   
   
   
   
    </Box>


        <Divider style={{marginTop:"110px"}} />
        < Box display="flex" flexDirection="row" justifyContent={'right'} mt={2}>
    
        <Button
                    variant="contained"
                    onClick={handleCloseEpic} 
                    sx={{
                      border: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: '#434a4f1f',
                      width: '140px',
                      MaxHeight: '5px',
                      fontcolor: 'black',
                      padding: '1 px',
                      marginTop: ' 15px',
                      marginRight:"10px"
                      
                    }}
                  >
                    cancel
                  </Button>
                
       </Box></div></div>
      
        </Fade></Modal>
  ); 
};

EpicModal.propTypes = {
    openEpic: PropTypes.bool.isRequired,
    handleCloseEpic: PropTypes.func.isRequired,
    
   

  };


export default EpicModal
