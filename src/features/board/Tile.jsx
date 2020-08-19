import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { setClicked, toggleFlagged } from "../board/boardSlice";

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
  const row = state.board.rows.find((row) => row.id === ownProps.rowId);
  const tile = row.tiles.find((tile) => tile.id === ownProps.id);
  return tile;
};

const mapDispatch = {
  setClicked,
  toggleFlagged,
};

const Tile = ({ id, clicked, flagged, hasBomb, setClicked, toggleFlagged }) => {
  console.log("Tile rendered");
  const classes = useStyles(clicked);

  /**
   * Event handler for differentiating left and right mouse clicks.
   */
  const handleClick = (event) => {
    event.preventDefault();
    if (event.type === "click" || event.nativeEvent.which === 1) {
      setClicked({ id });
    } else if (event.type === "contextmenu" || event.nativeEvent.which === 3) {
      toggleFlagged({ id });
    }
  };

  return (
    <Paper
      className={`${classes.root} ${classes.status}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {flagged && !clicked ? "F" : clicked ? 1 : ""}
    </Paper>
  );
};

export default connect(mapState, mapDispatch)(Tile);
