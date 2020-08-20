import React from "react";
// import { Counter } from "../features/counter/Counter";
import Board from "../features/board/Board";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./MenuBar";
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

export default function App() {
  const classes = useStyles();
  return (
    <Container className={`App ${classes.root}`}>
      <MenuBar />
      <Board />
    </Container>
  );
}
