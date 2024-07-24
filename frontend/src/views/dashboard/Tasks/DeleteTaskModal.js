import React from 'react'
import { Typography,Modal,Fade,Button ,Box, Divider } from '@mui/material';
import PropTypes from "prop-types"; 
import { FcHighPriority } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { deletetasks } from 'src/JS/actions/tasks';




const DeleteTaskModal = ({ openDelete, handleCloseDelete,taksname,taskId }) => {

     const dispatch=useDispatch()


    const handleConfirm = () => {
        dispatch(deletetasks(taskId))
        handleCloseDelete();

         
       };
      
       
  return (

    <Modal
    open={openDelete}
      onClose={handleCloseDelete}
    
   
  >
    <Fade in={openDelete}>
   
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
    <span><FcHighPriority  style={{marginRight:'6px',fontSize:"20px"}}/></span> Delete Task


 
          </Typography> 

        <Typography marginLeft={'22px'} color='#4d4c4c' fontFamily="Roboto, Helvetica, Arial, sans-serif" id="alert-dialog-description">
        Are you sure , you want to delete <span style={{fontWeight:"bold"}}> {taksname}</span> Task ?
        </Typography>

        <Divider style={{marginTop:"12px"}} />
        < Box display="flex" flexDirection="row" justifyContent={'right'} mt={2}>
    
        <Button
                    variant="contained"
                    onClick={handleCloseDelete} 
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

DeleteTaskModal.propTypes = {
    openDelete: PropTypes.bool.isRequired,
    handleCloseDelete: PropTypes.func.isRequired,
    
   

  };


export default DeleteTaskModal
