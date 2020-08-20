import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BoardRow from "./BoardRow";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px",
  },
}));

const mapState = (state) => {
  return {
    board: state.board,
  };
};

const Board = ({ board }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {board.map((row, idx) => (
        <BoardRow key={idx} id={idx} />
      ))}
    </Grid>
  );
};

export default connect(mapState, null)(Board);
