import { combineReducers } from "redux";
import boardReducer from "../features/board/boardSlice";
import counterReducer from "../features/counter/counterSlice";
import timerReducer from "../features/timer/timerSlice";

export default combineReducers({
  board: boardReducer,
  counter: counterReducer,
  timer: timerReducer,
});
