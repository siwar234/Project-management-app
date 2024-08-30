import React, { useState } from 'react';
import { Avatar, Typography, Box, Button, Tooltip ,IconButton} from '@mui/material';
import image1 from '../../../assets/images/bug.png';
import image2 from '../../../assets/images/checking.webp';
import image3 from '../../../assets/images/storie.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
// import { dissociateTicket } from 'src/JS/actions/Tickets';

const TicketItem = ({ ticket }) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const getImageSrc = (type) => {
    switch (type) {
      case 'Bug':
        return image1;
      case 'Task':
        return image2;
      case 'story':
        return image3;
      default:
        return image3; 
    }
  };

  const getStatusStyles = (etat) => {
    switch (etat) {
      case 'TO DO':
        return {
          backgroundColor: '#7ca1f35e',
          color: '#5d87ff'
        };
      case 'IN_PROGRESS':
        return {
          backgroundColor: 'rgb(227 226 226 / 55%)',
          color: 'rgb(107 107 107)'
        };
      case 'DONE':
        return {
          backgroundColor: 'rgb(214 247 210)',
          color: 'rgb(12 119 26)'
        };
      default:
        console.warn('Unknown status:', etat); 
        return {
          backgroundColor: '#f0f0f0',
          color: '#000000' 
        };
    }
  };
  
  
  const statusStyles = getStatusStyles(ticket.ticketId?.Etat);


  // const handleDissociate = () => {
  //   dispatch(dissociateTicket(ticket.ticketId?._id, ticket._id));
  // };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={0.2}
      p={1}
      border={1}
      borderColor={'#dedfe2'}
      borderRadius={0}
      mr={2}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
        position: 'relative',
      }}
    >
      <Box display="flex" alignItems="center">
        <img
          src={getImageSrc(ticket.ticketId?.type)}
          alt="icon"
          style={{
            width: ticket?.ticketId?.type === 'story' ? '21px' : '18px',
            height: ticket?.ticketId?.type === 'story' ? '21px' : '18px',
            marginRight: '15px',
          }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {ticket.relation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {ticket.ticketId?.Description}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <Tooltip title={ticket.ticketId?.Priority}>
          <Box ml={2} mr={3}>
            {/* Priority Icons */}
            {ticket.ticketId?.Priority === 'Low' && (
              <KeyboardDoubleArrowDownIcon
                style={{
                  width: '15px',
                  marginRight: '5px',
                  marginLeft: '10px',
                  marginTop: '10px',
                  color: '#5b356fcc',
                }}
              />
            )}
            {ticket.ticketId?.Priority === 'High' && (
              <KeyboardDoubleArrowUpIcon
                style={{
                  width: '15px',
                  marginRight: '5px',
                  marginLeft: '10px',
                  marginTop: '10px',
                  color: 'rgb(35 145 115)',
                }}
              />
            )}
            {ticket.ticketId?.Priority === 'Medium' && (
              <DensityMediumIcon
                style={{
                  width: '15px',
                  marginRight: '5px',
                  marginLeft: '10px',
                  marginTop: '10px',
                  color: '#c1535c',
                }}
              />
            )}
          </Box>
        </Tooltip>
        <Tooltip
          title={`Responsible: ${
            ticket.ticketId?.ResponsibleTicket
              ? ticket.ticketId?.ResponsibleTicket.firstName
              : 'Not assigned'
          }`}
        >
          <Avatar
            src={ticket.ticketId?.ResponsibleTicket?.profilePicture}
            alt="Profile Picture"
            sx={{ width: 24, height: 24, marginRight: '10px' }}
          >
            {ticket.ticketId?.ResponsibleTicket?.firstName.substring(0, 2).toUpperCase()}
          </Avatar>
        </Tooltip>
        <Button
  style={{
    fontSize: '10px',
    width: 'fit-content',
    textAlign: 'center',
    borderRadius: '3px',
    height: '25px',
    fontWeight: 'bold',
    backgroundColor: statusStyles.backgroundColor,
    marginRight: '35px',
    marginLeft: '5px',
    color: statusStyles.color,
    fontFamily: 'system-ui',
  }}
>
  <span>{ticket.ticketId?.Etat}</span>
</Button>

{isHovered && (
          <Tooltip title="Dissociate Ticket">
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0px',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#e7e6e6',
                },
                color: '#515351',
                borderRadius:"0",
                marginRight:"5px"
              
              }}
              // onClick={handleDissociate}

            >
              <CloseIcon  style={     { fontSize: '16px',fontWeight:"bold"}}/>
            </IconButton>
          </Tooltip>
        )}

      </Box>
    </Box>
  );
};

const AssociatedList = ({ taskId, isSecondGridOpen, ticketId }) => {
  const associatedTickets = isSecondGridOpen[taskId]?.[ticketId]?.associatedTickets || [];

  return (
    <Box ml={2} mb={6} mt={6}>
      {associatedTickets.length > 0 && <h4>Associated Tickets</h4>}
      <Box>
        {associatedTickets.map((ticket) => (
          <TicketItem
            key={ticket.ticketId?._id} 
            ticket={ticket}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AssociatedList;
