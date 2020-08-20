import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { setRevealed, toggleFlagged } from "../board/boardSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: 0,
    width: 20,
    height: 20,
    textAlign: "center",
  },
  status: (clicked) =>
    clicked ? { backgroundColor: "brown" } : { backgroundColor: "green" },
}));

const mapState = (state, ownProps) => {
  return _.flatten(state.board).find((tile) => tile.id === ownProps.id);
};

const mapDispatch = {
  setRevealed,
  toggleFlagged,
};

const Tile = ({
  id,
  isRevealed,
  isFlagged,
  hasBomb,
  nearbyBombs,
  setRevealed,
  toggleFlagged,
}) => {
  console.log("Tile rendered");
  const classes = useStyles(isRevealed);

  /**
   * Event handler for differentiating left and right mouse clicks.
   */
  const handleClick = (event) => {
    event.preventDefault();
    if (!isRevealed && event.type === "click") {
      setRevealed({ id });
    } else if (!isRevealed && event.type === "contextmenu") {
      toggleFlagged({ id });
    }
  };

  return (
    <Paper
      className={`${classes.root} ${classes.status}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {isRevealed && hasBomb
        ? "B"
        : isFlagged
        ? "F"
        : isRevealed && nearbyBombs > 0
        ? nearbyBombs
        : ""}
    </Paper>
  );
};

export default connect(mapState, mapDispatch)(Tile);
