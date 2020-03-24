import { combineReducers } from "redux";
import cameraReducer from "./cameraReducer";
import eventReducer from "./eventReducer";
import friendsReducer from "./friendsReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  cameraReducer,
  eventReducer,
  friendsReducer,
  userReducer
});

export default reducers;
