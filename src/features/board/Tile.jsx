import React from "react";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";
import { Paper } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import FlagIcon from "@material-ui/icons/Flag";
import { makeStyles } from "@material-ui/core/styles";
import { setRevealed, setFlagged, showBombs } from "../board/boardSlice";
import { decrement, increment } from "../counter/counterSlice";
import { startTimer, stopTimer } from "../timer/timerSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: 0,
    borderWidth: 1,
    width: 20,
    height: 20,
    textAlign: "center",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  status: (revealed) =>
    revealed
      ? { backgroundColor: "peru", borderStyle: "solid", borderColor: "peru" }
      : {
          backgroundColor: "green",
          borderStyle: "outset",
          borderColor: "green",
        },
}));

const mapState = (state, ownProps) => {
  const tileState = _.flatten(state.board).find(
    (tile) => tile.id === ownProps.id
  );
  const timerActive = state.timer.isActive;
  return Object.assign({}, tileState, {
    flagCount: state.counter.value,
    timerActive,
  });
};

const Tile = ({
  id,
  isRevealed,
  isFlagged,
  hasBomb,
  nearbyBombs,
  flagCount,
  timerActive,
}) => {
  const classes = useStyles(isRevealed);
  const dispatch = useDispatch();

  /**
   * Toggle isFlagged between true and false.
   */
  const toggleFlagged = () => {
    if (!isFlagged && flagCount > 0) {
      dispatch(setFlagged({ id, isFlagged: true }));
      dispatch(decrement());
    } else if (isFlagged) {
      dispatch(setFlagged({ id, isFlagged: false }));
      dispatch(increment());
    }
  };

  /**
   * Event handler for differentiating left and right mouse clicks.
   */
  const handleClick = (event) => {
    event.preventDefault();
    if (!isRevealed && event.type === "click") {
      dispatch(setRevealed({ id }));
      if (hasBomb) {
        dispatch(stopTimer());
        dispatch(showBombs());
      } else if (!timerActive) {
        dispatch(startTimer());
      }
    } else if (!isRevealed && event.type === "contextmenu") {
      toggleFlagged();
    }
  };

  return (
    <Paper
      className={`${classes.root} ${classes.status}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {isRevealed && hasBomb ? (
        <ErrorOutlineIcon style={{ color: "red" }} />
      ) : isFlagged ? (
        <FlagIcon color="secondary" />
      ) : isRevealed && nearbyBombs > 0 ? (
        nearbyBombs
      ) : (
        ""
      )}
    </Paper>
  );
};

export default connect(mapState, null)(Tile);
