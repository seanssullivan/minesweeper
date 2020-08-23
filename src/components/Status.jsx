import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { resetTimer } from "../features/timer/timerSlice";
import { resetBoard } from "../features/board/boardSlice";
import { resetCounter } from "../features/counter/counterSlice";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
}));

export default function Status({ message }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const startNewGame = () => {
    dispatch(resetTimer());
    dispatch(resetCounter());
    dispatch(resetBoard({ height: 16, width: 16, bombs: 40 }));
  };

  return (
    <div className={classes.root}>
      <h1>{message}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => startNewGame()}
      >
        New Game
      </Button>
    </div>
  );
}
