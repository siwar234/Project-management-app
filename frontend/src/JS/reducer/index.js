 import { combineReducers } from "redux";
import userReducer from "./user";
import equipeReducer from "./equipe";
import projectReducer from "./project";

const rootReducer = combineReducers({
  userReducer,
  equipeReducer,
  projectReducer
  
});
export default rootReducer;