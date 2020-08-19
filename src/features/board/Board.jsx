import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import BoardRow from "./BoardRow";
// import _ from "lodash";

const mapState = (state) => {
  return {
    board: state.board,
  };
};

const Board = ({ board }) => {
  console.log("Board rendered");
  return (
    <Grid container>
      {board.rows.map((row) => (
        <BoardRow key={row.id} id={row.id} />
      ))}
    </Grid>
  );
};

export default connect(mapState, null)(Board);
