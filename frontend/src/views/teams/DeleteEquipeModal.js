import React from 'react'
import { Typography,Modal,Fade,Button ,Box, Divider } from '@mui/material';
import PropTypes from "prop-types"; 
import { FcHighPriority } from "react-icons/fc";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';


const DeleteEquipeModal = ({ open, handleClose, handleConfirm }) => {
  const equipes = useSelector((state) => state.equipeReducer.equipes);

  return (

    <Modal
    open={open}
      onClose={handleClose}
    
   
  >
    <Fade in={open}>
   
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
    <span><FcHighPriority  style={{marginRight:'6px',fontSize:"20px"}}/></span> You’re about to delete this team


    <Card
              sx={{
                mt: 3.5,
                mb: 3,
                mx: 3,
                py: 2,
                px: 2,
                backgroundColor: '#ebebeb4f',
                width: '290px',
                opacity: '100',
                borderRadius: '0.2rem',
                height: '80px',
                position: 'relative',
                justifyContent:'center',
                
              }}
            >
                <Box display="flex" flexDirection={'row'}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box display="flex" flexDirection={'column'}>

          <Typography color="rgb(52, 71, 103)" style={{marginLeft:"12px", marginTop:"-1px",fontSize:'13px',fontWeight:"bold"}} id="alert-dialog-description">
          {equipes?.NameEquipe}
        </Typography>
        <Typography color="#4d4c4c"  mb={2} style={{marginLeft:"12px", marginTop:"2px",fontSize:'12px',fontWeight:"bold"}} id="alert-dialog-description">
         2 members , including You
        </Typography></Box>
          </Box>
</Card>
          </Typography> 

        <Typography marginLeft={'22px'} color='#4d4c4c' fontFamily="Roboto, Helvetica, Arial, sans-serif" id="alert-dialog-description">
        This will remove all information related to the team, and all members will lose access. 
        <br>
        </br>You won’t be able to share, mention, 
        and find the team from search results across all application.
<br/><br/>
Before you delete, you may want to check if you have files or information you need under this team,
        </Typography>

        <Divider style={{marginTop:"12px"}} />
        < Box display="flex" flexDirection="row" justifyContent={'right'} mt={2}>
    
        <Button
                    variant="contained"
                    onClick={handleClose} 
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
                    onClick={handleConfirm}                   
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
                    delete
                  </Button>
       </Box></div></div>
        </Fade></Modal>
  ); 
};

DeleteEquipeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    
   

  };


export default DeleteEquipeModal
