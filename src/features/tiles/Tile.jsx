import React, { useState } from "react";
import { connect } from "react-redux";
import { setClicked } from "features/tiles/tilesSlice";
import { Paper } from "@material-ui/core";

const mapState = (state, ownProps) => {
  const {
    coords: [x, y],
    ...rest
  } = ownProps;
  const tileState = state.board[y][x];
  return Object.assign({}, tileState, rest);
};

const mapDispatch = { setClicked };

const Tile = ({ classes }) => {
  const [display, setDisplay] = useState("");

  return (
    <Paper className={classes} onClick={() => setClicked()}>
      {display}
    </Paper>
  );
};

export default connect(mapState, mapDispatch)(Tile);
