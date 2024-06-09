 import { combineReducers } from "redux";
import userReducer from "./user";
import equipeReducer from "./equipe";
import projectReducer from "./project";
import tasksReducer from "./tasks";
import ticketsReducer from "./tickets";
import featureReducer from "./feature"
import favouritesReducer from "./favourites"

const rootReducer = combineReducers({
  userReducer,
  equipeReducer,
  projectReducer,
  tasksReducer,
  ticketsReducer,
  featureReducer,
  favouritesReducer,

  
});
export default rootReducer;