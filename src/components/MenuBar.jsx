import React from "react";
import { Counter } from "../features/counter/Counter";
import Timer from "../features/timer/Timer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  nav: {
    height: "60px",
    width: "612px",
    display: "block",
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    paddingLeft: "150px",
    paddingRight: "150px",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

export default function MenuBar() {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.nav}>
      <Toolbar className={classes.toolbar}>
        <Counter />
        <Timer />
      </Toolbar>
    </AppBar>
  );
}
