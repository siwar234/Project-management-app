import {
    LOAD_TICKETS,
    FAIL_TICKETS,
    CREATE_TICKETS_SUCCESS,
    GET_TICKETS_SUCCESS,
    UPDATE_TIKCET_SUCCESS ,
    DELETE_TICKETS_SUCCESS,
    GET_ALLTICKETS_SUCCESS,
    DELETE_IMAGE,
UPDATE_POSITION_SUCCESS
    
   
  } from '../actionTypes/tickets';
  import {
    STOP_LOADING,
    
  } from '../actionTypes/user';
  
  const initialState = {
    loadtickets: false,
    errors: [],
    isError: false,
    isSuccess: false,
    tickets: [],
    alltickets :[],

    
    
  };
  
  const ticketsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case STOP_LOADING:
        return {
          ...state,
          loadtickets: false,
        };
      case LOAD_TICKETS:
        return { ...state, loadtickets: true };
      case FAIL_TICKETS:
        return { ...state, loadtickets: false, errors: payload };
     
      case CREATE_TICKETS_SUCCESS:
        return { ...state, loadtickets: false, isSuccess: true,};
        
      case GET_TICKETS_SUCCESS:
        return { ...state, loadtickets: false, isSuccess: true,tickets:payload.tickets};
        case GET_ALLTICKETS_SUCCESS:
          return { ...state, loadtickets: false, isSuccess: true,alltickets:payload.alltickets};

        case UPDATE_TIKCET_SUCCESS:
            const updatedtickets = state.tickets.map(ticket => 
                ticket._id === payload._id ? payload : ticket
            );
          
            return {
              ...state,
              loadtasks: false,
              tickets: updatedtickets,
              errors: [], 
            };

            
            case   DELETE_TICKETS_SUCCESS:
          
            return {
              ...state,
              loadtasks: false,
              tickets: state.tickets.filter(ticket => ticket._id !== payload),
              errors: [], 
            };

      
            case UPDATE_POSITION_SUCCESS:
              return {
                ...state,
              }

              case DELETE_IMAGE:
                const { ticketId, imageIndex, projectId } = payload;
                return {
                  ...state,
                  tickets: state.tickets.map(ticket => {
                    if (ticket._id === ticketId && ticket.projectId === projectId) {
                      return {
                        ...ticket,
                        imagess: ticket.imagess.filter((image, index) => index !== imageIndex),
                      };
                    }
                    return ticket;
                  }),
                };
    default:
      return state;
  }
  };
  
  export default ticketsReducer;
  