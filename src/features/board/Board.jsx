import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import BoardRow from "./BoardRow";

const mapState = (state) => {
  return {
    board: state.board,
  };
};

const Board = ({ board }) => {
  console.log("Board rendered");
  return (
    <Grid container>
      {board.map((row, idx) => (
        <BoardRow key={idx} id={idx} />
      ))}
    </Grid>
  );
};

export default connect(mapState, null)(Board);
