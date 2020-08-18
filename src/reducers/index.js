import { combineReducers } from "redux";
import boardReducer from "../features/tiles/tilesSlice";
import counterReducer from "../features/counter/counterSlice";
import tilesReducer from "../features/tiles/tilesSlice";

export default combineReducers({
  board: boardReducer,
  counter: counterReducer,
  tiles: tilesReducer,
});
