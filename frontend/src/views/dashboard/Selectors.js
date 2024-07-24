import { createSelector } from 'reselect';

const selectTickets = state => state.ticketsReducer.tickets;

export const selectAllTickets = createSelector(
  [selectTickets],
  tickets => tickets.filter(ticket => ticket.TaskId?.StartDate != null)
);

export const selectToDoTickets = createSelector(
  [selectAllTickets],
  tickets => tickets.filter(ticket => ticket.Etat === 'TO DO')
);

export const selectInProgressTickets = createSelector(
  [selectAllTickets],
  tickets => tickets.filter(ticket => ticket.Etat === 'IN_PROGRESS')
);

export const selectDoneTickets = createSelector(
  [selectAllTickets],
  tickets => tickets.filter(ticket => ticket.Etat === 'DONE')
);
