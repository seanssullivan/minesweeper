import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./MenuBar";
import Board from "../features/board/Board";
import { hasWonSelector, hasLostSelector } from "../features/board/boardSlice";
import Status from "./Status";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "660px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const mapState = (state) => {
  return {
    hasWon: hasWonSelector(state),
    hasLost: hasLostSelector(state),
  };
};

const App = ({ hasWon, hasLost }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasWon) {
      setMessage("You Win!");
    } else if (hasLost) {
      setMessage("Game Over");
    } else {
      setMessage("");
    }
  }, [hasWon, hasLost]);

  return (
    <Container className={`App ${classes.root}`}>
      {message && <Status message={message} />}
      <MenuBar />
      <Board />
    </Container>
  );
};

export default connect(mapState, null)(App);
