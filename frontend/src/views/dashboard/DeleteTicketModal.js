import React from 'react'
import { Typography,Modal,Fade,Button ,Box, Divider } from '@mui/material';
import PropTypes from "prop-types"; 
import { FcHighPriority } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { deletetickets } from 'src/JS/actions/Tickets';




const DeleteTicketModal = ({ openDeleting, handleCloseDeleting,ticketname,ticketId }) => {

     const dispatch=useDispatch()


    const handleConfirm = () => {
        dispatch(deletetickets(ticketId))
        handleCloseDeleting();

         
       };
      
       
  return (

    <Modal
    open={openDeleting}
      onClose={handleCloseDeleting}
    
   
  >
    <Fade in={openDeleting}>
   
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
            maxWidth: "400px",
            padding: "20px",
            background: "#fff",
            borderRadius:'5px'

          }}
        >
            


    <Typography
             mb={4}
            sx={{ fontSize: 20, fontWeight: '550' }}
            color="rgb(52, 71, 103)"
            fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
            gutterBottom
          >
    <span><FcHighPriority  style={{marginRight:'6px',fontSize:"20px"}}/></span> Delete Ticket 
     {/* <span style={{fontWeight:"bold"}}> {ticketname}</span> */}


 
          </Typography> 

        <Typography marginLeft={'22px'} color='#4d4c4c' fontFamily="Roboto, Helvetica, Arial, sans-serif" id="alert-dialog-description">
        You are about to permanently delete this ticket <span style={{fontWeight:"bold"}}> {ticketname} </span>  along with all comments, attachments and ticket data.
        </Typography>

        <Divider style={{marginTop:"12px"}} />
        < Box display="flex" flexDirection="row" justifyContent={'right'} mt={2}>
    
        <Button
                    variant="contained"
                    onClick={handleCloseDeleting} 
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

DeleteTicketModal.propTypes = {
    openDeleting: PropTypes.bool.isRequired,
    handleCloseDeleting: PropTypes.func.isRequired,
    
   

  };


export default DeleteTicketModal
