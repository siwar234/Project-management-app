import {
  LOAD_TASKS,
  FAIL_TASKS,
  CREATE_TASKS_SUCCESS,
  GET_TASKS_SUCCESS,
  UPDATE_TASKS_SUCCESS,
  DELETE_TASKS_SUCCESS,
  CREATE_TICKETS_SUCCESS,
  UPDATE_TIKCETS_SUCCESS,
  MOVE_TICKET_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TIKCETSFEATURE_SUCCESS,
  UPDATE_TIKCETSIMAGES_SUCCESS,
  UPDATE_SECOND_GRID,
  CLOSE_SECOND_GRID,
  UPDATE_TIKCETS_FLAG_SUCCESS,
  UPDATE_TICKET_IN_TASK,
VOTE_TICKET,
DELETE_VOTE,
DELETE_COMMENT,
ADD_COMMENT,
UPDATE_COMMENT,
GET_ALL_TASKS_SUCCESS,
DELETE_TICKETS_FLAG_SUCCESS,
RELATE_TASKS_SUCCESS,
ASSOCIATE_TICKETS_SUCCESS,
ASSOCIATE_TICKETS_FAILURE,
// DISSOCIATE_TICKET_SUCCESS,
// DISSOCIATE_TICKET_FAILURE
} from '../actionTypes/tasks';
import {
  STOP_LOADING
  
} from '../actionTypes/user';

const initialState = {
  loadtasks: false,
  errors: [],
  isError: false,
  isSuccess: false,
  tasks: [],
  alltasks:[],
  isSecondGridOpen: {}, 
  
  
};

const tasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOP_LOADING:
      return {
        ...state,
        loadtasks: false,
      };
    case LOAD_TASKS:
      return { ...state, loadtasks: true };
    case FAIL_TASKS:
      return { ...state, loadtasks: false, errors: payload };
   
    case CREATE_TASKS_SUCCESS:
      return { ...state, loadtasks: false, isSuccess: true,};
      
    case GET_TASKS_SUCCESS:
      return { ...state, loadtasks: false, isSuccess: true,tasks:payload};
      case CREATE_TICKETS_SUCCESS:
        return { ...state, loadtasks: false, isSuccess: true};
        case GET_ALL_TASKS_SUCCESS:
          return { ...state, loadtasks: false, isSuccess: true,alltasks:payload};
          case RELATE_TASKS_SUCCESS:
  const related = state.tasks.map(task => 
    task._id === payload._id ? payload : task
  );
  
  return {
    ...state,
    loadtasks: false,
    tasks: related, 
    errors: [], 
  }

  
      case UPDATE_TASKS_SUCCESS:
        const updatedTasks = state.tasks.map(task => 
          task._id === payload._id ? payload : task
        );
      
        return {
          ...state,
          loadtasks: false,
          tasks: updatedTasks,
          errors: [], 
        };
        case UPDATE_TIKCETS_SUCCESS:
const updateTask = state.tasks.map(task => 
  task._id === payload.task._id ? payload.task : task
);
    
return {
  ...state,
  loadtasks: false,
  tasks: updateTask,
  errors: [], 
};

          case UPDATE_COMMENT:
            const updateDTask = state.tasks.map(task => 
              task._id === payload._id ? payload : task
            );
          
            return {
              ...state,
              loadtasks: false,
              tasks: updateDTask,
              errors: [], 
            };

            
          case MOVE_TICKET_SUCCESS:
            const updatedDestinationTask = state.tasks.map(task => 
              task._id === payload._id ? payload : task
            );

          
            return {
              ...state,
              loadtasks: false,
              tasks: updatedDestinationTask,
              errors: [], 
            };
            case DELETE_TASK_SUCCESS:
return {
  ...state,
  tasks: state.tasks.filter(task => task._id !== payload)
};

