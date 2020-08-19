import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Tile from "./Tile";

const rowSelector = (state, id) =>
  state.board.rows.find((row) => row.id === id);

const mapState = (state, ownProps) => {
  const row = rowSelector(state, ownProps.id);
  return { ...row, tiles: row.tiles.map((tile) => tile.id) };
};

const BoardRow = ({ id, tiles }) => {
  console.log("Row rendered");
  return (
    <Grid container item>
      {tiles.map((tile) => (
        <Tile key={tile} id={tile} rowId={id} />
      ))}
    </Grid>
  );
};

export default connect(mapState, null)(BoardRow);
