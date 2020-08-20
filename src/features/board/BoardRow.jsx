import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Tile from "./Tile";

const mapState = (state, ownProps) => {
  const row = state.board[ownProps.id];
  return { tileIds: row.map((tile) => tile.id) };
};

const BoardRow = ({ tileIds }) => {
  return (
    <Grid
      container
      item
      direction="row"
      alignItems="center"
      justify="center"
      wrap="nowrap"
    >
      {tileIds.map((id) => (
        <Tile key={id} id={id} />
      ))}
    </Grid>
  );
};

export default connect(mapState, null)(BoardRow);
