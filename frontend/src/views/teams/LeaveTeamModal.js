import React from 'react'
import { Typography,Modal,Fade,Button ,Box, Divider } from '@mui/material';
import PropTypes from "prop-types"; 
import { FcHighPriority } from "react-icons/fc";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';


const LeaveTeamModal = ({ leavemodal, closing, confirm }) => {

    const equipes = useSelector((state) => state.equipeReducer.equipes);

    



  return (

    <Modal
    open={leavemodal}
      onClose={closing}
    
   
  >
   
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
            width: "80%",
            maxWidth: "600px",
            padding: "20px",
            background: "#fff",
            borderRadius:'5px'

          }}
        >
            


    <Typography
            sx={{ fontSize: 20, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
    <span><FcHighPriority  style={{marginRight:'6px',fontSize:"20px"}}/></span> Leave team


    
             
          <Box mb={3}  mt={3}  display="flex" flexDirection={'column'}>

          <Typography color="rgb(52, 71, 103)" style={{marginLeft:"22px",fontSize:'15px',fontWeight:"bold"}} id="alert-dialog-description">
          Are you sure you want to leave  {equipes?.NameEquipe}?

                  </Typography>
    </Box>
          </Typography> 

        <Typography marginLeft={'22px'} color='#4d4c4c' fontFamily="Roboto, Helvetica, Arial, sans-serif" id="alert-dialog-description">
        You can re-join this team by requesting approval or getting an invite from an existing member.     
        
        </Typography>

        <Divider style={{marginTop:"12px"}} />
        < Box display="flex" flexDirection="row" justifyContent={'right'} mt={2}>
    
        <Button
                    variant="contained"
                    onClick={closing} 
                    sx={{
                      border: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'white',
                      minWidth: '10px',
                      MaxHeight: '5px',
                      fontcolor: 'black',
                      padding: '1 px',
                      marginTop: ' 15px',
                      marginRight:"10px"
                      
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={confirm}                   
                      sx={{
                      border: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: '#434a4f1f',
                      minWidth: '10px',
                      MaxHeight: '5px',
                      fontcolor: 'black',
                      padding: '1 px',
                      marginTop: ' 15px',
                      
                    }}
                  >
                    leave
                  </Button>
       </Box></div></div>
       </Modal>
  ); 
};

LeaveTeamModal.propTypes = {
    leavemodal: PropTypes.bool.isRequired,
    closing: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    
   

  };


export default LeaveTeamModal
