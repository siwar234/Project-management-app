import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Button, Select, MenuItem, InputLabel, FormControl, Link, Box, TextField } from '@mui/material';
import { associateTickets, getListTicketsByproject } from 'src/JS/actions/Tickets';

export default function AssociateTicket({ projectId, setShowAssociateTicket, ticketId }) {
  const [selectedRelation, setSelectedRelation] = useState('is blocked by');
  const [selectedTickets, setSelectedTickets] = useState([]);

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticketsReducer.tickets);

  useEffect(() => {
    dispatch(getListTicketsByproject(projectId));
  }, [dispatch, projectId]);

  const handleRelationChange = (e) => {
    setSelectedRelation(e.target.value);
  };

  const handleTicketsChange = (event, newTickets) => {
    setSelectedTickets(newTickets);
  };

  const handleAssociate = () => {
    const ticketIds = selectedTickets.map(ticket => ticket._id);
    if (ticketIds.length === 0) {
      console.error('No tickets selected');
      return;
    }
    dispatch(associateTickets(ticketId, ticketIds, selectedRelation, projectId))
      .then(() => {
        setShowAssociateTicket(false); 
      })
      .catch(error => {
        console.error('Failed to associate tickets:', error);
      });
  };

  // Find associated tickets for the current ticket
  const associatedTickets = tickets.find(ticket => ticket._id === ticketId)?.associatedTickets || [];
  const associatedTicketIds = associatedTickets.map(at => at.ticketId._id.toString());

  // Filter out tickets that are already associated with the current ticket
  const filteredTickets = tickets.filter(ticket => !associatedTicketIds.includes(ticket._id.toString()) && ticket._id !== ticketId);

  return (
    <Box sx={{ width: 365, display: 'flex', flexDirection: 'column', gap: 2 }} mt={6} mb={8} ml={2}>
      <h4 sx={{ marginLeft: '10px' }}>Associated Tickets</h4>

      <FormControl fullWidth>
        <InputLabel>Relation</InputLabel>
        <Select
          value={selectedRelation}
          label="Relation"
          onChange={handleRelationChange}
        >
          <MenuItem value="is blocked by">is blocked by</MenuItem>
          <MenuItem value="blocks">blocks</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        multiple
        options={filteredTickets} // Use the filtered list
        getOptionLabel={(option) => option.Description}
        value={selectedTickets}
        onChange={handleTicketsChange}
        renderInput={(params) => <TextField {...params} label="Search Tickets" variant="outlined" />}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="#" underline="hover" style={{ fontSize: '13px', fontWeight: "bold" }}>
          <span style={{ fontSize: '23px' }}>+</span> create an associated ticket
        </Link>
        <Box>
          <Button
            style={{ marginRight: '5px', width: "20px", fontSize: "12px", fontWeight: "bold" }}
            variant="contained"
            color="primary"
            onClick={handleAssociate}
            disabled={selectedTickets.length === 0}
          >
            Associate
          </Button>
          <Button
            style={{ marginRight: '5px', width: "20px", fontSize: "12px", fontWeight: "bold" }}
            variant="outlined"
            onClick={() => setShowAssociateTicket(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