case DELETE_TICKETS_FLAG_SUCCESS:
  return {
    ...state,
    tasks: state.tasks.map(task => {
      const updatedTickets = task.tickets.map(ticket => {
        if (ticket._id === payload) {
          return {
            ...ticket,
            flag: false, 
          };
        }
        return ticket; 
      });
      return {
        ...task,
        tickets: updatedTickets,
      };
    }),
  };



case UPDATE_TIKCETSFEATURE_SUCCESS:
  const task = state.tasks.map(task => 
    task._id === payload._id ? payload : task
  );

  return {
    ...state,
    loadtasks: false,
    tasks: task,
    errors: [], 
  };

  case DELETE_VOTE:
    return {
      ...state,
      loadtasks: false,
     
      tasks: state.tasks.filter(task => task._id !== payload),
    };  
    
    case DELETE_COMMENT:
      return {
        ...state,
        loadtasks: false,
       
        tasks: state.tasks.filter(task => task._id !== payload),
      };  

     

        case DELETE_TASKS_SUCCESS:
    return {
      ...state,
      loadtasks: false,
     
      tasks: state.tasks.filter(task => task._id !== payload),
    };
    case CLOSE_SECOND_GRID:
      return {
        ...state,
        isSecondGridOpen: false, 
      };

    case UPDATE_TIKCETSIMAGES_SUCCESS:
      const taskupdated = state.tasks.map(task => 
        task._id === payload._id ? payload : task
      );

      
    
      return {
        ...state,
        loadtasks: false,
        tasks: taskupdated,
        errors: [], 
      };

      case UPDATE_TIKCETS_FLAG_SUCCESS:
        const uptadetflag = state.tasks.map(task => 
          task._id === payload._id ? payload : task
        );
  

        
        
      
        return {
          ...state,
          loadtasks: false,
          tasks: uptadetflag,
          errors: [], 
        };
        case ASSOCIATE_TICKETS_SUCCESS:
          const tasksassociated = state.tasks.map(task => {
            if (task._id === payload.taskId) {
              return {
                ...task,
                tickets: task.tickets.map(ticket => {
                  if (ticket._id === payload.ticket._id) {
                    return {
                      ...ticket,
                      associatedTickets: [
                        ...ticket.associatedTickets,
                        ...payload.ticket.associatedTickets.filter(
                          at => !ticket.associatedTickets.some(t => t._id === at._id)
                        ),
                      ],
                    };
                  }
                  return ticket;
                }),
              };
            }
            return task;
          });
        
          return {
            ...state,
            tasks: tasksassociated,
          };





          // case DISSOCIATE_TICKET_SUCCESS:
          //   return {
            
          // ...state,
          // loadtasks: false,
         
          // tasks: state.tasks.filter(task => task._id !== payload),
          //   };
       
               


          case ASSOCIATE_TICKETS_FAILURE:
            return {
              ...state,
              loading: false,
              error: payload
            };

            // case DISSOCIATE_TICKET_FAILURE:
            //   return {
            //     ...state,
            //     loading: false,
            //     error: payload
            //   };
         
         
       
       
      
      
    case VOTE_TICKET:
      const updtetask = state.tasks.map(task => 
        task._id === payload._id ? payload : task
      );

      
    
      return {
        ...state,
        loadtasks: false,
        tasks: updtetask,
        errors: [], 
      };

      case ADD_COMMENT:
        const commenttask = state.tasks.map(task => 
          task._id === payload._id ? payload : task
        );

        
      
        return {
          ...state,
          loadtasks: false,
          tasks: commenttask,
          errors: [], 
        };

      
        case UPDATE_TICKET_IN_TASK:
          return {
            ...state,
            tasks: state.tasks.map((task) => {
              return {
                ...task,
                tickets: task.tickets.map((ticket) =>
                  ticket._id === payload._id ? payload : ticket
                ),
              };
            }),
          };

      case UPDATE_SECOND_GRID:
    const { taskId, ticketId, ticket } = payload;
    return {
        ...state,
        isSecondGridOpen: {
            [taskId]: {
                [ticketId]: ticket,
            },
        },
    };


       
        
      

      
  
  default:
    return state;
}
};

export default tasksReducer;
