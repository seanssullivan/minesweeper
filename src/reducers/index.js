import { combineReducers } from "redux";
import boardReducer from "../features/board/boardSlice";
import counterReducer from "../features/counter/counterSlice";

export default combineReducers({
  board: boardReducer,
  counter: counterReducer,
});
