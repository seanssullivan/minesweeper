import React from "react";
// import { Counter } from "../features/counter/Counter";
import Board from "../features/board/Board";
import { Container } from "@material-ui/core";
import "./App.css";

export default function App() {
  console.log("App rendered");
  return (
    <Container className="App">
      <Board />
    </Container>
  );
}
